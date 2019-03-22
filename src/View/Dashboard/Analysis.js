import React,{Component} from'react';
import { Card, Col, Row,Calendar,Carousel,Tooltip,Icon,Button} from 'antd';
import {Map,Marker} from 'react-amap'
import {Crosshair,
    MarkSeriesCanvas,
    Hint,
    AreaSeries,
    FlexibleWidthXYPlot,
    MarkSeries,
    VerticalBarSeries,
    VerticalGridLines,
    HorizontalGridLines,
    XAxis,
    YAxis,
    Sunburst,
    LineSeries,
    Voronoi
} from 'react-vis'

import moment from 'moment'
import SaleCard from '../../Component/Card/card'
import {axios} from '../../Config/componentPlus'
import './Analysis.scss'



const lines = [
    [{x: 1, y: 3}, {x: 2, y: 5}, {x: 3, y: 15}, {x: 4, y: 12}],
    [{x: 1, y: 10}, {x: 2, y: 4}, {x: 3, y: 2}, {x: 4, y: 15}],
    [{x: 1, y: 7}, {x: 2, y: 11}, {x: 3, y: 9}, {x: 4, y: 2}]
].map((p, i) => p.map(d => ({...d, line: i})));
const nodes = lines.reduce((acc, d) => [...acc, ...d], []);

const getDomain = (data, key) => {
    const {min, max} = data.reduce(
        (acc, row) => ({
            min: Math.min(acc.min, row[key]),
            max: Math.max(acc.max, row[key])
        }),
        {min: Infinity, max: -Infinity}
    );
    return [min, max];
};
const xDomain = getDomain(nodes, 'x');
const yDomain = getDomain(nodes, 'y');
function randomLeaf() {
    return {
        size: Math.random() * 1000,
        color: Math.random()
    };
}
function updateData() {
    const totalLeaves = Math.random() * 20;
    const leaves = [];
    for (let i = 0; i < totalLeaves; i++) {
        const leaf = randomLeaf();
        if (Math.random() > 0.8) {
            leaf.children = [...new Array(3)].map(() => randomLeaf());
        }
        leaves.push(leaf);
    }
    return {
        title: '',
        color: 1,
        children: leaves
    };
}
function getRandomData() {
    return new Array(30).fill(0).map(row => ({
        x:Math.ceil(Math.random() * 10) ,
        y:Math.ceil(Math.random() * 20) ,
        size:Math.ceil(Math.random() * 10) ,
        color:Math.ceil(Math.random() * 10) ,
        opacity:(Math.random() * 0.5 + 0.5).toFixed(2)
    }));
}
const randomData = getRandomData();
let timer=null;
@axios('get','post')
class DashBoard extends Component{
    constructor(){
        super();
        this.state = {
            value: moment('2017-01-25'),
            selectedValue: moment('2017-01-25'),
            data: updateData(),
            position: {longitude: 121.46, latitude: 31.28 },
            clickable: true,
            draggable: true,
            visible: true,
            hoveredNode: null,
            showVoronoi: true,
            crosshairValues: [],
            DIVERGING_COLOR_SCALE:[],
            channel:[],
            saleLine:[],//1
            point:randomData,//2
            payList:[],//3
            sale:0,
            visit:0,
            pay:0,
            count:0,
        }
    }
    componentWillMount() {
        //获取销售数据 支付笔数
        this.post('/sale').then(res=>{
            console.log(res)
            this.setState({saleLine:res.sale});
            this.setState({payList:res.payList});
        })
        //获取渠道数据
        this.post('/channel').then(res=>{
            console.log(res)
            this.setState({channel:res.channel});
            this.setState({DIVERGING_COLOR_SCALE:res.DIVERGING_COLOR_SCALE})
        })
    }
    componentDidMount() {
        //map Marker position
        function randomPosition(){
            return {
                longitude:121.46 - Math.random()*5,
                latitude: 31.28 - Math.random()*5
            }
        }
        //sale data
        function randomLine(){
            const length =Math.ceil( Math.random()*15+8),arr = [];
            for(let i = 0;i < length;i++){
                arr.push({x:i,y:Math.floor(Math.random()*15+2)})
            }
            return arr
        }
        //upForward
        function upForward(arr){
            const randomNum = Math.floor(Math.random()*15) +1;
            for(let i = 0;i <arr.length;i++){
                if(i===arr.length - 1){
                    arr[i].y = randomNum
                }else{
                    arr[i].y = arr[i+1].y
                }
            }
            return arr
        }
        //做动画场景
        timer = setInterval(()=>{
            this.setState({
                position:randomPosition(),//地图
                data: updateData(),//销售渠道
                saleLine:upForward(this.state.saleLine),//1
                point:getRandomData(),//2
                payList:randomLine()//3
            });
        },2000);
    }
    componentWillUnmount() {
        //页面销毁 删除定时器
        clearInterval(timer);
    }

    render(){
        const {channel,hoveredNode, showVoronoi,data,DIVERGING_COLOR_SCALE,saleLine,payList,point} = this.state;
        const markSeriesProps = {
            className: 'mark-series-example',
            sizeRange: [1, 15],
            seriesId: 'my-example-scatterplot',
            colorRange: ['#59E4EC', '#0D676C'],
            opacityType: 'literal',
            data:point,
            animation:{damping: 100, stiffness: 300}
        };
        return(
            <div className='dashboard'>
                <Row gutter={16}>
                    <SaleCard title="总销售额" tip="指标说明" data={'日销售量  '+this.state.sale}>
                        <div>
                            <h4 className='xq-h4'>¥126,560</h4>
                            <FlexibleWidthXYPlot height={300} color="red">
                                <XAxis style={{
                                    line: {stroke: '#ADDDE1'},
                                    ticks: {stroke: '#ADDDE1'},
                                    text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600}
                                }}/>
                                <YAxis style={{
                                    line: {stroke: '#ADDDE1'},
                                    ticks: {stroke: '#ADDDE1'},
                                    text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600}
                                }}/>
                                <AreaSeries
                                    animation={{damping: 100, stiffness: 300}}
                                    curve="curveNatural"
                                    opacity={0.8}
                                    data={saleLine}
                                />
                            </FlexibleWidthXYPlot>
                        </div>
                    </SaleCard>
                    <SaleCard title="访问量" tip="指标说明" data={'日访问量  '+this.state.visit}>
                        <h4 className='xq-h4'>8,848</h4>
                        <FlexibleWidthXYPlot
                            height={300}
                        >
                            <VerticalGridLines />
                            <HorizontalGridLines />
                            <XAxis style={{
                                line: {stroke: '#ADDDE1'},
                                ticks: {stroke: '#ADDDE1'},
                                text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600}
                            }}/>
                            <YAxis style={{
                                line: {stroke: '#ADDDE1'},
                                ticks: {stroke: '#ADDDE1'},
                                text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600}
                            }}/>
                            <MarkSeries {...markSeriesProps} />

                        </FlexibleWidthXYPlot>
                    </SaleCard>
                    <SaleCard title="支付笔数" tip="指标说明" data={'转化率  '+this.state.pay*100+ '%'}>
                        <h4 className='xq-h4'>6,560</h4>
                        <FlexibleWidthXYPlot height={300}>
                            <VerticalGridLines />
                            <HorizontalGridLines />
                            <XAxis style={{
                                line: {stroke: '#ADDDE1'},
                                ticks: {stroke: '#ADDDE1'},
                                text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600}
                            }}/>
                            <YAxis style={{
                                line: {stroke: '#ADDDE1'},
                                ticks: {stroke: '#ADDDE1'},
                                text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600}
                            }}/>
                            <VerticalBarSeries data={payList}  animation={{damping: 100, stiffness: 300}} />
                        </FlexibleWidthXYPlot>
                    </SaleCard>
                    <SaleCard title="运营活动效果" tip="指标说明" data={'用户月活跃量'+this.state.count}>
                        <h4 className='xq-h4'>78%</h4>
                        <FlexibleWidthXYPlot
                            xDomain={xDomain}
                            yDomain={yDomain}
                            margin={{top: 10, left: 40, bottom: 40, right: 10}}
                            height={300}
                        >
                            <XAxis style={{
                                line: {stroke: '#ADDDE1'},
                                ticks: {stroke: '#ADDDE1'},
                                text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600}
                            }}/>
                            <YAxis style={{
                                line: {stroke: '#ADDDE1'},
                                ticks: {stroke: '#ADDDE1'},
                                text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600}
                            }}/>
                            {lines.map((d, i) => (
                                <LineSeries
                                    key={i}
                                    opacity={hoveredNode && hoveredNode.line === i ? 1 : 0.5}
                                    data={d}
                                />
                            ))}
                            {hoveredNode && <MarkSeries data={[hoveredNode]} color="#cd3b54"/>}
                            <Voronoi
                                nodes={lines.reduce((acc, d) => [...acc, ...d], [])}
                                onHover={node => this.setState({hoveredNode: node})}
                                onBlur={() => this.setState({hoveredNode: null})}
                                polygonStyle={{stroke: showVoronoi ? 'rgba(0, 0, 0, .2)' : null}}
                            />
                        </FlexibleWidthXYPlot>
                    </SaleCard>
                </Row>
                <Row gutter={16}>
                    <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                        <Card title='销售渠道' bordered={false}>
                            <Row gutter={16}>
                                <Col xl={12} lg={15} md={18} sm={24} xs={24}>
                                    <Sunburst
                                        animation={{damping: 100, stiffness: 300}}
                                        data={data}
                                        onValueClick={() => this.setState({data: updateData()})}
                                        colorType={'category'}
                                        colorRange={DIVERGING_COLOR_SCALE}
                                        style={{stroke: '#fff'}}
                                        onValueMouseOver={() => this.setState({hovering: true})}
                                        onValueMouseOut={() => this.setState({hovering: false})}
                                        height={300}
                                        width={300}
                                    />
                                </Col>
                                <Col xl={12} lg={9} md={24} sm={6} xs={24}>
                                    {channel.map(i=>{
                                        return(
                                            <p key={i.color} style={{width:'100%'}}>
                                                <i className='xq-circle'  style={{backgroundColor:i.color,margin:'0 20px'}}/>
                                                {i.name}
                                                <span style={{float:'right'}}>{i.rate+'%'}</span>
                                            </p>
                                        )
                                    })}
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                        <Card title='地图' bordered={false}>
                            <div style={{width:'100%',height:'300px'}}>
                                <Map amapkey={'788e08def03f95c670944fe2c78fa76f'} center={this.state.position} zoom={6}>
                                    <Marker
                                        position={this.state.position}
                                        visible={this.state.visible}
                                        clickable={this.state.clickable}
                                        draggable={this.state.draggable}
                                    />
                                </Map>
                            </div>
                        </Card>
                    </Col>
                </Row>
                <Row>

                </Row>
            </div>
        )
    }
}
export default DashBoard
