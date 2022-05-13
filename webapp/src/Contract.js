import Mcp from 'mcp.js';

const controllerContract = "0x832161D1125C22Aee0A820bBfF33dD3423B51427";
const storeContract = "0x7EE92B6E541A7E53bB40e485196Ce1F986A48E7A";
const imageContract = "0x4C5ad6bB986C44CB8baf59997f8848298c5f9b3d";
const tokenContract = "0x4029Ab8f73256De94728060ff97C8c101A3161bb";

const storeArtifact = require('./Store.json');
const imageArtifact = require('./Image.json');
const controllerArtifact = require('./Controller.json');
const tokenArtifact = require('./Token.json');

const options = {
    host: "18.182.45.18",
    port: 8765
}
const McpFunc = new Mcp(options);
McpFunc.Contract.setProvider("http://18.182.45.18:8765");

const controllerInstance = new McpFunc.Contract(
    controllerArtifact.abi,
    controllerContract
);
const Controller = {
    controllerContract,
    controllerInstance
};

const storeInstance = new McpFunc.Contract(
    storeArtifact.abi,
    storeContract
);
const Store = {
    storeArtifact,
    storeInstance
};

const imageInstance = new McpFunc.Contract(
    imageArtifact.abi,
    imageContract
);
const Image = {
    imageContract,
    imageInstance
};

const tokenInstance = new McpFunc.Contract(
    tokenArtifact.abi,
    tokenContract
);
const Token = {
    tokenContract,
    tokenInstance
};


const Contract = {
    Controller,
    Store,
    Image,
    Token,
    McpFunc,
};

export default Contract;