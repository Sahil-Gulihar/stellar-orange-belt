"use client";

import { useState, useEffect } from "react";
import { Coins, Wallet, Send, Loader2, Trophy } from "lucide-react";
import { getWalletAddress, checkFreighter, getJarTotal } from "@/lib/stellar";

export default function TipJar() {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [amount, setAmount] = useState("");
  const [isTipping, setIsTipping] = useState(false);
  const [totalDonated, setTotalDonated] = useState(0);
  const [recentTips, setRecentTips] = useState<{address: string, amount: string, time: string}[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const total = await getJarTotal();
      setTotalDonated(total);
      
      const savedTips = localStorage.getItem("recentTips");
      if (savedTips) {
        setRecentTips(JSON.parse(savedTips));
      }
    };
    
    loadData();
  }, []);

  const connectWallet = async () => {
    if (isConnecting) return;
    setIsConnecting(true);
    
    try {
      const hasFreighter = await checkFreighter();
      if (!hasFreighter) {
        alert("Freighter wallet not found. Please install the extension.");
        return;
      }
      
      const addr = await getWalletAddress();
      if (addr) {
        setAddress(addr);
      } else {
        alert("Could not connect to Freighter. Please ensure it is unlocked and you have granted permission to this site.");
      }
    } catch (e) {
      console.error("Connection handler error:", e);
      alert("An unexpected error occurred while connecting.");
    } finally {
      setIsConnecting(false);
    }
  };

  const handleTip = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address || !amount || isTipping) return;

    setIsTipping(true);
    // Simulate transaction for demo quality
    setTimeout(() => {
      const newTip = {
        address: address.substring(0, 6) + "..." + address.substring(address.length - 4),
        amount,
        time: new Date().toLocaleTimeString(),
      };
      const updatedTips = [newTip, ...recentTips].slice(0, 5);
      setRecentTips(updatedTips);
      localStorage.setItem("recentTips", JSON.stringify(updatedTips));
      setTotalDonated(prev => prev + parseFloat(amount));
      setAmount("");
      setIsTipping(false);
      alert("Tip successful! (Simulation)");
    }, 2000);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-8 p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 transition-all duration-300">
      <div className="text-center space-y-2">
        <div className="inline-flex p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full text-yellow-600 mb-2">
          <Trophy size={32} />
        </div>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Stellar Tip Jar</h1>
        <p className="text-zinc-500 dark:text-zinc-400">Support your favorite creators on Soroban</p>
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-xl border border-zinc-200 dark:border-zinc-700 text-center space-y-1">
        <span className="text-sm font-medium text-zinc-500 uppercase tracking-wider">Total Collected</span>
        <div className="text-4xl font-black text-zinc-900 dark:text-white flex items-center justify-center gap-2">
          <Coins className="text-yellow-500" />
          {totalDonated.toLocaleString()} <span className="text-lg font-normal text-zinc-400">XLM</span>
        </div>
      </div>

      {!address ? (
        <button
          onClick={connectWallet}
          disabled={isConnecting}
          className="w-full py-4 px-6 bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isConnecting ? <Loader2 className="animate-spin" /> : <Wallet size={20} />}
          {isConnecting ? "Connecting..." : "Connect Freighter"}
        </button>
      ) : (
        <form onSubmit={handleTip} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Amount to Tip</label>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.0"
                className="w-full py-4 pl-4 pr-16 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 outline-none transition-all text-lg font-medium"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-zinc-400">XLM</span>
            </div>
          </div>
          <button
            type="submit"
            disabled={isTipping || !amount}
            className="w-full py-4 px-6 bg-yellow-500 text-zinc-900 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isTipping ? <Loader2 className="animate-spin" /> : <Send size={20} />}
            {isTipping ? "Processing Tip..." : "Send Tip"}
          </button>
          
          {isTipping && (
            <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-1 rounded-full overflow-hidden">
              <div className="bg-yellow-500 h-full animate-progress" style={{ width: "100%" }}></div>
            </div>
          )}
          
          <div className="text-xs text-center text-zinc-500">
            Connected: {address.substring(0, 8)}...{address.substring(address.length - 8)}
          </div>
        </form>
      )}

      <div className="space-y-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
        <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
          Recent Supporters
        </h3>
        <div className="space-y-3">
          {recentTips.length > 0 ? (
            recentTips.map((tip, i) => (
              <div key={i} className="flex items-center justify-between text-sm bg-zinc-50 dark:bg-zinc-800/30 p-3 rounded-lg border border-zinc-100 dark:border-zinc-800">
                <div className="flex flex-col">
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">{tip.address}</span>
                  <span className="text-[10px] text-zinc-500">{tip.time}</span>
                </div>
                <div className="font-bold text-zinc-900 dark:text-zinc-100 text-right">
                  +{tip.amount} XLM
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-zinc-400 text-sm italic">
              No tips yet. Be the first!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
