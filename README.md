# NFT Market

##### ----github repository for this project: 
https://github.com/Chfshen/huygens_image_trading

## Run tutorial
##### 1. This project was developed with the following technologies:
- Frontend:React+Javascript
-- React-app
- Backend:
-- React
-- Mcpjs
-- Ipfs
- Blockchain and smart contract: solidity
-- Solidity
-- Hardhat
-- Huygens_dev and Huygens

##### 2. How to use:
To run the application you'll need:
- Git
- Node
- Yarn or npm
- Hardhat
- Ipfs

##### Test on huygens_dev
We deploy our contracts on Huygens_dev. If you would like to make a test on Huygens_dev testnet, you need an Ale wallet account and follow [Computecoin-network instructions](https://github.com/computecoin-network/Huygens_smartcontract_101) to deploy on Huygens or Huygens_dev network.
If you deploy successfully, please go to the “huygens_image_trading/webapp/src/Contract.js” and change the contract address to your new address for deployment.

##### Create Contracts

Under root directory of the project:
```sh
npm install
```
Change private keys in `.env` file. 

```sh
HUYGENS_DEV_PRIVATE_KEY= *YOUR-PRIVATE-KEY*
HUYGENS_PRIVATE_KEY= *YOUR-PRIVATE-KEY*
```

Run following commands:
```sh
 npx hardhat run scripts/create-contract.js --network Huygens_dev
 ```
 This will create contracts on Huygens_dev network.
 
 Modify corresponding contract addresses in `./webapp/src/Contract.js`:
```sh
const controllerContract = "*YOUR CONTROLLER ADDRESS*";
const storeContract = "*YOUR STORE ADDRESS*";
const imageContract = "*YOUR IMAGE ADDRESS*";
const tokenContract = "*YOUR TOKEN ADDRESS*";
```

##### Use our Dapp

First, you need to get the repository:
```sh
git clone https://github.com/Chfshen/huygens_image_trading
```
Now got to the project folder:
```sh
cd huygens_image_trading/webapp
# install packages required
npm install
```
Then, open a new terminal to use ifps:

(Note: You need to config IPFS to send CORS header first. You may refer to `./webapp/README.md`)
```sh
# open ipfs node locally with the address "locahost:5001"
ipfs daemon
```
Run the project in the huygens_image_trading/webapp:
```sh
npm start
```
Then you can see the website of NFT market.





## License

MIT

