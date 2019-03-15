import React,{Component} from 'react'
import {Form, Icon, Input, Button, Checkbox} from 'antd';
import {cookie} from '../Config/utils'
import '../Scss/login.scss'
import {message as Msg} from "antd/lib/index";
const FormItem = Form.Item;


class Login extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (values.userName === 'admin' && values.password === '123456') {
                    sessionStorage.setItem('login', 'Admin');
                    values.remember && cookie.set('userName', values.userName, 2).set('password', values.password, 2);
                    this.props.history.push('/')
                } else {
                    Msg.error('用户名或密码错误')
                }
            } else {
                Msg.error('请输入用户名或密码')
            }
        });
    };
    //选择记住密码后自动填充
    componentDidMount(){
        const userName = cookie.get('userName'),password = cookie.get('password');
        const {setFieldsValue} = this.props.form;
        if(userName&&password){
            setFieldsValue({
                userName:userName,
                password:password
            })
        }
    }
    //忘记密码后删除cookie
    deleteCookie(){
        const {setFieldsValue} = this.props.form;
        setFieldsValue({userName:null, password:null});
        cookie.del('userName').del('password');
    }
    //注册 静态方法
    static register(){
        Msg.error('抱歉,现在还不能注册')
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <div className='login'>
                <div className='formBox'>
                    <div className='header'>
                        海鲜咸鱼管理系统
                    </div>
                    <div className='content'>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <FormItem>
                                {getFieldDecorator('userName', {
                                    rules: [{ required: true, message: '请输入用户名' }],
                                })(
                                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: '请输入密码' }],
                                })(
                                    <Input prefix={<Icon type="lock"  style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" autoComplete='on' placeholder="密码" />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('remember', {valuePropName: 'checked', initialValue: true,})(<Checkbox>记住密码</Checkbox>)}
                            </FormItem>
                            <p>
                                <a className="login-form-forgot"  onClick={()=>{this.deleteCookie()}}>忘记密码</a>
                                <span> 或者 </span>
                                <a  onClick={Login.register}>现在注册</a>
                            </p>
                            <Button type="primary" htmlType="submit" className="login-form-button loginBtn">登录</Button>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}
const LoginForm = Form.create()(Login)
export default LoginForm
