import React,{Component} from 'react'
import './popBar.scss'

/**
 * props{
 *      show:Boolean,
 *      children:Element
 * }
 */
class PopBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            className:'xq-popBar'
        }
    }
    componentWillReceiveProps(nextProps, nextContext) {
        let className = '';
        if(nextProps.show){
            className = 'xq-popBar xq-popBar-show'
        }else{
            className = 'xq-popBar xq-popBar-hide'
        }
        this.setState({className});

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
