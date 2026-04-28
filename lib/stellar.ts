import {
  Address,
  BASE_FEE,
  Contract,
  Networks,
  Rpc,
  TransactionBuilder,
  scValToNative,
  xdr,
} from "@stellar/stellar-sdk";
import { isConnected, getAddress, signTransaction } from "@stellar/freighter-api";

export const RPC_URL = "https://soroban-testnet.stellar.org";
export const NETWORK_PASSPHRASE = Networks.TESTNET;
export const CONTRACT_ID = "CC3D2Z6N4Z6M3W4P5Q6R7S8T9U0V1W2X3Y4Z5A6B7C8D9E0F1G2H"; // Placeholder

export const server = new Rpc.Server(RPC_URL);

export async function checkFreighter() {
  if (await isConnected()) {
    return true;
  }
  return false;
}

export async function getWalletAddress() {
  const { address } = await getAddress();
  return address;
}

export async function getJarTotal() {
  try {
    const contract = new Contract(CONTRACT_ID);
    const result = await server.getLedgerEntries(
       contract.getFootprint()
    );
    // This is a simplified version. For a real app, we'd call the `get_total` function.
    // For this demo, we'll use a mock if RPC fails.
    return 0;
  } catch (e) {
    console.error(e);
    return 0;
  }
}

export async function callContract(functionName: string, args: any[] = []) {
  // Logic to call contract functions using Freighter
}
