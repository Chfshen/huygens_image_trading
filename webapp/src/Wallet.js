import React from "react";
import Contract from './Contract';
import BigNumber from "bignumber.js";


class Wallet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: 0,
            loadingBalance: true,
        }
    }

    handleInput(event) {
        event.preventDefault()
        this.setState({
            amount: event.target.value
        })
    }

    async handleSubmit() {
        let address = window['aleereum'].account
        if (this.props.type === 'deposit') {
            await Contract.Controller.controllerInstance.methods.deposit().sendBlock({
                from: address,
                password: this.props.password,
                amount: new BigNumber(this.state.amount).toString(),
                gas_price: '20000000000',
                gas: '2000000',
            });
        }
        else if (this.props.type === 'withdraw') {
            await Contract.Controller.controllerInstance.methods.withdraw(this.state.amount).sendBlock({
                from: address,
                password: this.props.password,
                amount: new BigNumber('0').toString(),
                gas_price: '20000000000',
                gas: '2000000',
            });
        }
        else {
            console.log("Submit Param Error");
        }
        this.props.parentSetState({
            page: 'shop',
        });
    }

    handleCancel() {
        this.props.parentSetState({
            page: 'shop',
        });
    }

    async loadBlance() {
        let address = window['aleereum'].account;
        let balance = await Contract.Token.tokenInstance.methods.balanceOf(address).call();
        this.setState({
            balance: balance.toString(),
            loadingBalance: false,
        });
    }

    balance() {
        if (this.state.loadingBalance) {
            this.loadBlance();
            return (
                <div>
                    <div className="spinner-border spinner-border-sm" role="status"/>
                </div>
            )
        }
        else {
            return (
                <div>
                    {this.state.balance}
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <div>
                    Current Balance:
                    {this.balance()}
                </div>
                <div>
                    Amount:
                    <input id='amount' type='text' onChange={(e) => this.handleInput(e)}></input>
                </div>
                <button id='submit' className='btn btn-primary' onClick={() => this.handleSubmit()}>Submit</button>
                <button id='cancel' className='btn btn-primary' onClick={() => this.handleCancel()}>Cancel</button>
            </div>
        )
    }
}

export default Wallet;