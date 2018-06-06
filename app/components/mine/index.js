import React from 'react';
import ReactDOM from 'react-dom';
import { NavBar, Icon,Button,TabBar,Carousel,PullToRefresh,ListView,SearchBar,Tabs,Badge,List } from 'antd-mobile';
import MyInfo from './myInfo'
import Native from './../../plusHandle'
import './style'

const Item=List.Item;

class Mine extends React.Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){
        Native.cancelBackBtn()
    }
    logOut(){
        //console.log(document.cookie);
        //let keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        //if(keys) {
        //    for(let i = keys.length; i--;){
        //        document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
        //    }
        //}
        plus.navigator.removeAllCookie();
        //plus.cache.clear(()=>{
        let wvs=plus.webview.all();
        wvs[0].loadURL('index.html')
        for(let i=1;i<wvs.length;i++){
            wvs[i].close();
        }
        //});
    }
    openWindow(href){
        Native.openWindow(href,'','','slide-in-right')
    }
    render() {
        return <div className="">
            <NavBar
                mode="light"
            >我的</NavBar>
            <div className="vm-mine-item-container">
                <MyInfo />
                <Item
                    arrow='horizontal'
                    onClick={()=>this.openWindow('index.html#/account')}
                >
                    账号与安全
                </Item>
            </div>
            <div className="vm-mine-item-container">
                <Item
                    arrow='horizontal'
                    onClick={()=>this.openWindow('index.html#/contact')}
                >
                    联系我们
                </Item>
                <Item
                    arrow='horizontal'
                    onClick={()=>this.openWindow('index.html#/about')}
                >
                    关于
                </Item>
            </div>
            <div className="vm-mine-item-container">
                <Item
                    arrow='horizontal'
                    onClick={()=>this.logOut()}
                >
                    退出账号
                </Item>
            </div>
        </div>;
    }
}

export default Mine;