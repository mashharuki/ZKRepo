# zk_multiplier_dapp

## Deployed Contract

- PlonkVerifier  
  [0x9370C082dabFb847b6F4d7b3Cf9c001aDCC85d8d](https://sepolia.etherscan.io/address/0x9370C082dabFb847b6F4d7b3Cf9c001aDCC85d8d)

- SimpleMultiplier  
  [0xfFC2535688c5C053CF6E4C1B9452Fa14c092fe45](https://sepolia.etherscan.io/address/0xfFC2535688c5C053CF6E4C1B9452Fa14c092fe45)

## How to run

- install

  ```bash
  yarn
  ```

  ```bash
  git submodule update --init --recursive
  ```

- smartcontract build

  ```bash
  yarn backend:build
  ```

- smartcontract verify

  ```bash
  export ETHERSCAN_API_KEY=<Your API Key>
  ```

  ```bash
  cd pkgs/backend && forge verify-contract --chain-id 11155111 --verifier etherscan --etherscan-api-key $ETHERSCAN_API_KEY 0x9370C082dabFb847b6F4d7b3Cf9c001aDCC85d8d PlonkVerifier
  ```

  ```bash
  forge verify-check piiqxjgigygk7zcbf2uqaf1ucrbarfu3pyk2hnduyzsy6r3vuf --chain-id 11155111 --verifier etherscan --etherscan-api-key $ETHERSCAN_API_KEY
  ```

  ```bash
  cd pkgs/backend && forge verify-contract --chain-id 11155111 --verifier etherscan --etherscan-api-key $ETHERSCAN_API_KEY 0xfFC2535688c5C053CF6E4C1B9452Fa14c092fe45 SimpleMultiplier --constructor-args <args>
  ```

  ```bash
  forge verify-check digwf3qwqjptvdifgf7nngpqvyxijnywtzbjqw6g5ii8xajrtu --chain-id 11155111 --verifier etherscan --etherscan-api-key $ETHERSCAN_API_KEY
  ```

- frontend build

  ```bash
  yarn frontend:build
  ```

- frontend dev

  ```bash
  yarn frontend:dev
  ```
