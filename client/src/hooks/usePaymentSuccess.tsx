"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { createInstance, deployArweaveContract } from "@/lib/api";

interface CreateInstanceResponse {
  instanceKeyHash: string;
  userId: string;
  name: string;
  description?: string;
  arweave_wallet_address: string;
  isActive: boolean;
}

interface DeployContractResponse {
  contractId: string;
  contractHashFingerprint: string;
  userId: string;
  deployedAt: string;
  keyId: string;
}

interface UsePaymentSuccessReturn {
  isProcessing: boolean;
  isSuccess: boolean;
  instanceData: CreateInstanceResponse | null;
  contractData: DeployContractResponse | null;
  contractHashFingerprint: string | null;
  showToken: boolean;
  error: string | null;
}

export const usePaymentSuccess = (): UsePaymentSuccessReturn => {
  const searchParams = useSearchParams();
  const { getToken, isSignedIn, userId } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [instanceData, setInstanceData] =
    useState<CreateInstanceResponse | null>(null);
  const [contractData, setContractData] =
    useState<DeployContractResponse | null>(null);
  const [contractHashFingerprint, setContractHashFingerprint] = useState<
    string | null
  >(null);
  const [showToken, setShowToken] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasProcessedRef = useRef(false);

  // Check for existing token in localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("context0_token");
    if (storedToken) {
      setContractHashFingerprint(storedToken);
    }
  }, []);

  useEffect(() => {
    const handlePaymentSuccess = async () => {
      const success = searchParams.get("success");

      if (
        success === "true" &&
        isSignedIn &&
        !isProcessing &&
        !isSuccess &&
        !hasProcessedRef.current
      ) {
        hasProcessedRef.current = true;
        setIsProcessing(true);
        setError(null);

        try {
          const token = await getToken();
          if (!token) {
            throw new Error("Authentication token not available");
          }

          const response = await createInstance(token);

          if (response.success && response.data) {
            setInstanceData(response.data);

            // Now deploy the Arweave contract
            const deployResponse = await deployArweaveContract(userId, token);

            if (deployResponse.success && deployResponse.data) {
              setContractData(deployResponse.data);
              setContractHashFingerprint(
                deployResponse.data.contractHashFingerprint,
              );

              // Store token in localStorage
              localStorage.setItem(
                "context0_token",
                deployResponse.data.contractHashFingerprint,
              );

              setShowToken(true);
              setIsSuccess(true);

              // Hide token after 30 seconds
              setTimeout(() => {
                setShowToken(false);
              }, 30000);
            } else {
              throw new Error(
                deployResponse.message || "Failed to deploy contract",
              );
            }
          } else {
            throw new Error(response.message || "Failed to create instance");
          }
        } catch (err) {
          const errorMessage =
            err instanceof Error ? err.message : "An unexpected error occurred";
          setError(errorMessage);
          console.error("Error creating instance:", err);
        } finally {
          setIsProcessing(false);
        }
      }
    };

    handlePaymentSuccess();
  }, [searchParams, isSignedIn, isProcessing, isSuccess]);

  return {
    isProcessing,
    isSuccess,
    instanceData,
    contractData,
    contractHashFingerprint,
    showToken,
    error,
  };
};
