const { expect } = require("chai")
const { ethers, upgrades } = require("hardhat")

async function main() {

  const [owner] = await ethers.getSigners()

  const Contract = await ethers.getContractFactory("CCNHandler")
  const contract = await Contract.deploy()
  await contract.deployed()
  console.log("Contract deployed to:", contract.address)

  // await contract.mint(50)
  // console.log("Balance: ", await contract.balanceOf(owner.address))
  // console.log("Your Compute Coin Balance: ", await contract.getWalletBalance())
  console.log("Contract Balance: ", await contract.getContractBalance())
  // console.log("target balance: ", await contract.transfertest(100))
  // console.log("\n========after=======\n");
  // console.log("Your Compute Coin Balance: ", await contract.getWalletBalance())
  // console.log("Contract Balance: ", await contract.getContractBalance())
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error)
    process.exit(1)
})