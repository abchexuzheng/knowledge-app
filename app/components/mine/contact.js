import React from 'react';
import ReactDOM from 'react-dom';
import { NavBar, Icon,Button,TabBar,Carousel,PullToRefresh,ListView,SearchBar,Tabs,Badge,List } from 'antd-mobile';
import BackArrow from './../public/backArrow'
import './style'


class Contact extends React.Component {
    render() {
        return <div className="flexContainer">
            <NavBar
                className="am-navbar-margin"
                mode="light"
                icon={<BackArrow />}
            >联系我们</NavBar>
            <div className="vm-about-container flex1">
                <div>联系电话：021-66666666</div>
                <div>电子邮箱：amt@amt.com.cn</div>
            </div>
        </div>;
    }
}

export default Contact;