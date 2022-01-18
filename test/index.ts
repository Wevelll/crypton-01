import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { CheeseKEKToken, CheeseKEKToken__factory } from "../typechain";


describe("Token contract", function () {
  let Token: CheeseKEKToken;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;
  let ownerBalance;

  before(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    const chkkTokenFactory = (await ethers.getContractFactory(
      "CheeseKEKToken", owner
      )) as CheeseKEKToken__factory;

    Token = await chkkTokenFactory.deploy(69420);
  });


  describe("Deployment", function () {
    it("Should assign the total supply of tokens to the owner", async function () {
      ownerBalance = await Token.balanceOf(owner.address);
      expect(await Token.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Transactions", function () {
		it("Should transfer tokens between accounts", async function () {
        await Token.transfer(addr1.address, 1337);
        const addr1Balance = await Token.balanceOf(addr1.address);
        expect(addr1Balance).to.equal(1337);

        await Token.connect(addr1).transfer(addr2.address, 322);
        const addr2Balance = await Token.balanceOf(addr2.address);
        expect(addr2Balance).to.equal(322);
    });

    it("Should fail if sender doesn’t have enough tokens", async function () {
        const initialOwnerBalance = await Token.balanceOf(owner.address);

        await expect (
          Token.connect(addr2).transfer(owner.address, 69420)
        ).to.be.revertedWith("ERC20: transfer amount exceeds balance");

        expect(await Token.balanceOf(owner.address)).to.equal(initialOwnerBalance);
    });

    it("Should update balances after transfers", async function () {
        const initialOwnerBalance = await Token.balanceOf(owner.address);

        await Token.transfer(addr1.address, 100);
        await Token.transfer(addr2.address, 50);

        const finalOwnerBalance = await Token.balanceOf(owner.address);
        expect(finalOwnerBalance).to.equal(initialOwnerBalance.sub(150));

        const addr1Balance = await Token.balanceOf(addr1.address);
        expect(addr1Balance).to.be.equal(1115);

        const addr2Balance = await Token.balanceOf(addr2.address);
        expect(addr2Balance).to.be.equal(372);
    });
  });
});