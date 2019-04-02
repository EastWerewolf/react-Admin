import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import '../../Scss/NoFount.scss'
class ServerError extends Component{
    render(){
        return(
            <div className='NotFount'>
                <div className='center'>
                    <h1>404 Error</h1>
                    <p>Sorry, that page doesn't exist. <Link to='/'>Go to Home Page.</Link></p>
                </div>
            </div>
        )
    }
}
export default ServerError
