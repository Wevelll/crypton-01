import * as dotenv from "dotenv";

import "./tasks";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import { ethers } from "ethers";
import "@nomiclabs/hardhat-web3";

dotenv.config();
export let contractAddr = process.env.CONTRACT_ADDR !== undefined ? process.env.CONTRACT_ADDR : "";

const config: HardhatUserConfig = {
  solidity: "0.8.0",
  networks: {
    rinkeby: {
      url: process.env.RINKEBY_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : []
    },
  }
};

export default config;
