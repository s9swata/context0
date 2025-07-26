import type { ContractState } from "hollowdb";
import { SetSDK } from "hollowdb";
import type { JWKInterface, Warp } from "warp-contracts";
import { ArweaveSigner } from "warp-contracts-plugin-deploy";
import { EizenMemory } from "./db/index";
import { HNSW } from "./hnsw";


export class EizenCompatSDK extends SetSDK<string> {
	/**
	 * Stores multiple key-value pairs using the legacy contract interface.
	 *
	 * @param keys Array of keys to store
	 * @param values Array of corresponding values to store
	 * @throws {Error} If keys and values arrays have different lengths
	 */
	override async setMany(keys: string[], values: string[]): Promise<void> {
		if (keys.length !== values.length) {
			throw new Error("Keys and values arrays must have the same length");
		}

		await this.base.dryWriteInteraction({
			function: "upsertVectorMulti",
			value: {
				keys,
				values,
			},
		});
	}

	/**
	 * Stores a single key-value pair using the legacy contract interface.
	 *
	 * @param key The key to store
	 * @param value The value to store
	 */
	override async set(key: string, value: string): Promise<void> {
		await this.setMany([key], [value]);
	}
}

/**
 * Main HNSW Vector Database implementation for Arweave.
 *
 * This class provides a complete vector database solution that combines HNSW
 * algorithm with persistent storage on Arweave blockchain. 
 *
 * @template M Type of metadata associated with each vector
 */
export class EizenDbVector<M = unknown> extends HNSW<M> {
	/** Database SDK instance for persistent storage operations */
	sdk: SetSDK<string>;

	/**
	 * Creates a new HNSW vector database instance.
	 *
	 * @param contractSDK A blockchain contract SDK instance with `set` and `setMany` operations
	 * - Vectors are encoded using protobuf and stored as base64 strings
	 * - Metadata is stored as JSON-stringified values
	 * - For legacy contracts using `upsertVectorMulti`, use `EizenCompatSDK`
	 *
	 * @param options Optional HNSW algorithm parameters:
	 * - `m`: Maximum connections per node (default: 5, range: 5-48, higher for better quality)
	 * - `efConstruction`: Build-time candidate list size (default: 128, higher for better graph quality)
	 * - `efSearch`: Search-time candidate list size (default: 20, higher for better recall)
	 *
	 * @template M Type of metadata associated with each vector
	 *
	 */
	constructor(
		contractSDK: SetSDK<string>,
		options?: {
			/** Maximum number of bidirectional connections per node (default: 5) */
			m?: number;
			/** Size of candidate list during graph construction (default: 128) */
			efConstruction?: number;
			/** Size of candidate list during search (default: 20) */
			efSearch?: number;
		},
	) {
		const m = options?.m ?? 5;
		const ef_construction = options?.efConstruction ?? 128;
		const ef_search = options?.efSearch ?? 20;

		super(new EizenMemory<M>(contractSDK), m, ef_construction, ef_search);

		this.sdk = contractSDK;
	}

	/**
	 * Deploys a new vector storage contract on Arweave.
	 *
	 * Creates a blockchain contract with vector storage capabilities including
	 * `set` and `setMany` functions for persistent data storage.
	 *
	 * @param wallet User's/ our Arweave wallet for contract deployment
	 * @param warp A Warp instance connected to mainnet
	 * @returns Object containing the deployed contract transaction ID and source transaction ID
	 *
	 * @throws {Error} If Warp is not connected to mainnet
	 *
	 */
	static async deploy(
		wallet: JWKInterface,
		warp: Warp,
	): Promise<{ contractTxId: string; srcTxId: string }> {
		const srcTxId = "lSRrPRiiMYeJsGgT9BdV9OTZTw3hZw_UkGVpEXjD5sY";

		if (warp.environment !== "mainnet") {
			throw new Error("Warp must be connected to mainnet.");
		}

		const addr = await warp.arweave.wallets.jwkToAddress(wallet);
		const initialState: ContractState = {
			version: "eizen-vector@^1.0.0",
			owner: addr,
			verificationKeys: { auth: null },
			isProofRequired: { auth: false },
			canEvolve: true,
			whitelists: {
				put: { [addr]: true },
				update: { [addr]: true },
				set: { [addr]: true },
			},
			isWhitelistRequired: { put: true, update: true, set: true },
		};
 
		const { srcTxId: deploymentSrcTxId, contractTxId } =
			await warp.deployFromSourceTx({
				wallet: new ArweaveSigner(wallet),
				initState: JSON.stringify(initialState),
				srcTxId: srcTxId,
				evaluationManifest: {
					evaluationOptions: {
						allowBigInt: true,
						useKVStorage: true,
					},
				},
			});

		if (deploymentSrcTxId !== srcTxId) {
			console.error("Deployed srcTxId is different than the given source!");
			console.error({ expected: srcTxId, received: deploymentSrcTxId });
		}

		return { contractTxId, srcTxId }; 	}
}
