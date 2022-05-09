const { expect } = require("chai")
const { ethers, upgrades } = require("hardhat")

async function main() {

  const [owner] = await ethers.getSigners()

  const Contract = await ethers.getContractAt("CCNHandler", "0x7e7DDE6a6837424DF217F2cd2a25535650F25091")

  console.log("Balance: ", await Contract.transfertest(9000000000000))
  console.log("Balance: ", await Contract.getContractBalance())
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error)
    process.exit(1)
})