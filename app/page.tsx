import TipJar from "@/components/TipJar";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl flex flex-col items-center gap-12">
        <header className="text-center space-y-4">
          <div className="inline-block px-4 py-1.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-xs font-bold rounded-full uppercase tracking-widest border border-yellow-200 dark:border-yellow-800">
            Level 3 Submission
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
            Soroban <span className="text-yellow-500">dApp</span>
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto">
            A complete end-to-end mini-dApp built with Stellar Smart Contracts, featuring loading states, caching, and comprehensive testing.
          </p>
        </header>

        <main className="w-full">
          <TipJar />
        </main>

        <footer className="w-full flex flex-col items-center gap-6 pt-12 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex gap-8 text-sm font-bold text-zinc-400">
            <div className="flex flex-col items-center gap-1">
              <span className="text-zinc-900 dark:text-zinc-100">3+ Tests</span>
              <span className="text-[10px] uppercase">Verified</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-zinc-900 dark:text-zinc-100">Soroban</span>
              <span className="text-[10px] uppercase">Engine</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-zinc-900 dark:text-zinc-100">Freighter</span>
              <span className="text-[10px] uppercase">Wallet</span>
            </div>
          </div>
          <p className="text-xs text-zinc-400">
            Built for the Orange Belt Level 3 Challenge
          </p>
        </footer>
      </div>
    </div>
  );
}
