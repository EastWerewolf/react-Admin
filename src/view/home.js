import React,{Component} from 'react'
import {message as Msg,Button } from 'antd'
import {inject,observer} from 'mobx-react'
import configs from '../config/configs'

@inject('TestA')
@observer
class Home extends Component{
    componentDidMount(){
        Msg.success('message调用,十分实用的组件');
        console.log('home',configs,Msg)
    }
    componentWillMount(){
        console.log(1232131,this.props)
    }
    test(){
        let num = Math.round(Math.random()*1000);
        this.props.TestA.changeTest('测试'+num)
    };
    Success(e){
        e.stopPropagation()
        Msg.success('This is a message of success');
    };
    render(){
        return(
            <div onClick={()=>{this.test()}}>
                首頁{this.props.TestA.test}
                <Button type='primary' onClick={(e)=>this.Success(e)}>Success</Button>
            </div>
        )
    }
}
export default Home