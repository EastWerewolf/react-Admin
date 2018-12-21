import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import '../scss/NoFount.scss'
class NotFount extends Component{
    render(){
        return(
            <div className='NotFount'>
                <div className='center'>
                    <h1>404 Error</h1>
                    <p>Sorry, that page doesn't exist. <Link to='/home'>Go to Home Page.</Link></p>
                </div>
            </div>
        )
    }
}
export default NotFount