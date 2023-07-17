const { expect } = require("chai");
const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");


describe("Verifier contract", function () {

  /**
   * deployVerifierFixture method
   * @returns 
   */
  async function deployVerifierFixture() {
    // Get the Signers here.
    const [owner, addr1, addr2] = await ethers.getSigners();
  
    // To deploy our contract, we just have to call ethers.deployContract and await
    // its waitForDeployment() method, which happens once its transaction has been
    // mined.
    const hardhatVerifier = await ethers.deployContract("Verifier");
  
    await hardhatVerifier.waitForDeployment();
  
    // Fixtures can return anything you consider useful for your tests
    return { hardhatVerifier };
  }

  /**
   * Verifier コントラクトのテストコード
   */
  describe("Verifier test", async (accounts) => {

    it("should verify the proof", async () => {
      // get test data
      const { hardhatVerifier } = await loadFixture(deployVerifierFixture);

      // インプット情報を定義
      const a = ["0x1fa3c348db2e50e4f4ca72a9d259df49b1b86bf492a5a550b7f2c1fe6a544c25", "0x1f7a8d2fbe72ec145447ed9464b579f3e0eb9369b9002197f8558ad5f86b25b9"];
      const b = [
        ["0x102ab2ce5420ae7dd7d00bfa09ef427770b31a9ea317d07c2f5a902cfa1fa3d0","0x1c9185ecd114a666219ae5a534ae009ed969f954dbce68f035a4a8453e6a155a"],
        ["0x11a3d46a87c5ebbaf65d53b88d0e143458144653ef070a4e1e503c13134684f1","0x18c34c9acaef52bb34625c52c1ff872d837687476351da9b87465b4fff526a03"]
      ];
      const c = ["0x0790416c24149668373b69fa7a3d09973f2f9346a6620709d84b47e9f91da5af","0x1bd058f9443d0d5f168ec50f411d80461fc56373417ab6cd275ecfed4b9d6964"];
      const input = ["0x000000000000000000000000000000000000000000000000000000000000001e","0x0000000000000000000000000000000000000000000000000000000000000006"];

      // verifyProofメソッドをcall
      const result = await hardhatVerifier.verifyProof(a, b, c, input);
      
      const expectedResult = true; 
      expect(result).to.equal(expectedResult);
    });
  });
});

