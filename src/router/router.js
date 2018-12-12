import React,{Component} from 'react'
import { Switch, BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

import App from '../App'
import Container from '../view/container'
import LoginForm from '../view/login'
import NotFount from '../view/notFount'
import Doc from '../view/doc'
import Home from '../view/home'


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
                                    <Route exact path='/' component={Home}/>
                                    <Route path='/doc' component={Doc}/>
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
