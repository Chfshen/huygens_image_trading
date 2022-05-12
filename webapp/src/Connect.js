import React from "react";

class Connect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            password: '',
        };
    }

    connectAle() {
        const isConnected = window['aleereum'].isConnected
        if (isConnected) {
            this.setState({
                message: 'Connected'
            })
        } else {
            window['aleereum'].connect()
        }
    }

    goShop() {
        const isConnected = window['aleereum'].isConnected

        if (isConnected) {
            this.props.setState({
                page: 'shop'
            })
        } else {
            this.setState({
                message: 'Not Connected'
            })
        }
    }

    handleInput(event) {
        event.preventDefault();
        this.setState({
            password: event.target.value
        });
    }

    handleSubmit() {
        this.props.setState({
            password: this.state.password,
        });
        alert("Password set: ", this.state.password);
    }

    render() {
        return (
            <div>
                <div className='center'>
                    <div id='homeTitle'>
                        Title
                    </div>
                    <div>
                        <button id='connectAle' className='btn btn-primary' onClick={() => this.connectAle()}>Connect
                            Ale
                        </button>
                        <div className='warning'>{this.state.message}</div>
                    </div>
                    <div>
                        Password:
                        <input id='amount' type='text' onChange={(e) => this.handleInput(e)}></input>
                        <button id='submit' className='btn btn-primary' onClick={() => this.handleSubmit()}>Submit</button>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-9'></div>
                    <div className='col-3'>
                        <div>
                            <button id='goShop' className='btn btn-primary' onClick={() => this.goShop()}>Go Shopping
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Connect