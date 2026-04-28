#[cfg(test)]
use super::*;
use soroban_sdk::{testutils::Address as _, Address, Env};
use crate::{TipJarContract, TipJarContractClient};

#[test]
fn test_initialize() {
    let env = Env::default();
    let contract_id = env.register_contract(None, TipJarContract);
    let client = TipJarContractClient::new(&env, &contract_id);

    let owner = Address::generate(&env);
    let token = Address::generate(&env);

    client.initialize(&owner, &token);

    assert_eq!(client.get_owner(), owner);
    assert_eq!(client.get_total(), 0);
}

#[test]
#[should_panic(expected = "already initialized")]
fn test_already_initialized() {
    let env = Env::default();
    let contract_id = env.register_contract(None, TipJarContract);
    let client = TipJarContractClient::new(&env, &contract_id);

    let owner = Address::generate(&env);
    let token = Address::generate(&env);

    client.initialize(&owner, &token);
    client.initialize(&owner, &token);
}

#[test]
fn test_tip() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register_contract(None, TipJarContract);
    let client = TipJarContractClient::new(&env, &contract_id);

    let owner = Address::generate(&env);
    let user = Address::generate(&env);
    
    // Register a token contract for testing
    let token_admin = Address::generate(&env);
    let token_id = env.register_stellar_asset_contract_v2(token_admin).address();
    let token_client = token::Client::new(&env, &token_id);
    let token_admin_client = token::StellarAssetClient::new(&env, &token_id);

    client.initialize(&owner, &token_id);

    token_admin_client.mint(&user, &1000);
    assert_eq!(token_client.balance(&user), 1000);

    client.tip(&user, &100);

    assert_eq!(client.get_total(), 100);
    assert_eq!(token_client.balance(&user), 900);
    assert_eq!(token_client.balance(&contract_id), 100);
}

#[test]
fn test_withdraw() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register_contract(None, TipJarContract);
    let client = TipJarContractClient::new(&env, &contract_id);

    let owner = Address::generate(&env);
    let user = Address::generate(&env);
    
    let token_admin = Address::generate(&env);
    let token_id = env.register_stellar_asset_contract_v2(token_admin).address();
    let token_client = token::Client::new(&env, &token_id);
    let token_admin_client = token::StellarAssetClient::new(&env, &token_id);

    client.initialize(&owner, &token_id);

    token_admin_client.mint(&user, &1000);
    client.tip(&user, &500);

    assert_eq!(token_client.balance(&contract_id), 500);

    client.withdraw(&owner, &200);

    assert_eq!(token_client.balance(&contract_id), 300);
    assert_eq!(token_client.balance(&owner), 200);
}
