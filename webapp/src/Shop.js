import React from "react";
import BigNumber from 'bignumber.js';
import Contract from './Contract';
import Wallet from './Wallet';

Contract.McpFunc.request.status().then(function (res) {
    console.log('MCP Status:', res);
}).catch(function(error){
    console.log("accountList catch", error);
});

const IPFS = require('ipfs-http-client');
const ipfs = IPFS.create('http://127.0.0.1:5001');




class Shop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'shop',
            currentIndex: 0,
            item: [],
            amount: null,
            loading: true,
            url: '',
            imageId: null,
            price: null,
            urlLoading: null,
            urls: [],
            search: '',
        };
        this.setState = this.setState.bind(this);
    }

    async getProducts() {
        const products = await Contract.Store.storeInstance.methods.getAllProducts().call();

        let loadingArray = new Array(products.length).fill(true)
        console.log(products)
        this.setState({
            item: products,
            loading: false,
            amount: products.length,
            urlLoading: loadingArray
        });

        console.log(this.state.amount)
    }

    sell() {
        this.setState({
            page: 'sell'
        })
    }

    buy(i) {
        this.setState({
            page: 'buy',
            buyingIndex: i,
        })
    }

    upload() {
        this.setState({
            page: 'upload'
        })
    }

    deposit() {
        this.setState({
            page: 'deposit'
        })
    }

    withdraw() {
        this.setState({
            page: 'withdraw'
        })
    }

    async submitUpload() {
        let address = window['aleereum'].account
        console.log(address)
        const id = await Contract.Image.imageInstance.methods.addImage(address, this.state.url).sendBlock({
            from: address,
            password: this.props.password,
            amount: new BigNumber('0').toString(),
            gas_price: '20000000000',
            gas: '2000000',
        }, function(error, transactionHash) {
            if (error)
                console.log("Upload Error!", error);
            console.log("Upload txn hash: ", transactionHash);
        });
        console.log("id: ", id);
        this.setState({
            page: 'shop'
        })
    }

    async submitSell() {
        let address = window['aleereum'].account
        this.setState({
            loading: true
        })
        let owner = await Contract.Image.imageInstance.methods.ownerOf(this.state.imageId).call();
        console.log(owner);
        if (owner !== address)
            alert("You can only sell images owned by you!");
        else {            
            await Contract.Image.imageInstance.methods.approve(Contract.Controller.controllerContract, this.state.imageId).sendBlock({
                from: address,
                password: this.props.password,
                amount: new BigNumber('0').toString(),
                gas_price: '20000000000',
                gas: '2000000',
            });
            await Contract.Controller.controllerInstance.methods.startSell(parseInt(this.state.imageId), parseInt(this.state.price)).sendBlock({
                from: address,
                password: this.props.password,
                amount: new BigNumber('0').toString(),
                gas_price: '20000000000',
                gas: '2000000',
            });
        }
        this.setState({
            page: 'shop',
            loading: true,
        })
    }

    async getUrl(i) {
        const url = await Contract.Image.imageInstance.methods.tokenURI(this.state.item[i][0].toString()).call();
        
        let array = this.state.urlLoading;
        array[i] = false;
        let array2 = this.state.urls;
        array2[i] = url;
        this.setState({
            urlLoading: array,
            urls: array2
        });
        let ret = false;
        return {url, ret}
    }



    showItem(index) {
        if (index < this.state.amount) {
            if (this.state.urlLoading[index]) {
                this.getUrl(index);
                return (
                    <div>
                        <div>
                            {this.state.item[index][0].toString()}
                        </div>
                        <div>
                        {this.state.item[index][1].toString()}
                        </div>
                        <div className="spinner-border" role="status">
                        </div>
                    </div>
                );
            }
            else {
                return (
                    <div>
                        <div>
                            {this.state.item[index][0].toString()}
                        </div>
                        <div>
                        {this.state.item[index][1].toString()}
                        </div>
                        <div>
                            <img className='image' alt='' src={`${this.state.urls[index]}`}></img>
                        </div>
                    </div>
                )
            }
        }
    }

    showItems() {
        return (
            <div>
                <div className='row'>
                    <div className='item col-3' onClick={() => this.buy(this.state.currentIndex)}>
                        {this.showItem(this.state.currentIndex)}
                    </div>
                    <div className='item col-3' onClick={() => this.buy(this.state.currentIndex + 1)}>
                        {this.showItem(this.state.currentIndex + 1)}
                    </div>
                    <div className='item col-3' onClick={() => this.buy(this.state.currentIndex + 2)}>
                        {this.showItem(this.state.currentIndex + 2)}
                    </div>
                    <div className='item col-3' onClick={() => this.buy(this.state.currentIndex + 3)}>
                        {this.showItem(this.state.currentIndex + 3)}
                    </div>
                </div>
                <div className='row'>
                    <div className='item col-3' onClick={() => this.buy(this.state.currentIndex + 4)}>
                        {this.showItem(this.state.currentIndex + 4)}
                    </div>
                    <div className='item col-3' onClick={() => this.buy(this.state.currentIndex + 5)}>
                        {this.showItem(this.state.currentIndex + 5)}
                    </div>
                    <div className='item col-3' onClick={() => this.buy(this.state.currentIndex + 6)}>
                        {this.showItem(this.state.currentIndex + 6)}
                    </div>
                    <div className='item col-3' onClick={() => this.buy(this.state.currentIndex + 7)}>
                        {this.showItem(this.state.currentIndex + 7)}
                    </div>
                </div>
            </div>
        )
    }

    back() {
        console.log(this.state.currentIndex)
        let index = this.state.currentIndex - 8
        console.log(index)
        this.setState({
            currentIndex: index
        })
        console.log(this.state.currentIndex)
    }

    next() {
        console.log(this.state.currentIndex)
        let index = this.state.currentIndex + 8
        console.log(index)
        this.setState({
            currentIndex: index
        })
        console.log(this.state.currentIndex)
    }

    backButton() {
        if (this.state.currentIndex > 0) {
            return (
                <button id='back' className='btn btn-primary' onClick={() => this.back()}>Back</button>
            )
        }
    }

    nextButton() {
        if (this.state.amount - this.state.currentIndex > 8) {
            return (
                <button id='next' className='btn btn-primary' onClick={() => this.next()}>Next</button>
            )
        }
    }

    backShop() {
        this.setState({
            page: 'shop'
        })

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
        console.log(data['path']);
        const url = 'https://ipfs.io/ipfs/' + data['path'];
        this.setState({
            url: url
        })
        //reader.readAsText(e.target.files[0]);
    }

    setImage(e) {
        e.preventDefault()
        this.setState({
            imageId: e.target.value
        })
    }

    setPrice(e) {
        e.preventDefault()
        this.setState({
            price: e.target.value
        })
    }

    async buyImage(index) {
        console.log(this.state.item[index]);

        let address = window['aleereum'].account;

        await Contract.Token.tokenInstance.methods.approve(Contract.Controller.controllerContract, this.state.item[index][1].toString()).sendBlock({
            from: address,
            password: this.props.password,
            amount: new BigNumber('0').toString(),
            gas_price: '20000000000',
            gas: '2000000',
        });

        await Contract.Controller.controllerInstance.methods.tradeImage(this.state.item[index][0].toString()).sendBlock({
            from: address,
            password: this.props.password,
            amount: new BigNumber('0').toString(),
            gas_price: '20000000000',
            gas: '2000000',   
        });
        
        this.setState({
            page: 'shop',
            loading: true,
        });
    }

    searchInput(event) {
        event.preventDefault()
        this.setState({
            search: event.target.value,
        })
    }

    async searchSubmit() {
        let searchId = new BigNumber(this.state.search).toString();
        if (searchId === "NaN")
            alert("Image ID must a number!");
        else if(await Contract.Image.imageInstance.methods.exists(this.state.search).call()) {
            alert("Owner: "+ await Contract.Image.imageInstance.methods.ownerOf(this.state.search).call());
        }
        else
            alert("No such Image!");
    }


    render() {
        if (this.state.page === 'shop') {
            if (this.state.loading) {
                this.getProducts();
                return (
                    <div>Loading...</div>
                )
            }
            else
            return (
                <div>
                    <div id='menu' className='row'>
                        <div className='col-9'>
                            Title
                        </div>
                        <div>
                            Search Image Ownership:
                            <input id='amount' type='text' onChange={(e) => this.searchInput(e)}></input>
                            <button id='submit' className='btn btn-primary' onClick={() => this.searchSubmit()}>Submit</button>
                        </div>
                        <div className='col-3'>
                            <button id='upload' className='btn btn-primary' onClick={() => this.upload()}>Upload</button>
                            <button id='sell' className='btn btn-primary' onClick={() => this.sell()}>Sell</button>
                            <button id='deposit' className='btn btn-primary' onClick={() => this.deposit()}>Deposit</button>
                            <button id='withdraw' className='btn btn-primary' onClick={() => this.withdraw()}>Withdraw</button>
                        </div>
                    </div>
                    {this.showItems()}
                    <div className='row'>
                        <div className='col-6 back'>
                            {this.backButton()}
                        </div>
                        <div className='col-6 next'>
                            {this.nextButton()}
                        </div>
                    </div>
                </div>
            );
        } else if (this.state.page === 'upload') {
            return (
                <div>
                    <input id='image' type='file' onChange={(e) => this.showFile(e)}></input>
                    <button id='backShop' className='btn btn-primary' onClick={() => this.submitUpload()}>Upload</button>
                </div>
            );

        } else if (this.state.page === 'sell') {
            return (
                <div>
                    <div>
                        Image Id:
                        <input id='imageId' type='text' onChange={(e) => this.setImage(e)}></input>
                    </div>
                    <div>
                        Price:
                        <input id='price' type='text' onChange={(e) => this.setPrice(e)}></input>
                    </div>
                    <button id='backShop' className='btn btn-primary' onClick={() => this.submitSell()}>Sell</button>
                </div>
            );
        } else if (this.state.page === 'buy') {
            return (
                <div>
                    {this.showItem(this.state.buyingIndex)}
                    <button id='buy' className='btn btn-primary' onClick={() => this.buyImage(this.state.buyingIndex)}>Buy</button>
                    <button id='backShop' className='btn btn-primary' onClick={() => this.backShop()}>Continue Shopping</button>
                </div>
            )
        } else if (this.state.page === 'deposit') {
            return (
                <Wallet type='deposit' parentSetState={this.setState} password={this.props.password}/>
            )
        } else if (this.state.page === 'withdraw') {
            return (
                <Wallet type='withdraw' parentSetState={this.setState} password={this.props.password}/>
            )
        }
    }
}

export default Shop