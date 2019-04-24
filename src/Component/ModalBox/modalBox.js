import React,{Component} from 'react'
import { Modal } from 'antd';
import './modelBox.scss'

/**
 * prop{
 *     title:string
 *     onOK:function
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
    render() {
        const { visible, confirmLoading} = this.state;
        return (
            <Modal
                title={this.props.title||'title'}
                visible={visible}
                onOk={this.props.handleOk}
                confirmLoading={confirmLoading}
                onCancel={()=>this.showModal(false)}
            >
                {this.props.children}
            </Modal>
        );
    }
}
export default ModalBox
export {ModalBox}
