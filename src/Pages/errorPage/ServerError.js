import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import '../../Scss/NoFount.scss'
class ServerError extends Component{
    render(){
        return(
            <div className='ServerError'>
                <div className='center'>
                    <h1><img src={require('../../Assets/img/500.png')} alt="403" width={300}/></h1>
                    <p>Sorry, that page doesn't exist. <Link to='/'>Go to Home Page.</Link></p>
                </div>
            </div>
        )
    }
}
export default ServerError
