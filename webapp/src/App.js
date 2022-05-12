import './App.css';
import React, {useEffect} from 'react';
import Connect from "./Connect";
import Shop from "./Shop";

function App() {
  useEffect(() => {
  }, []);

  return (
    <div>
      <Page/>
    </div>
  )
}


class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'connect'
        };
        this.setState = this.setState.bind(this)
    }

    render() {
        if (this.state.page === 'connect') {
            return (
                <div>
                    <Connect setState={this.setState}/>
                </div>
            )
        } else if (this.state.page === 'shop') {
            return (
                <div>
                    <Shop setState={this.setState}/>
                </div>
            )
        }
    }
}


export default App;