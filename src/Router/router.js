import React,{Component} from 'react'
import { Switch, BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

import loader from '../Config/asyncLoader'
import App from '../App'
import Container from '../Component/Container/container'
import routerName from '../Component/Tab/tabData'

const LoginForm = loader(()=>import('../Pages/login/login'));
const Doc = loader(()=>import('../Pages/doc'));
const Home = loader(()=> import('../Pages/home'));
const Table = loader(()=>import('../Pages/table'));
const DashBoard = loader(()=>import('../Pages/dashBoard/analysis'));
const NotFount = loader(()=>import('../Pages/errorPage/NotFound'));
const Forbidden = loader(()=>import('../Pages/errorPage/Forbidden'));
const ServerError = loader(()=>import('../Pages/errorPage/ServerError'));

class RouterLink extends Component{
    render(){
        return(
            <Router>
                <App>
                    <Switch>
                        <Route path='/login' render={()=>{
                            document.title ='DMS Admin';
                            return <LoginForm/>
                        }}/>
                        <Route path='/404' render={()=>{
                            document.title ='ops,页面不见了';
                            return <NotFount/>
                        }}/>
                        <Route path='/' render={(history,location,match)=>{
                            document.title = routerName[history.location.pathname]?routerName[history.location.pathname]+'-DMS Admin':'DMS Admin';
                            return(
                                <Container {...history} {...location} {...match}>
                                    <Switch>
                                        <Route exact path='/' component={DashBoard}/>
                                        <Route path='/home' component={Home}/>
                                        <Route path='/doc' component={Doc}/>
                                        <Route path='/table' component={Table}/>
                                        <Route path='/403' component={Forbidden}/>
                                        <Route path='/500' component={ServerError}/>
                                        <Redirect to='/404'/>
                                    </Switch>
                                </Container>)
                        }}/>
                    </Switch>
                </App>
            </Router>
        )
    }
}
export default  RouterLink
