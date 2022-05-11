import React from "react";

class Connect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
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