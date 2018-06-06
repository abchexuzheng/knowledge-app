import React from 'react';
import ReactDOM from 'react-dom';
import { NavBar, Icon,Button,TabBar,Carousel,PullToRefresh,ListView,SearchBar,Tabs,Badge ,Modal,List, TextareaItem,InputItem,Toast} from 'antd-mobile';
import $ from 'jquery'
import Collect from './collect'
import Native from './../../plusHandle'
import Hammer from 'react-hammerjs'

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            value:"",
            focus:false
        }
    }
    handleChange(value){
        this.setState({
            value:value
        })
    }
    handleFocus(state){
        this.setState({
            focus:state
        })
    }
    handleKeyDown(e){
        let that=this;
        if(e.keyCode===13){
            this.comment()
        }
    }
    comment(){
        let that=this;
        $.ajax({
            url: `${window.ipAddress}/ServiceAction/com.velcro.km.reply.reply.servlet.ReplyAction?action=create`,
            type: 'post',
            data:{
                objId:this.props.data.id,
                content:this.state.value
            },
            dataType: 'json',
            success: function (data) {
                if(data.errorMsg===""){
                    Toast.success("评论成功");
                    $('input').blur();
                    that.props.getData();
                    that.setState({
                        value:""
                    })
                }
            },
            error: function (err) {
                message.error(err.text)
            }
        })
    }
    handleOpenWindow(){
        Native.openWindow(`index.html#/article/commentList/${this.props.data.id}`,'','','slide-in-right')
    }
    render(){
        return <div className="">
            <div className="vm-comment-row-container baseFlexContainer">
                <div
                    className="flex1"
                >
                    <div className="vm-comment-input-container">
                        <img className="vm-comment-input-img" src="icons/commentIcon.png" />
                        <InputItem
                            className="vm-comment-input needsclick"
                            ref={el => this.autoFocusInst = el}
                            placeholder="发表评论"
                            value={this.state.value}
                            onChange={(str)=>this.handleChange(str)}
                            onKeyDown={(e)=>this.handleKeyDown(e)}
                            onFocus={()=>this.handleFocus(true)}
                            onBlur={()=>this.handleFocus(false)}
                        />
                    </div>
                </div>
                {
                    this.state.focus?<a onTouchStart={()=>this.comment()}>提交</a>:<div className="vm-article-info-div">
                        <Hammer onTap={()=>this.handleOpenWindow()}>
                            <div>
                                <img src="icons/pingLun.png" />
                                <span>{this.props.data.replyNum}</span>
                            </div>
                        </Hammer>
                        <Collect
                            data={this.props.data.collectionNum}
                            id={this.props.data.id}
                            getData={()=>this.props.getData()}
                            collectState={this.props.data.collectState}
                        />
                    </div>
                }
            </div>
        </div>
    }
}

export default Comment;