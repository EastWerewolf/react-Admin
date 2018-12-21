import React, {Component} from 'react'
import {Menu,Icon,Layout} from 'antd';
import {Link} from 'react-router-dom'
import {inject,observer} from 'mobx-react'

import {MenuData} from './menuData'
const { SubMenu } = Menu;
const {Sider} = Layout;

@inject('TestA')
@observer
class MenuList extends Component{
    constructor(){
        super();
        this.state = {
            SelectedKeys:[],
            OpenKeys:[],
        }
    }
    componentWillMount(){
        const path = this.props.location.pathname;
        let  OpenKeys = null,SelectedKeys = null;
        for(let i = 0;i <MenuData.length;i++){
            for(let j = 0;j<MenuData[i].length;j++){
                MenuData[i][j].subMenu.forEach((item)=>{
                    if(item.linkTo===path){
                        OpenKeys = [MenuData[i][j].key];
                        SelectedKeys = [item.id];
                        console.log(OpenKeys, SelectedKeys);
                        this.setState({OpenKeys, SelectedKeys},()=>{
                            console.log(path,'menu',this.props.TestA.MenuIndex,this.state)
                        });
                        this.props.TestA.changeIndex(i)
                    }
                });
            }
        }
    }
    componentWillReceiveProps(){

    }
    render(){
        return(
            <Sider
                width={200}
                collapsible
                trigger={null}
                collapsed={this.props.TestA.collapsed}
            >
                <Menu
                    mode="inline"
                    theme="light"
                    defaultSelectedKeys={this.state.SelectedKeys}
                    defaultOpenKeys={this.state.OpenKeys}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    {MenuData[this.props.TestA.MenuIndex].map(i=>{
                        return(<SubMenu key={i.key} title={<span><Icon type={i.icon} /><span>{i.name}</span></span>}>
                        {i.subMenu.map(j=>{
                            return(<Menu.Item key={j.id}><Link to={j.linkTo}>{j.name}</Link></Menu.Item>)
                        })}
                        </SubMenu>)
                    })}
                </Menu>
            </Sider>
        )
    }
}
export default MenuList