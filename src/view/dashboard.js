import React,{Component} from'react';
import { Card, Col, Row,Calendar,Carousel} from 'antd';
import moment from 'moment'

class DashBoard extends Component{
    constructor(){
        super();
        this.state = {
            value: moment('2017-01-25'),
            selectedValue: moment('2017-01-25'),
        }
    }

    static onPanelChange(value, mode) {
        console.log(value, mode);
    }
    static test(data){
        console.log(data)
    }
    render(){
        return(
            <div className='dashboard'>
                <Row gutter={16}>
                    <Col span={6}>
                        <Card title="Card title" bordered={false}>Card content</Card>
                    </Col>
                    <Col span={6}>
                        <Card title="Card title" bordered={false}>Card content</Card>
                    </Col>
                    <Col span={6}>
                        <Card title="Card title" bordered={false}>Card content</Card>
                    </Col>
                    <Col span={6}>
                        <Card title="Card title" bordered={false}>Card content</Card>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Card title='Calender' bordered={false}>
                            <Calendar onPanelChange={DashBoard.onPanelChange} onSelect={DashBoard.test}/>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card title='Carousel' bordered={false}>
                            <Carousel autoplay>
                                <div><img width='100%' src="https://activity-pics.themobiyun.com/wx/lr/RL9r/imgs/R1.jpg" alt="pic"/></div>
                                <div><img width='100%' src="https://activity-pics.themobiyun.com/wx/lr/RL9r/imgs/R2.jpg" alt="pic"/></div>
                                <div><img width='100%' src="https://activity-pics.themobiyun.com/wx/lr/RL9r/imgs/R3.jpg" alt="pic"/></div>
                                <div><img width='100%' src="https://activity-pics.themobiyun.com/wx/lr/RL9r/imgs/R4.jpg" alt="pic"/></div>
                                <div><img width='100%' src="https://activity-pics.themobiyun.com/wx/lr/RL9r/imgs/R5.jpg" alt="pic"/></div>
                            </Carousel>
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