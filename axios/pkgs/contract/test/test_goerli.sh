cd $(git rev-parse --show-toplevel)
source ./axios/pkgs/contract/.env

forge test --fork-url $PROVIDER_URI_GOERLI --match-contract AutonomousAirdrop -vvvv