import {
  Address,
  BASE_FEE,
  Contract,
  Networks,
  rpc,
  TransactionBuilder,
  scValToNative,
  xdr,
} from "@stellar/stellar-sdk";
import { isConnected, getAddress, signTransaction } from "@stellar/freighter-api";

export const RPC_URL = "https://soroban-testnet.stellar.org";
export const NETWORK_PASSPHRASE = Networks.TESTNET;
export const CONTRACT_ID = "CC3D2Z6N4Z6M3W4P5Q6R7S8T9U0V1W2X3Y4Z5A6B7C8D9E0F1G2H"; // Placeholder

export const server = new rpc.Server(RPC_URL);

export async function checkFreighter() {
  try {
    const connected = await isConnected();
    return !!connected;
  } catch (e) {
    console.error("Error checking Freighter connection:", e);
    return false;
  }
}

export async function getWalletAddress() {
  try {
    const response = await getAddress();
    if (response && response.address) {
      return response.address;
    }
    return null;
  } catch (e) {
    console.error("Freighter getAddress error:", e);
    return null;
  }
}

export async function getJarTotal() {
  return 1250; // Mock for demo
}

export async function callContract(functionName: string, args: any[] = []) {
  console.log(`Calling ${functionName} with`, args);
}
