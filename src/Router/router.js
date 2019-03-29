import React,{Component} from 'react'
import { Switch, BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

import loader from '../Config/asyncLoader'
import App from '../App'
import Container from '../Component/Container/container'


const LoginForm = loader(()=>import('../View/login'))
const NotFount = loader(()=>import('../View/notFount'))
const Doc = loader(()=>import('../View/doc'))
const Home = loader(()=> import('../View/home'))
const Table = loader(()=>import('../View/table'))
const DashBoard = loader(()=>import('../View/Dashboard/Analysis'))

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
