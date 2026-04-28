# 🟠 Orange Belt - Level 3: Soroban Tip Jar dApp

Welcome to my submission for the Level 3 Orange Belt challenge! This project is a complete end-to-end mini-dApp built on the Stellar network using Soroban Smart Contracts.

## 🚀 Live Demo
**[Live Demo Link](https://orange-belt-level3.vercel.app)** *(Placeholder)*

## 📹 Demo Video
**[1-Minute Demo Video](https://youtube.com/...)** *(Placeholder)*

## 🛠 Features
- **Smart Contract:** Written in Rust using Soroban SDK.
- **Wallet Connection:** Integrated with Freighter Wallet.
- **Loading States:** UI indicators for wallet connection and transaction processing.
- **Progress Indicators:** Visual feedback during transaction simulation.
- **Caching:** Recent tips are cached locally in the browser for persistent history.
- **Responsive Design:** Built with Tailwind CSS and Lucide icons.

## 🧪 Testing
The smart contract includes 4 comprehensive tests covering initialization, tipping, and owner withdrawals.

### Test Output
```bash
running 4 tests
test test::test_initialize ... ok
test test::test_already_initialized - should panic ... ok
test test::test_tip ... ok
test test::test_withdraw ... ok

test result: ok. 4 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.06s
```

## 📂 Project Structure
```
├── app/                  # Next.js App Router
├── components/           # React Components (TipJar, etc.)
├── contracts/            # Soroban Smart Contracts (Rust)
│   └── tip-jar/
│       └── src/
│           ├── lib.rs    # Contract Logic
│           └── test.rs   # Contract Tests
├── lib/                  # Stellar & Soroban Utilities
└── package.json          # Frontend Dependencies
```

## 🛠 Development Setup

### Smart Contract
1. Navigate to the contract directory:
   ```bash
   cd contracts/tip-jar/contracts/tip-jar
   ```
2. Run tests:
   ```bash
   cargo test
   ```
3. Build contract:
   ```bash
   stellar contract build
   ```

### Frontend
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📜 Smart Contract Logic
The Tip Jar contract supports:
- `initialize`: Sets the owner and the token (XLM) to be accepted.
- `tip`: Allows users to send XLM to the jar.
- `get_total`: Returns the total amount of tips collected.
- `withdraw`: Allows the owner to withdraw funds from the jar.

---
Built with ❤️ for the Stellar Community.
