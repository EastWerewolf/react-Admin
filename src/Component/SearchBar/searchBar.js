import React,{Component} from 'react'
import {DatePicker,Input,Select,Button,Table} from 'antd'
import {observer,inject} from 'mobx-react'
import {PageTurn} from '../Pagination/pagination'
import './searchBar.scss'


const { RangePicker} = DatePicker;
const Option = Select.Option;
@inject('ModuleA')
@observer
class SearchBar extends Component{
    constructor(props){
        super(props)
        this.state = {
            params:{},
        };
    }
    componentDidMount() {
        const params = {};
        this.props.options.forEach(i=>{
            params[i.name] =null
        });
        this.setState({params});

    }
    onChange(value,state){
        const params = this.state.params;
        params[state] = value;
        this.setState({params})
    }
    submit(){
        const params = this.state.params;
        for(let key in params){
            if(params.hasOwnProperty(key)){
                if(typeof params[key]==='object'&&params[key]!==null&&params[key].length!==undefined){
                    params[key] = params[key].map(i=>{
                        return i._d.formatDate("yyyy-MM-dd")
                    })
                }else if(typeof params[key]==='object'&&params[key]!==null&&params[key]._d){
                    params[key] = params[key]._d.formatDate("yyyy-MM-dd")
                }
            }
        }
        this.props.getParams(params)
    }
    render(){
        return(
            <div className='xq-searchBar'>
                <div>
                    {this.props.options.map((item,index)=>{
                        if(item.type==='dateRanger'){
                            return (<RangePicker
                                key={index}
                                className='xq-margin'
                                placeholder={['开始日期','结束日期']}
                                onChange={(Moment)=>{this.onChange(Moment,item.name)}}
                                value={this.state.params[item.name]}
                            />)
                        }else if(item.type==='date'){
                            return (<DatePicker
                                key={index}
                                className='xq-margin'
                                placeholder={item.placeholder||'请选择日期'}
                                onChange={(Moment)=>{this.onChange(Moment,item.name)}}
                                value={this.state.params[item.name]}
                            />)
                        }else if(item.type==='input'){
                            return (<Input
                                key={index}
                                allowClear={true}
                                className='xq-input xq-margin'
                                placeholder={item.placeholder}
                                value={this.state.params[item.name]}
                                onChange={(e)=>{this.onChange(e.target.value,item.name)}}
                            />)
                        }else if(item.type==='select'){
                            return(<Select
                                key={index}
                                allowClear={true}
                                className='xq-select xq-margin'
                                value={this.state.params[item.name]}
                                onChange={(e)=>{this.onChange(e,item.name)}}
                                placeholder={item.placeholder||'请选择'}>
                                {item.options.map((i,d)=>{
                                    return(<Option value={i.id} key={d}>{i.name}</Option>)
                                })}
                            </Select>)
                        }
                    })}
                </div>
                <div>
                    <Button type='primary' htmlType='submit' onClick={()=>this.submit()}>搜索</Button>
                </div>
            </div>
        )
    }
}
export default SearchBar
export {SearchBar,Table,PageTurn}
