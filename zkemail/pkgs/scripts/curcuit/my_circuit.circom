include "@zk-email/circuits/email-verifier.circom";
include "simple_regex.circom"

template MyCircuit() {
  signal input // inputs from your input.ts file

  // Witnesses and constraints for regex go here

  signal output // output that is public

  component emailVerifier {} = MyCircuit();
}