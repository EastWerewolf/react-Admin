import React,{Component} from 'react'
import {Layout, Menu, Icon,Dropdown,Avatar} from 'antd';
import {observer,inject} from 'mobx-react'
import {Link} from 'react-router-dom'

import TabBar from '../Tab/tabBar'
import MenuList from '../Menu/menu'
const { Header, Content,Footer } = Layout;

@inject('TestA')
@observer
class Container extends Component{
    constructor(){
        super();
        this.state = {
            SelectedKeys:['1'],
            classList:'container upBig'
        }
    }
    //这里可以判断登录状态,控制页面跳转
    componentWillMount(){
        let login = sessionStorage.getItem('login')
        if(!login){
            this.props.history.push('/login');
        }else{
            this.props.TestA.changePath(this.props.location.pathname)
        }
    }
    componentDidMount(){
        let SelectedKeys = [String(this.props.TestA.MenuIndex+1)];
        this.setState({SelectedKeys});
        setTimeout(()=>{
            // this.setState({classList:'container'})
        },1000)
    }
    //这里可以接收到路由的变化 全局路由拦截可以在这里写
    componentWillUpdate(nextProps){
        this.props.TestA.changePath(nextProps.location.pathname)
    }
    componentWillReceiveProps(nextProps, nextContext) {
        if(this.state.classList==='container upBig'){
            this.setState({classList:'container getBig'})
        }else{
            this.setState({classList:'container upBig'})
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
                    <a>个人中心</a>
                </Menu.Item>
                <Menu.Item key='/login'>
                    <a>退出登录</a>
                </Menu.Item>
            </Menu>
        );
        return(
            <Layout>
                <Header className="header">
                    <div className='logo' style={{height:'64px',width:'200px',float:'left'}}>
                        DMS <Link to='/'>Admin</Link>
                    </div>
                    <div className='switch' style={{float:'left',width:'50px',textAlign:'center'}}>
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
                        defaultSelectedKeys={[String(this.props.TestA.MenuIndex+1)]}
                        selectedKeys={[String(this.props.TestA.MenuIndex+1)]}
                        style={{ lineHeight: '64px' }}
                        onClick={(path)=>{this.props.TestA.changeIndex(path.key-1)}}
                    >
                        <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu>
                    <Dropdown overlay={menu}>
                        <a className="ant-dropdown-link admin">
                            <Avatar size='large' style={{ backgroundColor: 'transparent' }} icon='chrome' />
                            <span style={{position:'relative',top:'2px'}}>Admin</span>
                        </a>
                    </Dropdown>
                </Header>
                <Layout>
                    <MenuList history={this.props.history} location={this.props.location} match={this.props.match}/>
                    <Content style={{ margin: '0 16px' }}>
                        <TabBar history={this.props.history} location={this.props.location} match={this.props.match}/>
                        <div className={this.state.classList}>{this.props.children}</div>
                        <Footer/>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}
export default Container
