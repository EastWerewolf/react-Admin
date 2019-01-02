import React, {Component} from 'react'
import { Tabs } from 'antd';
import {observer,inject} from 'mobx-react'
const TabPane = Tabs.TabPane;
const routerWithName = [{
    path:'/',title:'看板',
},{
    path:'/doc',title:'文档'
},{
    path:'/home',title:'fake首页'
},{
    path:'/table',title:'表格'
}]

@inject('TestA')
@observer
class TabBar extends Component {
    constructor(props) {
        super(props);
        this.newTabIndex = 0;
        const panes = [{title:'看板',path:'/',key:'1',closable: false}];
        this.state = {
            activeKey: panes[0].key,
            panes,
        };
    }
    componentWillMount(){

    }
    componentWillReceiveProps(){
        const receivePath = this.props.TestA.path;
        const panesArray = this.state.panes.map(i=>i.path);
        const pathArray = routerWithName.map(i=>i.path);
        if (pathArray.indexOf(receivePath)>-1&&panesArray.indexOf(receivePath)===-1&&receivePath){
            let routerInfo = null;
            routerWithName.forEach(i=>{if(i.path===receivePath){routerInfo = i}});
            routerInfo.key =String(new Date().getTime());
            const panes = this.state.panes;
            const activeKey = routerInfo.key;
            panes.push(routerInfo);
            this.setState({panes,activeKey});
        }else if(pathArray.indexOf(receivePath)>-1&&panesArray.indexOf(receivePath)>-1&&receivePath){
            this.state.panes.forEach(i=>{
                if(i.path===receivePath){
                    this.setState({activeKey:i.key})
                }
            })
        }
    }
    onChange = (activeKey) => {
        this.setState({ activeKey });
        this.state.panes.forEach(i=>{
            if(i.key===activeKey){
                this.props.history.push(i.path)
            }
        })
    }

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }

    add = () => {
        const panes = this.state.panes;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: 'New Tab', content: 'Content of new Tab', key: activeKey });
        this.setState({ panes, activeKey });
    }

    remove = (targetKey) => {
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (lastIndex >= 0 && activeKey === targetKey) {
            activeKey = panes[lastIndex].key;
            this.state.panes.forEach(i=>{
                if(i.key===activeKey){
                    this.props.history.push(i.path)
                }
            })
        }
        this.setState({ panes, activeKey });
    }

    render() {
        return (
            <Tabs
                hideAdd
                onChange={this.onChange}
                activeKey={this.state.activeKey}
                type="editable-card"
                onEdit={this.onEdit}
            >
                {this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key} closable={pane.closable}/>)}
            </Tabs>
        );
    }
}
export default TabBar