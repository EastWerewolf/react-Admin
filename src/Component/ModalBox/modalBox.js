import React,{Component} from 'react'
import { Modal } from 'antd';
import './modelBox.scss'

/**
 * prop{
 *     title:string
 *     okText:string
 *     cancelText:string
 *     onOK:function
 *     width:number
 * }
 */
class ModalBox extends Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            confirmLoading: false,
        }
    }
    showModal (visible){
        this.setState({visible});
    };
    showLoading(confirmLoading){
        this.setState({confirmLoading});
    }
    componentDidMount() {
        const Timer = setInterval(()=>{
            const Modal = document.getElementsByClassName('ant-modal');
            if(Modal[0]){
                const width = this.props.width?this.props.width:650;
                for(let i = 0;i < Modal.length;i++){
                    Modal[i].style.width = width + 'px';
                }
                clearInterval(Timer)
            }
        },500);
    }
    componentWillReceiveProps(nextProps, nextContext) {
        const Timer = setInterval(()=>{
            const Modal = document.getElementsByClassName('ant-modal');
            if(Modal[0]){
                const width = this.props.width?this.props.width:650;
                for(let i = 0;i < Modal.length;i++){
                    Modal[i].style.width = width + 'px';
                }
                clearInterval(Timer)
            }
        },500);
    }

    render() {
        const { visible, confirmLoading} = this.state;
        return (
            <Modal
                title={this.props.title||'title'}
                visible={visible}
                onOk={this.props.handleOk}
                confirmLoading={confirmLoading}
                onCancel={()=>this.showModal(false)}
                afterClose={this.props.afterClose}
                okText={this.props.okText||'确定'}
                cancelText={this.props.cancelText||'取消'}
            >
                {this.props.children}
            </Modal>
        );
    }
}
export default ModalBox
export {ModalBox}
