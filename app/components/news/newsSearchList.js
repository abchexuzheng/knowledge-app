import React from 'react';
import ReactDOM from 'react-dom';
import { NavBar, Icon,Button,TabBar,Carousel,PullToRefresh,ListView,SearchBar,Tabs,Badge } from 'antd-mobile';
import NewsCarousel from './newsCarousel'
import NewsItem from './newsItem'
import RefreshListView from './../public/refreshListView'
import VmSearchBar from './../public/vmSearchBar'
import Hammer from 'react-hammerjs'
import $ from 'jquery'
import VmRefreshListViewer from './../public/vmRefreshListViewer'
import MuiRefreshListView from './../public/muiRefreshListView'
import BackArrow from './../public/backArrow'



class NewsSearchList extends React.Component {
    constructor(props){
        super(props);
        this.state={
            searchStr:this.props.match.params.searchStr
        }
    }
    handleKeyDown(e) {
        let that = this;
        if (e.keyCode === 13&&this.state.searchStr) {
            console.log(this.props)
            this.props.history.replace(`/newsSearch/${this.state.searchStr}`)
        }
    }
    handleChangeValue(value){
        this.setState({
            searchStr:value
        })
    }
    render() {
        return <div className="flexContainer" key={this.props.match.params.searchStr}>
            <div className="vm-search-bar-Container baseFlexContainer">
                <BackArrow />
                <div className="flex1">
                    <VmSearchBar
                        placeholder="搜索"
                        value={this.state.searchStr}
                        onChange={e=>this.handleChangeValue(e.target.value)}
                        onKeyDown={(e)=>this.handleKeyDown(e)}
                    />
                </div>
                <div className="vm-search-right-icon-div">
                    <img src="./icons/scan.png" className="vm-search-right-icon"/>
                </div>
            </div>
            <div className="flex1" style={{position:'relative'}}>
                <MuiRefreshListView
                    id="newsSearchList"
                    row={
                     (itemData)=>{
                         return <NewsItem data={itemData} key={itemData.id}/>
                     }
                }
                    getSource={(pageNow,pageSize)=>{
                    return `/ServiceAction/com.velcro.km.app.article.servlet.ArticleAction?action=getArticles&title=${this.state.searchStr}&pageNo=${pageNow}&pageSize=${pageSize}`
                }}
                    getData={(res)=>{
                     return res.contents
                }}
                />
            </div>
        </div>;
    }
}

export default NewsSearchList;