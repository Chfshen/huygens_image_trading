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

