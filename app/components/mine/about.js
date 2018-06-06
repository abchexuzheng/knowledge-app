import React from 'react';
import ReactDOM from 'react-dom';
import { NavBar, Icon,Button,TabBar,Carousel,PullToRefresh,ListView,SearchBar,Tabs,Badge,List } from 'antd-mobile';
import BackArrow from './../public/backArrow'
import './style'

const Item=List.Item;

class About extends React.Component {
    render() {
        return <div className="flexContainer">
            <NavBar
                className="am-navbar-margin"
                mode="light"
                icon={<BackArrow />}
            >关于</NavBar>
            <div className="vm-about-container flex1">
                <div>app版本号1.0.0</div>
                <div>velcro版本号7.2.0</div>
            </div>
        </div>;
    }
}

export default About;