require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require('dotenv').config();

const { 
  PRIVATE_KEY, 
  POLYGONSCAN_API_KEY,
  MUMBAI_API_URL
} = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  etherscan: {
    apiKey:{
      polygonMumbai: `${POLYGONSCAN_API_KEY}`
    }
  },
  networks: {
    mumbai: {
      url: MUMBAI_API_URL,
      accounts: [`${PRIVATE_KEY}`],
    },
  }
};
