import React,{Component} from 'react'
import {Link,Redirect } from 'react-router-dom'
import {Layout, Menu, Breadcrumb, Icon,Dropdown,Avatar} from 'antd';
import {observer,inject} from 'mobx-react'
import MenuList from '../component/Menu/menu'
const { Header, Content,Footer } = Layout;
@inject('TestA')
@observer
class Container extends Component{
    componentDidMount(){
        console.log('container',this.props.children)
    }
    //全局路由拦截可以在这里写,凑合用
    componentWillMount(){
        let login = sessionStorage.getItem('login')
        if(!login){
            this.props.history.push('/login');
        }
    }
    checkOut(path){
        path.key==='/login'&&sessionStorage.clear();
        this.props.history.push(path.key)
    }
    render(){
        const menu = (
            <Menu onClick={(path)=>this.checkOut(path)}>
                <Menu.Item key='/selfInfo'>
                    <a href='javascript:void(0)'>个人中心</a>
                </Menu.Item>
                <Menu.Item key='/login'>
                    <a href='javascript:void(0)'>退出登录</a>
                </Menu.Item>
            </Menu>
        );
        return(
            <Layout>
                <MenuList/>
                <Layout>
                    <Header className="header">
                        <div style={{float:'left',width:'50px',textAlign:'center'}}>
                            <Icon
                                className="trigger"
                                style={{color:'#fff',fontSize:'20px'}}
                                type={this.props.TestA.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={()=>this.props.TestA.isCollapse(this.props.TestA.collapsed)}
                            />
                        </div>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['1']}
                            style={{ lineHeight: '64px' }}
                            onClick={(path)=>{this.props.TestA.changeIndex(path.key-1)}}
                        >
                            <Menu.Item key="1">nav 1</Menu.Item>
                            <Menu.Item key="2">nav 2</Menu.Item>
                            <Menu.Item key="3">nav 3</Menu.Item>
                        </Menu>
                        <Dropdown overlay={menu}>
                            <a className="ant-dropdown-link admin" href="javascript:void(0)">
                                <Avatar size='large' style={{ backgroundColor: 'transparent' }} icon='chrome' />
                                <span style={{position:'relative',top:'2px'}}>Admin</span>
                            </a>
                        </Dropdown>
                    </Header>
                    <Content style={{ margin: '0 16px' }}
                    >
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className='container' style={{background: '#fff'}}>{this.props.children}</div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        )
    }
}
export default Container