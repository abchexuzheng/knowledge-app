import React from 'react';
import ReactDom from 'react-dom';
import { HashRouter as Router, Route, Link, Switch, HashHistory,IndexRoute  } from 'react-router-dom';
import { NavBar,Button,TabBar } from 'antd-mobile';
import Native from './../../plusHandle'
import Hammer from 'react-hammerjs'
import ReactPullToRefresh from 'react-pull-to-refresh'
import $ from 'jquery'
import mui from './../../plusHandle/mui'

let pageIndex=1;
const PAGE_SIZE=10;

class MuiRefreshListView extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            dataSource:[],
            loaded:false
        };
        console.log(props.id)
        //this.getData(true)
    }
    componentDidMount(){
        let that=this;
        mui(`#${that.props.id}`).pullRefresh({
            down : {
                height:50,//可选,默认50.触发下拉刷新拖动距离,
                auto: true,//可选,默认false.首次加载自动下拉刷新一次
                contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
            },
            up : {
                height:50,//可选.默认50.触发上拉加载拖动距离
                auto:false,//可选,默认false.自动上拉加载一次
                contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                callback :function(){
                    pageIndex++;
                    that.getData();//实现更新页面的操作
                } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        })
    }
    handleRefresh(resolve, reject) {
        this.getData(true,resolve,reject)
    }
    getData(refresh=false,resolve,reject){
        let that=this;
        if(refresh){
            pageIndex=1;
        }
        if(this.props.getSource){
            $.ajax({
                url:window.ipAddress+this.props.getSource(pageIndex,PAGE_SIZE),
                type:'get',
                dataType:'json',
                success:function(data){
                    if(refresh){
                        that.rData=that.props.getData(data);
                    }else{
                        that.rData=[...that.rData,...that.props.getData(data)];
                    }
                    let header=that.props.getHeader?that.props.getHeader(data):'';
                    that.setState({
                        dataSource: that.rData,
                        header:header,
                        loaded:true
                    });
                    if(refresh){
                        mui(`#${that.props.id}`).pullRefresh().endPulldownToRefresh(); //refresh completed
                        mui(`#${that.props.id}`).pullRefresh().refresh(true);  //重置上拉加载
                    }
                    if(data.page.totalPageCount==data.page.currentPageNo&&data.page.currentPageNo==1){
                        mui(`#${that.props.id}`).pullRefresh().disablePullupToRefresh();  //禁用上拉加载
                    }else if(data.page.totalPageCount==data.page.currentPageNo){
                        mui(`#${that.props.id}`).pullRefresh().endPullupToRefresh(true); //refresh completed
                    }else{
                        mui(`#${that.props.id}`).pullRefresh().endPullupToRefresh(); //refresh completed
                    }
                },
                error:function(err){
                    reject();
                    console.error(err.text)
                }
            })
        }
    }
    render(){
        let that=this;
        return <div
            id={this.props.id}
            className="mui-scroll-wrapper"
            style={{left:`${100*this.props.index}%`}}
        >
            <div className="mui-scroll">
                {
                    this.state.loaded?this.state.header:null
                }
                {
                    this.state.loaded==true&&this.state.dataSource.length>0?this.state.dataSource.map(item=>{
                        return that.props.row(item)
                    }):null
                }
                {
                    this.state.loaded==true&&this.state.dataSource.length===0?<div className="vm-list-error-info">没有相关数据</div>:null
                }
                <div class="mui-pull-bottom-pocket">
                    <div class="mui-pull">
                        <div class="mui-pull-loading mui-icon mui-spinner">

                        </div>
                        <div class="mui-pull-caption">上拉显示更多</div>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default MuiRefreshListView;