#!/bin/bash

# Variable to store the name of the circuit
CIRCUIT=PasswordHash

# In case there is a circuit name as input
if [ "$1" ]; then
    CIRCUIT=$1
fi

# Compile the circuit
circom ./src/${CIRCUIT}.circom --r1cs --wasm --sym --c
