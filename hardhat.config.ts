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
//let rinkebyContractAddr = "0xff0AaA1B503DAD34001d9b0eddD271D849A1dBbb";
let contractAddr = "0xff0AaA1B503DAD34001d9b0eddD271D849A1dBbb";

// UNCOMMENT THIS for local node usage and set address afer running scripts/deploy
//let contractAddr = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});

task("balanceof", "Prints account's balance")
.addParam("account", "Account which balance is requested")
.setAction(async (taskArgs, hre) => {
  const [account] = await hre.ethers.getSigners();
  const contract = await hre.ethers.getContractAt("Croken", contractAddr);
  const balance = await contract.balanceOf(taskArgs.account);
  console.log(balance.toString());
});

task("transfer", "Transfer tokens to account")
.addParam("to", "Token receiver")
.addParam("value", "Amount of tokens")
.setAction(async (taskArgs, hre) => {
  const [signer] = await hre.ethers.getSigners();
  const contract = await hre.ethers.getContractAt("Croken", contractAddr);
  const result = await contract.transfer(taskArgs.to, hre.ethers.utils.parseEther(taskArgs.value));
  const newBalance = await contract.balanceOf(taskArgs.to);
  console.log(newBalance.toString());
});

task("transferFrom", "Transfer <value> allowed tokens <from> account <to> another")
.addParam("from", "Account sending tokens from")
.addParam("to", "Account sending tokens to")
.addParam("value", "Amount of tokens to transfer")
.setAction(async (taskArgs, hre) => {
  const [signer] = await hre.ethers.getSigners();
  const contract = await hre.ethers.getContractAt("Croken", contractAddr);
  const result = await contract.transferFrom(taskArgs.from, taskArgs.to, hre.ethers.utils.parseEther(taskArgs.value));
  console.log(result.data.toString());
});

task("allowance", "Check amount <owner> allowed <spender> to use")
.addParam("owner", "Tokens owner")
.addParam("spender", "Tokens spender")
.setAction(async (taskArgs, hre) => {
  const [signer] = await hre.ethers.getSigners();
  const contract = await hre.ethers.getContractAt("Croken", contractAddr);
  const result = await contract.allowance(taskArgs.owner, taskArgs.spender);
  console.log(result.toString());
});

task("approve", "Let <spender> use <value> of tokens")
.addParam("spender", "Spender of tokens")
.addParam("value", "Amount of tokens to allow")
.setAction(async (taskArgs, hre) => {
  const [signer] = await hre.ethers.getSigners();
  const contract = await hre.ethers.getContractAt("Croken", contractAddr);
  const result = await contract.approve(taskArgs.spender, hre.ethers.utils.parseEther(taskArgs.value));
  console.log(result.toString());
});

task("totalsupply", "Prints total supply of tokens")
.setAction(async (taskArgs, hre) => {
  const contract = await hre.ethers.getContractAt("Croken", contractAddr);
  const supply = await contract.totalSupply();
  console.log(supply.toString());
});

task("mint", "Mint tokens")
.addParam("value", "Amount of tokens to mint")
.addParam("account", "Owner of minted tokens")
.setAction(async (taskArgs, hre) => {
  const [signer] = await hre.ethers.getSigners();
  const contract = await hre.ethers.getContractAt("Croken", contractAddr);
  const result = await contract._mint(taskArgs.account, hre.ethers.utils.parseEther(taskArgs.value));
  const balance = await contract.balanceOf(signer.address);
  console.log(balance.toString());
});

task("burn", "Burns tokens")
.addParam("value", "Amount of tokens to burn")
.addParam("account", "Owner of tokens trying to burn")
.setAction(async (taskArgs, hre) => {
  const [signer] = await hre.ethers.getSigners();
  const contract = await hre.ethers.getContractAt("Croken", contractAddr);
  const result = await contract._burn(taskArgs.account, hre.ethers.utils.parseEther(taskArgs.value));
});

const config: HardhatUserConfig = {
  solidity: "0.8.0",
  networks: {
    rinkeby: {
      url: process.env.RINKEBY_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
        gas: 2100000,
        gasPrice: 8000000000
    },
  }
};

export default config;
