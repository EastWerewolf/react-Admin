import React, { Component } from 'react';
import {Layout} from 'antd'
import './App.scss';

class App extends Component {
    componentDidMount(){
        console.log(this.props.children,Layout)
    }
    componentWillReceiveProps(nextProps){
        console.log(nextProps.location.pathname,111)    // path/to/abc
    }
    render() {
        return (
        <Layout className="App">
            {this.props.children}
        </Layout>
    );}
}

export default App;
