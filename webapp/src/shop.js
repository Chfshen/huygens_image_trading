import React from "react";

class Shop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'shop',
            currentIndex: 0,
            item: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            amount: 9
        };
    }

    sell() {
        this.setState({
            page: 'sell'
        })
    }

    buy() {
        this.setState({
            page: 'buy'
        })
    }

    upload() {
        this.setState({
            page: 'upload'
        })
    }

    showItem(index) {
        if (index < this.state.amount) {
            return this.state.item[index]
        }
    }

    showItems() {
        return (
            <div>
                <div className='row'>
                    <div className='item col-3' onClick={() => this.buy()}>
                        {this.showItem(this.state.currentIndex)}
                    </div>
                    <div className='item col-3' onClick={() => this.buy()}>
                        {this.showItem(this.state.currentIndex + 1)}
                    </div>
                    <div className='item col-3' onClick={() => this.buy()}>
                        {this.showItem(this.state.currentIndex + 2)}
                    </div>
                    <div className='item col-3' onClick={() => this.buy()}>
                        {this.showItem(this.state.currentIndex + 3)}
                    </div>
                </div>
                <div className='row'>
                    <div className='item col-3' onClick={() => this.buy()}>
                        {this.showItem(this.state.currentIndex + 4)}
                    </div>
                    <div className='item col-3' onClick={() => this.buy()}>
                        {this.showItem(this.state.currentIndex + 5)}
                    </div>
                    <div className='item col-3' onClick={() => this.buy()}>
                        {this.showItem(this.state.currentIndex + 6)}
                    </div>
                    <div className='item col-3' onClick={() => this.buy()}>
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

    render() {
        if (this.state.page == 'shop') {
            return (
                <div>
                    <div id='menu' className='row'>
                        <div className='col-9'>
                            Title
                        </div>
                        <div className='col-3'>
                            <button id='upload' className='btn btn-primary' onClick={() => this.upload()}>Upload</button>
                            <button id='sell' className='btn btn-primary' onClick={() => this.sell()}>Sell</button>
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
        } else if (this.state.page == 'upload') {
            return (
                <div>
                    <input id='image' type='file'></input>
                    <button id='backShop' className='btn btn-primary' onClick={() => this.backShop()}>Upload</button>
                </div>
            );

        } else if (this.state.page == 'sell') {
            return (
                <div>
                    <div>
                        Image Id:
                        <input id='imageId' type='text'></input>
                    </div>
                    <div>
                        Price:
                        <input id='price' type='text'></input>
                    </div>
                    <button id='backShop' className='btn btn-primary' onClick={() => this.backShop()}>Sell</button>
                </div>
            );
        } else if (this.state.page == 'buy') {
            return (
                <div>
                    <div>
                        Image Id:
                    </div>
                    <div>
                        Price:
                    </div>
                    <button id='buy' className='btn btn-primary'>Buy</button>
                    <button id='backShop' className='btn btn-primary' onClick={() => this.backShop()}>Continue Shopping</button>
                </div>
            )
        }
    }
}

export default Shop