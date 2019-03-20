const channel = [
    {
        color:'#00939C',
        name:'搜索引擎',
        'rate|20-70':20
    },{
        color:'#85C4C8',
        name:'广告系列',
        'rate|20-70':20
    },{
        color:'#EC9370',
        name:'转结流量',
        'rate|20-70':20
    },{
        color:'#C22E00',
        name:'直接交易',
        'rate|20-70':20
    },{
        color:'#337ab7',
        name:'活跃用户',
        'rate|20-70':20
    },{
        color:'#3c763d',
        name:'投放回流',
        'rate|20-70':20
    },{
        color:'#78d8ce',
        name:'广告转化',
        'rate|20-70':20
    },{
        color:'#bcd65f',
        name:'其他渠道',
        'rate|20-70':20
    }
];
const DIVERGING_COLOR_SCALE = ['#00939C', '#85C4C8', '#EC9370', '#C22E00','#337ab7','3c763d','#78d8ce','#bcd65f'];
const sale =randomLine();
const payList = randomLine();
function randomLine(){
    const length = Math.floor(Math.random()*15+8);
    const arr = [];
    for(let i = 0;i < length;i++){
        arr.push({x:i,y:Math.floor(Math.random()*15+2)})
    }
    return arr
}
export {channel,DIVERGING_COLOR_SCALE,sale,payList}
