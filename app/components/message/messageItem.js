import React from 'react';
import ReactDom from 'react-dom';
import { Icon,Button,List } from 'antd-mobile';
import Native from './../../plusHandle'
import './style'
import Hammer from 'react-hammerjs'
import $ from 'jquery'


const Item=List.Item

class MessageItem extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        let that=this;
        console.log(this.contentRef);
        $(this.contentRef).find("a").each(function(){
            let href=$(this).attr("href");
            if(href.indexOf("http")<0){
                href=window.ipAddress+href
            }
            $(this).removeAttr("href");
            $(this).removeAttr("target");
            $(this).on("tap",function(){
                that.handleClick(href)
            })
        })
    }
    handleClick(href){
        console.log(href)
        Native.openWindow(`index.html#/velcroViewer?address=${href}`,'','','slide-in-right')
    }
    render(){
        return <Hammer>
            <div>
                <Item className="vm-item ">
                    <div className="baseFlexContainer">
                        <div className="vm-item-img-circle">
                            <img src="icons/workflowIcon.png" />
                        </div>
                        <div className="flex1" ref={el => this.contentRef = el}>
                            <div className="baseFlexContainer">
                                <div className="vm-item-title-flex" dangerouslySetInnerHTML={{__html:this.props.data.messageCaption}}></div>
                                <div className="vm-item-title-right">{this.props.data.sendtime}</div>
                            </div>
                            <div className="vm-item-message-preview" dangerouslySetInnerHTML={{__html:this.props.data.messagecontent}}></div>
                        </div>
                    </div>
                </Item>
            </div>
        </Hammer>
    }
}

export default MessageItem;