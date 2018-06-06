import React from 'react';
import ReactDOM from 'react-dom';
import { NavBar, Icon,Button,TabBar,Carousel,PullToRefresh,ListView,SearchBar,Tabs,Badge } from 'antd-mobile';
import NewsCarousel from './newsCarousel'
import NewsItem from './newsItem'
import RefreshListView from './../public/refreshListView'
import VmSearchBar from './../public/vmSearchBar'
import Hammer from 'react-hammerjs'
import $ from 'jquery'
//import VmRefreshListViewer from './../public/vmRefreshListViewer'
//import MuiRefreshListView from './../public/muiRefreshListView'
import MuiRefreshListView from 'react-mobile-pull-to-refresh'
import Native from './../../plusHandle'



class News extends React.Component {
    constructor(props){
        super(props);
        this.state={
            page:0,
            searchStr:"",
            searchFocused:false
        }
        this.getTabs();
    }
    componentDidMount(){
        Native.cancelBackBtn()
    }
    changeTab(page){
        this.setState({
            page:page
        })
    }
    getTabs(){
        let that=this;
        $.ajax({
            url: `${window.ipAddress}/ServiceAction/com.velcro.km.commons.common.BaseDataAction?action=getSelectOption&typeId=40288b8162f06a840162f089d466000c`,
            type: 'get',
            dataType: 'json',
            success: function (data) {
                that.setState({
                    tabList:data.options
                });
            },
            error: function (err) {
                console.log(err)
            }
        })
    }
    changeValue(value){
        this.setState({
            searchStr:value
        })
    }
    handleKeyDown(e) {
        let that = this;
        if (e.keyCode === 13) {
            this.handleSearch();
        }
    }
    handleSearch(){
        if(this.state.searchStr){
            this.changeValue("")
            Native.openWindow(`index.html#/newsSearch/${this.state.searchStr}`,"","","slide-in-right")
            $("input").blur()
        }
    }
    render() {
        return <div className="flexContainer">
            <div className="vm-search-bar-Container baseFlexContainer">
                <div className="flex1">
                    <VmSearchBar
                        value={this.state.searchStr}
                        onChange={e=>this.changeValue(e.target.value)}
                        onKeyDown={e=>this.handleKeyDown(e)}
                        placeholder="搜索"
                        onFocus={()=>this.setState({searchFocused:true})}
                        onBlur={()=>this.setState({searchFocused:false})}
                    />
                </div>
                {
                    this.state.searchFocused?<div className="vm-search-right-icon-div">
                        <img
                            src="./icons/searchIcon.png"
                            className="vm-search-right-icon"
                            onTouchStart={
                                ()=>this.handleSearch()
                            }
                        />
                    </div>:<div className="vm-search-right-icon-div">
                        <img src="./icons/scan.png" className="vm-search-right-icon"/>
                    </div>
                }
            </div>
            {
                this.state.tabList?<Tabs tabs={this.state.tabList}
                                         page={this.state.page}
                                         onChange={(tab, index) => { console.log('onChange', index, tab); }}
                                         onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                                         tabBarUnderlineStyle={{borderColor:'#1d568f'}}
                                         tabBarActiveTextColor="white"
                                         useOnPan={false}
                                         swipeable={false}
                                         animated={false}
                                         className='flex1'
                                         prerenderingSiblingsNumber={false}
                                         renderTab={(data)=>{
                                             return <Hammer onTap={()=>this.changeTab(data.index)}>
                                                <div className="vm-tab-title" >{data.objname}</div>
                                             </Hammer>
                                         }}
                >
                    {
                        this.state.tabList.map((item,index)=>{
                            return <MuiRefreshListView
                                id={item.id}
                                key={item.id}
                                index={index}
                                row={
                                    (itemData)=>{
                                        return <NewsItem data={itemData} key={itemData.id}/>
                                    }
                                }
                                getSource={(pageNow,pageSize)=>{
                                    return `/ServiceAction/com.velcro.km.app.article.servlet.ArticleAction?action=getArticles&pageNo=${pageNow}&pageSize=${pageSize}&type=${item.id}`
                                }}
                                getData={(res)=>{
                                    return res.contents
                                }}
                                getHeader={(res)=>{
                                    return <NewsCarousel data={res.banners} />
                                }}
                            />
                        })
                    }
                </Tabs>:null
            }
        </div>;
    }
}

export default News;