import React,{Component} from 'react'
import {Pagination,Table} from 'antd'
import SearchBar from '../SearchBar/searchBar'
import {axios,utils} from "../../Config/componentPlus";
import {observer,inject} from 'mobx-react'
import './pagination.scss'

/**
 * props{
 *     getParams:调用父页面方法
 *     total:总个数
 * }
 */

@inject('ModuleA')
@observer
@axios('get','post')
@utils('removeEmpty')
class PageTurn extends Component{
    constructor(props){
        super(props);
        this.state = {
            pageSize:10
        };
    }
    pageChange(page,pageSize){
        this.props.getParams({page,pageSize})
    }
    showSizeChange(page,pageSize){
        this.setState({pageSize});
        this.props.getParams({page,pageSize})
    }
    render(){
        return(
            <div className='xq-pagination'>
                <Pagination
                    total={this.props.total}
                    pageSize={this.state.pageSize}
                    onChange={this.pageChange.bind(this)}
                    onShowSizeChange={this.showSizeChange.bind(this)}
                    showTotal={total => `Total ${total} items`}
                    defaultCurrent={1}
                    pageSizeOptions={['10','20','30','40']}
                    showSizeChanger
                    showQuickJumper
                />
            </div>
        )
    }
}
export default PageTurn
export {PageTurn,Table,SearchBar}
