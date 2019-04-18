import React,{Component} from 'react'
import './popBar.scss'

class PopBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            className:'xq-popBar',
            isFirst:true
        }
    }
    componentWillReceiveProps(nextProps, nextContext) {
        let className = '';
        if(!this.state.isFirst){
            if(nextProps.show){
                className = 'xq-popBar xq-popBar-show'
            }else{
                className = 'xq-popBar xq-popBar-hide'
            }
            this.setState({className})
        }else{
            this.setState({isFirst:false})
        }

    }
    render(){
        const {className} = this.state;
        return(
            <div className={className}>
                {this.props.children}
            </div>
        )
    }
}
export default PopBar
export {PopBar}
