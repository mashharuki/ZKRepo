#!/bin/bash
# First check that Leo is installed.
if ! command -v leo &> /dev/null
then
    echo "leo is not installed."
    exit
fi

echo "
We will be execute hello circuit
"

echo "
Let's start !
"

echo "
Let's take the role of the first bidder - we'll swap in the private key and address of the first bidder to .env.

We're going to run the transition function "place_bid", slotting in the first bidder's public address and the amount that is being bid. The inputs are the user's public address and the amount being bid.

echo '
NETWORK=testnet3
PRIVATE_KEY=APrivateKey1zkpG9Af9z5Ha4ejVyMCqVFXRKknSm8L1ELEwcc4htk9YhVK
' > .env

leo run main 20u32 30u32
"

# Swap in the private key of the first bidder to .env.
echo "
NETWORK=testnet3
PRIVATE_KEY=APrivateKey1zkpG9Af9z5Ha4ejVyMCqVFXRKknSm8L1ELEwcc4htk9YhVK
" > .env

leo run main 20u32 30u32