// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./interface/IPlonkVerifier.sol";

/**
 * SimpleMultiplier Contract
 */
contract SimpleMultiplier {
    // verify contract
    address public s_plonkVerifierAddress;

    event ProofResult(bool result);

    /**
     * コンストラクター
     */
    constructor(address plonkVerifierAddress) {
        s_plonkVerifierAddress = plonkVerifierAddress;
    }

    /**
     * submmitProof method
     */
    function submitProof(
        bytes memory proof,
        uint256[] memory pubSignals
    ) public returns (bool) {
        // call verifyProof method
        bool result = IPlonkVerifier(s_plonkVerifierAddress).verifyProof(
            proof,
            pubSignals
        );
        // emit
        emit ProofResult(result);
        return result;
    }
}
