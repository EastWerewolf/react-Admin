import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import '../../Scss/NoFount.scss'
class Forbidden extends Component{
    render(){
        return(
            <div className='Forbidden'>
                <div className='center'>
                    <h1><img src={require('../../Assets/img/403.png')} alt="403" width={300}/></h1>
                    <p>Sorry, You don't have permission to access. <Link to='/'>Go to Home Page.</Link></p>
                </div>
            </div>
        )
    }
}
export default Forbidden
