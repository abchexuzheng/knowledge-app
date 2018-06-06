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
                callback :function(){
                    that.getData(true);//实现更新页面的操作
                } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
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
    render(){
        let that=this;
        return <div id="slider" class="mui-slider" data-slider="4">
            <div id="sliderSegmentedControl" class="mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <a class="mui-control-item mui-active" href="#item1mobile">
                    待办公文
                </a>
                <a class="mui-control-item" href="#item2mobile">
                    已办公文
                </a>
                <a class="mui-control-item" href="#item3mobile">
                    全部公文
                </a>
            </div>
            <div id="sliderProgressBar" class="mui-slider-progress-bar mui-col-xs-4" style="transform: translate3d(0px, 0px, 0px) translateZ(0px);"></div>
            <div class="mui-slider-group" style="transform: translate3d(0px, 0px, 0px) translateZ(0px); transition-duration: 0ms; transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);">
                <div id="item1mobile" class="mui-slider-item mui-control-content mui-active">
                    <div id="scroll1" class="mui-scroll-wrapper" data-scroll="1">
                        <div class="mui-scroll" style="transform: translate3d(0px, 0px, 0px) translateZ(0px); transition-duration: 0ms; transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);">
                        </div>
                        <div class="mui-scrollbar mui-scrollbar-vertical" style="transition-duration: 500ms; opacity: 0;"><div class="mui-scrollbar-indicator" style="transition-duration: 0ms; display: block; height: 52px; transform: translate3d(0px, 0px, 0px) translateZ(0px); transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);"></div></div></div>
                </div>
                <div id="item2mobile" class="mui-slider-item mui-control-content">
                    <div id="scroll2" class="mui-scroll-wrapper" data-scroll="2">
                        <div class="mui-scroll" style="transform: translate3d(0px, 0px, 0px) translateZ(0px); transition-duration: 0ms;"><ul class="mui-table-view"><li class="mui-table-view-cell">第二个选项卡子项-1</li><li class="mui-table-view-cell">第二个选项卡子项-2</li><li class="mui-table-view-cell">第二个选项卡子项-3</li><li class="mui-table-view-cell">第二个选项卡子项-4</li><li class="mui-table-view-cell">第二个选项卡子项-5</li></ul></div>
                        <div class="mui-scrollbar mui-scrollbar-vertical"><div class="mui-scrollbar-indicator" style="transition-duration: 0ms; display: block; height: 207px; transform: translate3d(0px, 0px, 0px) translateZ(0px);"></div></div></div>

                </div>
                <div id="item3mobile" class="mui-slider-item mui-control-content">
                    <div id="scroll3" class="mui-scroll-wrapper" data-scroll="3">
                        <div class="mui-scroll" style="transform: translate3d(0px, 0px, 0px) translateZ(0px); transition-duration: 0ms;"><ul class="mui-table-view"><li class="mui-table-view-cell">第三个选项卡子项-1</li><li class="mui-table-view-cell">第三个选项卡子项-2</li><li class="mui-table-view-cell">第三个选项卡子项-3</li><li class="mui-table-view-cell">第三个选项卡子项-4</li><li class="mui-table-view-cell">第三个选项卡子项-5</li></ul></div>
                        <div class="mui-scrollbar mui-scrollbar-vertical"><div class="mui-scrollbar-indicator" style="transition-duration: 0ms; display: block; height: 207px; transform: translate3d(0px, 0px, 0px) translateZ(0px);"></div></div></div>

                </div>
            </div>
        </div>
    }
}

export default MuiRefreshListView;