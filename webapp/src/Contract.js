import Mcp from 'mcp.js';

const controllerContract = "0xd640D5a027aE25f061ec728C040388fE39D75045";
const storeContract = "0x9D7b60317835b70C518aCdae93A21aEa8F36c715";
const imageContract = "0xB7E7B1Ea17f43764A6d10A187a7AE7A072D1960e";
const tokenContract = "0x32aAA0136DFc453f8CAB354a33534d3F9442210D";

const storeArtifact = require('./Store.json');
const imageArtifact = require('./Image.json');
const controllerArtifact = require('./Controller.json');

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


const Contract = {
    Controller,
    Store,
    Image,
    McpFunc,
};

export default Contract;