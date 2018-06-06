import React from 'react';
import ReactDom from 'react-dom';
import { Icon,Button,List } from 'antd-mobile';
import Native from './../../plusHandle'
import './style'
import Hammer from 'react-hammerjs'
import ImgViewer from './../public/imgViewer'

const Item=List.Item

class NewsList extends React.Component {
    constructor(props) {
        super(props);
    }
    handleClick(id){
        Native.openWindow(`index.html#/article/${id}`,'',{
            softinputMode:'adjustResize'
        },'slide-in-right')
    }
    render(){
        return <Hammer onTap={()=>this.handleClick(this.props.data.id)}>
        <div>
            <Item className="vm-item ">
                <div
                    className={this.props.data.imgs.length>=1&&this.props.data.imgs.length<3?"baseFlexContainer":""}
                >
                    {
                        this.props.data.imgs.length>=1&&this.props.data.imgs.length<3?<div className="vm-item-img-simple">
                            <ImgViewer src={window.ipAddress+this.props.data.imgs[0]}/>
                        </div>:null
                    }
                    {
                        this.props.data.imgs.length>=3?<div className="vm-item-img-three">
                            {
                                this.props.data.imgs.map(item=>{
                                    return <ImgViewer src={window.ipAddress+item}/>
                                })
                            }
                        </div>:null
                    }
                    <div className="flex1" style={{position:'relative'}}>
                        <div className="vm-item-title">{this.props.data.title}</div>
                        <div className="vm-item-info-container">
                            <div className="vm-item-info-left">
                                <img className="vm-item-info-icon" src="icons/pingLun.png" />
                                <span className="vm-item-info-number">{this.props.data.replyCount}</span>
                                <img className="vm-item-info-icon" src="icons/user-filled-gray.png" />
                                <span className="vm-item-info-number">{this.props.data.author.objname}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Item>
        </div>
        </Hammer>
    }
}

export default NewsList;