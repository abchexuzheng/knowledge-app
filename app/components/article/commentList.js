import React from 'react';
import ReactDOM from 'react-dom';
import { NavBar, Icon,Button,TabBar,Carousel,PullToRefresh,ListView,SearchBar,Tabs,Badge,List } from 'antd-mobile';
import AuthorInfo from './authorInfo'
import Comment from './comment'
import ArticleContent from './articleContent'
import CommentItem from './commentItem'
import MuiRefreshListView from 'react-mobile-pull-to-refresh'
import BackArrow from './../public/backArrow'
import $ from 'jquery'
import './style'


const Item=List.Item

class Article extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            data:{}
        }
        //this.getData();
    }
    getData(){
        console.log(this)
        let that=this;
        $.ajax({
            url: `${window.ipAddress}/ServiceAction/com.velcro.km.reply.reply.servlet.ReplyAction?action=getReplys&objId=${this.props.match.params.id}`,
            type: 'get',
            dataType: 'json',
            success: function (data) {
                console.log(data)
                that.setState({
                    data:data
                })
            },
            error: function (err) {
                message.error(err.text)
            }
        })
    }
    render(){
        return <div className="flexContainer">
            <NavBar
                mode="light"
                icon={<BackArrow />}
                style={{marginBottom:5}}
            >评论列表</NavBar>
            <div className="flex1" style={{position:'relative'}}>
                <MuiRefreshListView
                    id={this.props.match.params.id}
                    row={
                        (itemData)=>{
                            return <CommentItem data={itemData}/>
                        }
                    }
                    getSource={(pageNow,pageSize)=>{
                        return `/ServiceAction/com.velcro.km.reply.reply.servlet.ReplyAction?action=getReplys&objId=${this.props.match.params.id}&pageSize=${pageSize}&pageNo=${pageNow}`
                    }}
                    getData={(res)=>{
                        return res.result
                    }}
                />
            </div>
        </div>
    }
}



export default Article;