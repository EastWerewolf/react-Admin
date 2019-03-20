import {Card, Col, Icon, Tooltip} from "antd";
import React from "react";
import './card.scss'

function SaleCard(props){
    return(<Col xl={6} lg={12} md={12} sm={24} xs={24} style={{padding:'0 12px',marginBottom:'24px'}}>
        <Card bordered={false} className='diyCard'>
            <div>
                <div>
                    <span>{props.title}</span>
                    <Tooltip title={props.tip} trigger='hover' >
                        <Icon type="info-circle"  style={{float:'right'}}  />
                    </Tooltip>
                </div>
                <div>{props.children}</div>
                <div className='xq-bottom-line'>{props.data}</div>
            </div>
        </Card>
    </Col>)
}
export default SaleCard
