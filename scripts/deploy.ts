import { ethers } from "hardhat";
async function main() {
  //await hre.run('compile');
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const Token = await ethers.getContractFactory("Croken");
  const token = await Token.deploy(ethers.utils.parseEther("0"));

  await token.deployed();

  console.log("Token address: ", token.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
