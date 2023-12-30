pragma solidity ^0.8.20;
interface IPasswordHashVerifier {
  function verifyProof(uint[2] calldata _pA, uint[2][2] calldata _pB, uint[2] calldata _pC, uint[1] calldata _pubSignals) external returns (bool);
}