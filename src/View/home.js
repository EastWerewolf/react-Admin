import React,{Component} from 'react'
import {message as Msg,Button } from 'antd'
import {inject,observer} from 'mobx-react'
import configs from '../Config/configs'

@inject('TestA')
@observer
class Home extends Component{
    componentDidMount(){
        Msg.success('message调用,十分实用的组件');
        console.log(configs,'通过这里可以确定当前的环境')
    }
    componentWillMount(){

    }
    test(){
        let num = Math.round(Math.random()*1000);
        this.props.TestA.changeTest('测试'+num)
    };
    //静态方法指的是没有组件实例也可直接调用
    //但是静态方法不能读取this
    static Success(e){
        e.stopPropagation()
        Msg.success('This is a message of success');
    };
    render(){
        return(
            <div onClick={()=>{this.test()}}>
                <Button type='primary' onClick={(e)=>Home.Success(e)}>Success</Button>
            </div>
        )
    }
}
export default Home
