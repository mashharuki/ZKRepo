pwd
source ./.env
forge script script/AutonomousAirdrop.s.sol:AutonomousAirdropScript --private-key $PRIVATE_KEY_GOERLI --broadcast --rpc-url $PROVIDER_URI_GOERLI -vvvv --verify --etherscan-api-key $ETHERSCAN_API_KEY
cp out/AutonomousAirdrop.sol/AutonomousAirdrop.json ../webapp/src/lib/abi/AutonomousAirdrop.json
