import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import { ethers } from "ethers";
import "@nomiclabs/hardhat-web3";

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html

//transfer, transferFrom, approve
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});
/*
task("transfer", "Transfers tokens between accounts")
.addParam("from", "Sender's address")
.addParam("to", "Receiver's address")
.setAction(async (taskArgs) => {

});

task("deploy", "Deploys contract to local network and prints its address")
.setAction(async (hre) => {
  const token = await hre.ethers.getContractFactory("Croken");
  const tokenc = await token.deploy(69420);
  console.log(tokenc.toChecksumAddress());
});
*/
task("balanceOf", "Prints accont balance")
.addParam("account", "Account to check")
.addParam("contract", "Contract address")
.setAction(async (taskArgs, hre) => {
  const token = await hre.ethers.getContractFactory("Croken");
  const tokenc = await token.attach(taskArgs.contract);
  const account = await hre.web3.utils.toChecksumAddress(taskArgs.account);
  const balance = await tokenc.balanceOf(account);
  console.log(balance);
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  networks: {
    ropsten: {
      url: process.env.ROPSTEN_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
