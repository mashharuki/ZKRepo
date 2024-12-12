// SPDX-License-Identifier: MPL-2.0
pragma solidity ^0.8.20;

import {Proof} from "./Proof.sol";

/**
 * GetSecret Contract
 */
contract GetSecret {
    address public proxy;

    string private secret = "bad Secret";

    event Response(bool success, string secret, address recipient);

    constructor(address _proxy) {
        proxy = _proxy;
    }

    function getSecret() public view returns (string memory) {
        return secret;
    }

    function assignSecret(Proof calldata _proof) public returns (string memory) {
        require(msg.sender == _proof.recipient, "Sender address do not match with recipient!");
        (bool success, bytes memory secretData) =
            proxy.call(abi.encodeWithSignature("attest(bytes)", abi.encode(_proof)));
        if (success) {
            secret = abi.decode(secretData, (string));
            emit Response(true, secret, msg.sender);
            return secret;
        }
        revert("Nuh uh!");
    }
}