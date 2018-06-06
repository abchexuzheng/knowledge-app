import React from 'react';
import ReactDOM from 'react-dom';
import { NavBar, Icon,Button,TabBar,Carousel,PullToRefresh,ListView,SearchBar,Tabs,Badge } from 'antd-mobile';
import BackArrow from './../public/backArrow'
import $ from 'jquery'
import './style'
import Native from './../../plusHandle'



class VelcroViewer extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.getQueryString('address'))
        let address=this.getQueryString('address');
        if(address.indexOf("http")<0){
            address=window.ipAddress+this.getQueryString('address')
        }
        this.state={
            address:address,
            loaded:false
        }
    }
    componentDidMount(){
        let that=this;
        this.velcroFrame.onload=function(){
            $(that.velcroFrame).contents().find("a").each(function(){
                let href=$(this).attr("href");
                $(this).removeAttr("href");
                $(this).removeAttr("target");
                $(this).on("click",function(){
                    that.handleClick(href)
                })
            })
            that.loadScript(that.velcroFrame)
            that.setState({
                loaded:true
            })
        }
    }
    handleClick(href){
        if(href&&href.indexOf("#")<0){
            Native.openWindow(`index.html#/velcroViewer?address=${href}`,'','','slide-in-right')
        }
    }
    loadScript(dom) {
        dom.contentWindow.addTabM=function(a,b,c){
            plus.webview.open('index.html#/velcroViewer?address='+c,'','','slide-in-right');
        }
        dom.contentWindow.openWin=function(a){
            plus.webview.open('index.html#/velcroViewer?address='+a,'','','slide-in-right');
        }
    }
    getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = this.props.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
    render(){
        return <div className=" velcroViewerDiv">
            <NavBar
                mode="light"
                icon={<BackArrow/>}
                className="vm-header-absolute"
            >UVC GROUP</NavBar>
            {
                this.state.loaded==false?<div className="vm-loading-container-right"><Icon type="loading" /></div>:null
            }
            <div className="velcroFrame-container">
                <iframe
                    src={this.state.address}
                    className="velcroFrame"
                    ref={el => this.velcroFrame = el}
                ></iframe>
            </div>
        </div>
    }
}

export default VelcroViewer;