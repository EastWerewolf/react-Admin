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
                for(let k = 0;k<MenuData[i][j].subMenu.length;k++){
                    if(MenuData[i][j].subMenu[k].linkTo===path){
                        OpenKeys = [MenuData[i][j].key];
                        SelectedKeys = [MenuData[i][j].subMenu[k].id];
                        this.setState({OpenKeys, SelectedKeys});
                        this.props.TestA.changeIndex(i)
                    }
                }
            }
        }
    }
    componentWillReceiveProps(){

    }
    replace(url){
        this.props.history.replace(url)
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
                            return(<Menu.Item key={j.id}><a onClick={()=>{this.replace(j.linkTo)}}>{j.name}</a></Menu.Item>)
                        })}
                        </SubMenu>)
                    })}
                </Menu>
            </Sider>
        )
    }
}
export default MenuList
