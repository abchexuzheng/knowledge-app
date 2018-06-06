import React from 'react';
import ReactDom from 'react-dom';
import { Icon,Button,List } from 'antd-mobile';
import Native from './../../plusHandle'
import './style'
import Hammer from 'react-hammerjs'

const Item=List.Item

class CommentList extends React.Component {
    constructor(props) {
        super(props);
    }
    handleClick(id){
        Native.openWindow(`index.html#/article/${id}`,'','','slide-in-right')
    }
    render(){
        return <Hammer>
            <div>
                <Item className="vm-item ">
                    <div className="baseFlexContainer">
                        <div className="vm-author-head">
                            <img src={window.ipAddress+this.props.data.creator.imgSrc} />
                        </div>
                        <div className="vm-author-name flex1">{this.props.data.creator.objname}</div>
                    </div>
                    <div className="vm-article-content vm-comment-content">
                        {this.props.data.content}
                    </div>
                </Item>
            </div>
        </Hammer>
    }
}

export default CommentList;