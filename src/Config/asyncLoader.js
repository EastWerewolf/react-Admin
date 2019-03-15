/**
 * 将react分段加载的关键函数
 * 所有container内的页面内加载的页面
 * 都是通过这个组件传递以实现按需加载
 */
import React, { Component } from "react";

export default function asyncComponent(importComponent) {
    class AsyncComponent extends Component {
        constructor(props) {
            super(props);

            this.state = {
                component: null
            };
        }

        async componentDidMount() {
            const { default: component } = await importComponent();

            this.setState({
                component: component
            });
        }

        render() {
            const C = this.state.component;

            return C ? <C {...this.props} /> : null;
        }
    }

    return AsyncComponent; 
}