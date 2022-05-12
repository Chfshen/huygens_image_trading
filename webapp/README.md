
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Usage

### IPFS

Download IPFS according to this:
https://docs.ipfs.io/install/command-line/#system-requirements.

Run following commands:

`$ ipfs init`

`$ ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "GET", "POST", "OPTIONS"]'`

`$ ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'`

`$ ipfs daemon`

Keep the daemon running when testing your server.

### Local Server

`$npm install`

`$npm start`

Go to http://localhost:3000 in your browser with Ale Wallet plugin installed.
