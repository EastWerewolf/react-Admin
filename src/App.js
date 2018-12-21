import React, { Component } from 'react';
import {Layout} from 'antd'
import './App.scss';

class App extends Component {
    componentDidMount(){

    }
    componentWillReceiveProps(nextProps){

    }
    render() {
        return (
        <Layout className="App">
            {this.props.children}
        </Layout>
    );}
}

export default App;
