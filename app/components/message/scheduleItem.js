import React from 'react';
import ReactDom from 'react-dom';
import { Icon,Button,List } from 'antd-mobile';
import Native from './../../plusHandle'
import './style'
import Hammer from 'react-hammerjs'



const Item=List.Item

class scheduleItem extends React.Component {
    constructor(props) {
        super(props);
    }
    handleClick(id){
        Native.openWindow(`index.html#/velcroViewer?address=/ServiceAction/com.velcro.workflow.workflow.servlet.WfViewAction?workflowid=${id}`,'','','slide-in-right')
    }
    render(){
        return <Hammer onTap={()=>this.handleClick(this.props.data.workflowid)}>
            <div>
                <Item className="vm-item ">
                    <div className="baseFlexContainer">
                        <div className="vm-item-img-circle">
                            <img src="icons/workflowIcon.png" />
                        </div>
                        <div className="flex1">
                            <div className="baseFlexContainer">
                                <div className="vm-item-title-flex">{this.props.data.workflowname}</div>
                                <div className="vm-item-title-right">{this.props.data.createdate}</div>
                            </div>
                            <div className="vm-item-content">流程编号：{this.props.data.workflowno}</div>
                            <div className="vm-item-info-bottom">
                                {this.props.data.workflowname}
                            </div>
                        </div>
                    </div>
                </Item>
            </div>
        </Hammer>
    }
}

export default scheduleItem;