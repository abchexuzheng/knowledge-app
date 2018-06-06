import React from 'react';
import ReactDom from 'react-dom';
import { HashRouter as Router, Route, Link, Switch, HashHistory,IndexRoute  } from 'react-router-dom';
import { NavBar, Icon,Button,TabBar } from 'antd-mobile';
import News from './../components/news'
import Message from './../components/message'
import AddressList from './../components/addressList'
import Work from './../components/work'
import WebviewTabBar from './../components/public/webviewTabBar'
import Native from './../plusHandle'
import {BOTTOM_NAV} from './../config'
import mui from './../plusHandle/mui'
//import mine from 'js-mine'
import $ from 'jquery'


const tabBarData=[{
    title:'动态',
    key:'news',
    content:<News />,
    icon:{
        active:'icons/news-filled.png',
        inactive:'icons/news-empty.png'
    }
},{
    title:'消息',
    key:'message',
    content:<Message />,
    icon:{
        active:'icons/message-filled.png',
        inactive:'icons/message-empty.png'
    }
},{
    title:'工作',
    key:'work',
    content:<Work />,
    icon:{
        active:'icons/work-filled.png',
        inactive:'icons/work-empty.png'
    }
},{
    title:'通讯录',
    key:'addressList',
    content:<AddressList />,
    icon:{
        active:'icons/address-filled.png',
        inactive:'icons/address-empty.png'
    }
},{
    title:'我的',
    key:'mine',
    content:<Message />,
    icon:{
        active:'icons/user-filled.png',
        inactive:'icons/user-empty.png'
    }
}]

class IndexViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            selectedTab:'news'
        };
    }
    componentDidMount(){
        //mine.init();
        setTimeout(()=>{
            Native.cancelBackBtn();
            Native.addPushListener();
        },1000)

        //Native.createLocalPushMsg();
    }
    render(){
        let that=this;
        return <div className="baseContainer">
            <WebviewTabBar
                data={tabBarData}
                firstTab="news"
            />
        </div>
    }
}

export default IndexViewer;