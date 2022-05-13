import Mcp from 'mcp.js';

const controllerContract = "0xE26A8a3321050D947288E06918C97035aBE18625";
const storeContract = "0x3B5870552d6D001017A6cD63A8D24d611fed11C0";
const imageContract = "0xb80f4Bb488ec4d4e5327f80386aD5ee549A358Fe";
const tokenContract = "0x2523D993726e92F18db816D2DEc85b8E66dc4A13";

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