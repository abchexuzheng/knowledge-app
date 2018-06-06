import React from 'react';
import ReactDom from 'react-dom';
import { HashRouter as Router, Route, Link, Switch, HashHistory,IndexRoute  } from 'react-router-dom';
import { NavBar,Button,TabBar } from 'antd-mobile';
import Native from './../../plusHandle'
import Hammer from 'react-hammerjs'
import ReactPullToRefresh from 'react-pull-to-refresh'
import $ from 'jquery'

let pageIndex=1;
const PAGE_SIZE=20;

class VmRefreshListViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            dataSource:[],
            loaded:false
        };
        this.getData(true)
    }
    handleRefresh(resolve, reject) {
        this.getData(true,resolve,reject)
    }
    getData(refresh=false,resolve,reject){
        let that=this;
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
                    if(resolve){
                        resolve();
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
        let loading=<Icon className="vm-refresh-loading" type="loading"/>
        let icon=<div className="vm-refresh-info"></div>
        return <ReactPullToRefresh
            onRefresh={(resolve,reject)=>this.handleRefresh(resolve,reject)}
            className="vm-refresh-container"
            style={{
                textAlign: 'center'
            }}
            loading={loading}
            icon={icon}
            distanceToRefresh={50}
        >
            <div className="vm-refresh-container-div">
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
            </div>
        </ReactPullToRefresh>
    }
}

export default VmRefreshListViewer;