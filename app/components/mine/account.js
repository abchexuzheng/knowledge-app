import React from 'react';
import ReactDOM from 'react-dom';
import { NavBar, Icon,Button,TabBar,Carousel,PullToRefresh,ListView,SearchBar,Tabs,Badge,List } from 'antd-mobile';
import BackArrow from './../public/backArrow'
import Native from './../../plusHandle'
import './style'

const Item=List.Item;

class Account extends React.Component {
    openWindow(href){
        Native.openWindow(href,'','','slide-in-right')
    }
    render() {
        return <div className="">
            <NavBar
                className="am-navbar-margin"
                mode="light"
                icon={<BackArrow />}
            >账号与安全</NavBar>
            <div className="vm-mine-item-container">
                <Item
                    arrow='horizontal'
                    onClick={()=>this.openWindow('index.html#/changePsw')}
                >
                    修改密码
                </Item>
            </div>
        </div>;
    }
}

export default Account;