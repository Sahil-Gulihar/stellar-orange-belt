#![no_std]
use soroban_sdk::{contract, contractimpl, Address, Env, symbol_short, Symbol, token};

const TOTAL: Symbol = symbol_short!("TOTAL");
const OWNER: Symbol = symbol_short!("OWNER");
const TOKEN: Symbol = symbol_short!("TOKEN");

#[contract]
pub struct TipJarContract;

#[contractimpl]
impl TipJarContract {
    pub fn initialize(env: Env, owner: Address, token: Address) {
        if env.storage().instance().has(&OWNER) {
            panic!("already initialized");
        }
        env.storage().instance().set(&OWNER, &owner);
        env.storage().instance().set(&TOKEN, &token);
        env.storage().instance().set(&TOTAL, &0i128);
    }

    pub fn tip(env: Env, from: Address, amount: i128) {
        from.require_auth();
        
        let token_addr: Address = env.storage().instance().get(&TOKEN).expect("not initialized");
        let client = token::Client::new(&env, &token_addr);
        
        client.transfer(&from, &env.current_contract_address(), &amount);
        
        let mut total: i128 = env.storage().instance().get(&TOTAL).unwrap_or(0);
        total += amount;
        env.storage().instance().set(&TOTAL, &total);
    }

    pub fn get_total(env: Env) -> i128 {
        env.storage().instance().get(&TOTAL).unwrap_or(0)
    }

    pub fn withdraw(env: Env, to: Address, amount: i128) {
        let owner: Address = env.storage().instance().get(&OWNER).expect("not initialized");
        owner.require_auth();
        
        let token_addr: Address = env.storage().instance().get(&TOKEN).expect("not initialized");
        let client = token::Client::new(&env, &token_addr);
        
        client.transfer(&env.current_contract_address(), &to, &amount);
    }
    
    pub fn get_owner(env: Env) -> Address {
        env.storage().instance().get(&OWNER).expect("not initialized")
    }
}

mod test;
