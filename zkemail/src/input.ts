import { generateCircuitInputs } from "@zk-email/helpers/dist/input-helpers";
import { verifyDKIMSignature } from "@zk-email/helpers/dist/dkim"
import fs from "fs";
import path from "path";

/**
 * generate input scirpt
 */
async function main() {
  console.log(" =================================== [Start] =================================== ");

  const rawEmail = fs.readFileSync(
    path.join(__dirname, "./../emls/rawEmail.eml"),
    "utf8"
  );
  
  const dkimResult = await verifyDKIMSignature(Buffer.from(rawEmail));
  
  const circuitInputs = generateCircuitInputs({
    rsaSignature: dkimResult.signature, // The RSA signature of the email
    rsaPublicKey: dkimResult.publicKey, // The RSA public key used for verification
    body: dkimResult.body, // body of the email 
    bodyHash: dkimResult.bodyHash, // hash of the email body
    message: dkimResult.message, // the message that was signed (header + bodyHash)
    ignoreBodyHashCheck: false, // To be used when ignore_body_hash_check is true in circuit
    //Optional to verify regex in the body of email
    shaPrecomputeSelector: undefined, // String to split the body for SHA pre computation 
    maxMessageLength: 10000000, // Maximum allowed length of the message in circuit
    maxBodyLength: 10000000, // Maximum allowed length of the body in circuit
  });
  
  fs.writeFileSync("./data/input.json", JSON.stringify(circuitInputs));

  console.log(" =================================== [End] =================================== ");
}

main()
  .catch((error) => {
    console.error("error:", error)
    process.exitCode = 1
  })