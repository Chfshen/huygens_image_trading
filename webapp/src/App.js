import './App.css';
import React, {useEffect} from 'react';
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

const IPFS = require('ipfs-http-client');
const ipfs = IPFS.create('http://127.0.0.1:5001');

function App() {
  useEffect(() => {
    InitIpfs();
  }, []);

  const run = async () => {
    const data = await ipfs.add("")
    console.log(data);
  }
  run();

  // const uploadFile = useCallback(async (file) => {
  //   const files = [
  //     {
  //       path: file.name + file.path,
  //       content: file,
  //     },
  //   ];

  //   for await (const result of ipfs.add(files)) {
  //     console.log(result.cid.string);
  //   }
  // }, []);

  return (
    <div>
      <Connect/>
    </div>
  )
}


async function InitIpfs() {
  console.log(await ipfs.version());
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

  showFile = async (e) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => { 
      const text = (e.target.result)
      console.log(text)
      alert(text)
    };
    const data = await ipfs.add(e.target.files[0]);
    console.log(data);
    // reader.readAsText(e.target.files[0]);
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
        <input type="file" onChange={(e) => this.showFile(e)} />
        </div>
      );
    }    
}


export default App;