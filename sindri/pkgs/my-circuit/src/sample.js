const process = require("process");
const snarkjs = require("snarkjs");
const axios = require("axios");
const fs = require("fs");
require("dotenv").config();

// NOTE: Provide your API key here.
const API_KEY = process.env.SINDRI_API_KEY || "";
const API_URL_PREFIX = process.env.SINDRI_API_URL || "https://sindri.app/api/";

const API_VERSION = "v1";
const API_URL = API_URL_PREFIX.concat(API_VERSION);

const headersJson  = {
  Accept: "application/json",
  Authorization: `Bearer ${API_KEY}`
};

/**
 * pollForStatus method
 * @returns 
 */
async function pollForStatus(endpoint, timeout = 20 * 60) {
  for (let i = 0; i < timeout; i++) {
    const response = await axios.get(API_URL + endpoint, {
      headers: headersJson,
      validateStatus: (status) => status === 200,
    });

    const status = response.data.status;
    if (["Ready", "Failed"].includes(status)) {
      console.log(`Poll exited after ${i} seconds with status: ${status}`);
      return response;
    }

    await new Promise((r) => setTimeout(r, 1000));
  }

  throw new Error(`Polling timed out after ${timeout} seconds.`);
}

/**
 * サーキットを検証するためのサンプルスクリプト
 */
async function main() {
  // サーキットID
  const circuitId = "eaa4a662-5356-4012-a3c9-ed9b8e4e025d";

  try {
    console.log("Proving circuit...");
    // インプットデータを取得する。
    const inputData = JSON.parse(fs.readFileSync("./example-input.json"));
    // インプットデータを用意
    const proofInput = JSON.stringify(inputData);

    console.log("inputData:", proofInput)
    
    // proofを生成するためのAPIを実行する。
    const proveResponse = await axios.post(
      API_URL + `/circuit/${circuitId}/prove`,
      { 
        proof_input: proofInput 
      },
      { 
        headers: headersJson, 
        validateStatus: (status) => status === 201 
      },
    );

    console.log(`proveResponse: ${proveResponse.data.proof}`);

    const proofId = proveResponse.data.proof_id;
    // Poll the proof detail endpoint until the compilation status is `Ready` or `Failed`.
    const proofDetailResponse = await pollForStatus(`/proof/${proofId}/detail`);

    // Check for proving issues.
    const proofDetailStatus = proveResponse.data.status;
    if (proofDetailStatus === "Failed") {
      throw new Error("Proving failed");
    }

    // Retrieve output from the proof.
    // VerificationKeyを含む情報を取得することができる。
    const publicOutput = proofDetailResponse.data.public[0];
    const publicSignals = proofDetailResponse.data.public;
    const proofData = proofDetailResponse.data.proof;
    // proofをファイルに書き込む。
    fs.writeFileSync("./data/proof.json", JSON.stringify(proofData))
    console.log(`Circuit proofDetailResponse: ${proofData}`);
    console.log(`Circuit proof output signal: ${publicOutput}`);

    // verifyする。
    console.log(`verifying my-circuit....`);
    // verification keyを取得する。
    const verification_key = JSON.parse(fs.readFileSync("./verification_key.json"));
    // 検証
    const res = await snarkjs.groth16.verify(verification_key, publicSignals, proofData);

    if (res === true) {
      console.log("Verification OK");
    } else {
      console.log("Invalid proof");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("An unknown error occurred.");
    }
  }
}

main();