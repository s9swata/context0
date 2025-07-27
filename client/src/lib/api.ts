import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081";

export async function test(token: string) {
  const response = await axios.get(`${API_BASE_URL}/test`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function getUserSubscription(token: string) {
  const response = await axios.get(`${API_BASE_URL}/subscriptions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function deployArweaveContract(userId: string, token: string) {
  const response = await axios.post(
    `${API_BASE_URL}/deploy`,
    {
      userId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );
  console.log(response.data);
  return response.data;
}

export async function hitPaymentWebhook(
  token: string,
  txHash: string,
  subscriptionPlan: string,
  quotaLimit: number,
) {
  await axios.post(
    `${API_BASE_URL}/webhook/payments/web3`,
    {
      txHash,
      subscriptionPlan,
      quotaLimit,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}

export async function getInstances(token: string) {
  const response = await axios.get(`${API_BASE_URL}/instances`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function createInstance(token: string) {
  const response = await axios.post(
    `${API_BASE_URL}/instances/create`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}

export async function getUserMemoryCount(contractId: string) {
  const BEARER_TOKEN = process.env.NEXT_PUBLIC_BEARER_TOKEN || "";
  if (!BEARER_TOKEN) {
    console.log("Bearer token is not set in environment variables");
  }
  const data = "";
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${API_BASE_URL}/admin/memories/count/${contractId}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
    data: data,
  };
  const response = await axios.request(config);
  console.log(response.data);
  return response.data;
}
