import React from 'react';
import ReactDom from 'react-dom';
import { HashRouter as Router, Route, Link, Switch, HashHistory,IndexRoute  } from 'react-router-dom';
import { NavBar, Icon,Button,TabBar } from 'antd-mobile';
import Native from './../../plusHandle'
import mui from './../../plusHandle/mui'
import Hammer from 'react-hammerjs'



class WebviewTabBar extends React.Component {
    constructor(props) {
        super(props);
        this.webviewLoaded=[];
        this.state={
            selectedTab:this.props.firstTab
        };
        this.testPlus();
    }
    testPlus(){
        if(plus){
            this.showWebview(this.props.firstTab,true);
        }else{
            this.setTimeout(()=>{
                this.testPlus();
            },50)
        }
    }
    showWebview(id,isInit){
        if(this.state.selectedTab!==id||isInit){
            this.setState({
                selectedTab:isInit?this.props.firstTab:id
            });
            this.hideOtherWebview(id);
            if(this.webviewLoaded.indexOf(id)<0){
                this.webviewLoaded.push(id);
                Native.openWindow(`index.html#/${id}`,`${id}`,{
                    top:'0px',
                    bottom:'48px'
                },"")
                //plus.webview.open(`index.html#/${id}`,`${id}`,{
                //        top:'0px',
                //        bottom:'48px'
                //},"");
            }else{
                plus.webview.show(id,"")
            }
        }
    }
    hideOtherWebview(id){
        for(let i of this.webviewLoaded){
            if(i!=id){
               plus.webview.hide(i)
            }
        }
    }
    render(){
        let that=this;
        return <div className="vm-tab-bar-container baseFlexContainer">
            {
                this.props.data.map((tab)=>{
                    return <Hammer
                        className="vm-tab-bar-item"
                        onTap={()=>this.showWebview(tab.key)}
                    >
                        <div>
                            <div className="vm-tab-bar-icon-container">
                                <img
                                    className="vm-tab-bar-icon"
                                    src={
                                        this.state.selectedTab===tab.key?tab.icon.active:tab.icon.inactive
                                    }
                                />
                            </div>
                            <div className="vm-tab-bar-title">{tab.title}</div>
                        </div>
                    </Hammer>
                })
            }
        </div>
    }
}

export default WebviewTabBar;