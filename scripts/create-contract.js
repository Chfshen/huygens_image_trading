const { expect } = require("chai")
const { ethers, upgrades } = require("hardhat")

async function main() {

  const [owner] = await ethers.getSigners()

  const Contract = await ethers.getContractFactory("Controller")
  const contract = await Contract.deploy()
  await contract.deployed()
  console.log("Controller deployed to:", contract.address)
  console.log("Token deployed to:", await contract.getTokenContract())
  console.log("Image deployed to:", await contract.getImageContract())
  console.log("Store deployed to:", await contract.getStoreContract())
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error)
    process.exit(1)
})