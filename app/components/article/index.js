import React from 'react';
import ReactDOM from 'react-dom';
import { NavBar, Icon,Button,TabBar,Carousel,PullToRefresh,ListView,SearchBar,Tabs,Badge } from 'antd-mobile';
import AuthorInfo from './authorInfo'
import Comment from './comment'
import ArticleContent from './articleContent'
import BackArrow from './../public/backArrow'
import $ from 'jquery'
import './style'

class Article extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            data:{}
        };
        this.getData();
    }
    getData(){
        let that=this;
        $.ajax({
            url: `${window.ipAddress}/ServiceAction/com.velcro.km.journal.article.servlet.ArticleAction?action=getArticle&articleId=${this.props.match.params.id}`,
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
            >文章详情</NavBar>
            {
                this.state.data.id?<div className="vm-article-container flex1">
                    <div className="vm-article-title">
                        {this.state.data.title}
                    </div>
                    <AuthorInfo data={this.state.data.creator} date={this.state.data.createDate} />
                    <ArticleContent content={this.state.data.content} />
                </div>:null
            }
            {
                this.state.data.id?<Comment data={this.state.data} getData={()=>this.getData()} />:null
            }
        </div>
    }
}

export default Article;