import React,{Component} from 'react'
import { Switch, BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

import loader from '../config/asyncLoader'
import App from '../App'
import Container from '../view/container'


const LoginForm = loader(()=>import('../view/login'))
const NotFount = loader(()=>import('../view/notFount'))
const Doc = loader(()=>import('../view/doc'))
const Home = loader(()=> import('../view/home'))
const Table = loader(()=>import('../view/table'))
const DashBoard = loader(()=>import('../view/dashboard'))

class RouterLink extends Component{
    render(){
        return(
            <Router>
                <App>
                    <Switch>
                        <Route path='/login' component={LoginForm}/>
                        <Route path='/404' component={NotFount}/>
                        <Route path='/' render={(history,location,match)=>(
                            <Container {...history} {...location} {...match}>
                                <Switch>
                                    <Route exact path='/' component={DashBoard}/>
                                    <Route path='/home' component={Home}/>
                                    <Route path='/doc' component={Doc}/>
                                    <Route path='/table' component={Table}/>
                                    <Redirect to='/404'/>
                                </Switch>
                            </Container>
                        )}/>
                    </Switch>
                </App>
            </Router>
        )
    }
}
export default  RouterLink
