import './App.css';
import React from 'react';
import Mcp from 'mcp.js';

const contractArtifact = require('./Controller.json');
const McpFunc = new Mcp();
McpFunc.Contract.setProvider("http://18.182.45.18:8765");
const contractAddress = "0x26241582020Df0c0c46aB13a16aDCF0eeE6B6EE1";
const Instance = new McpFunc.Contract(
  contractArtifact.abi,
  contractAddress
);
const Contract = {
  contractAddress,
  Instance
};

function App() {
  return (
    <div>
      <Connect/>
    </div>
  )
}

class Connect extends React.Component {

  async handleClick() {
      console.log(window['aleereum'])
      window['aleereum'].connect()
      console.log(await window['aleereum'].getBalance(window['aleereum'].account))
  }

  async handleClick2() {
    console.log(await Contract.Instance.methods.getBalance().call());
  } 

  render() {
      return (
        <div>
        <button
          onClick={() => this.handleClick()}
        >
        </button>
        <button
          onClick={() => this.handleClick2()}
        >
        </button>
        </div>
      );
    }    
}


export default App;