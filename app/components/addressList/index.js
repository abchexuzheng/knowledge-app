import React from 'react';
import ReactDOM from 'react-dom';
import { NavBar, Icon,Button,TabBar,Carousel,PullToRefresh,ListView,SearchBar,Tabs,Badge } from 'antd-mobile';
import RefreshListView from './../public/refreshListView'
import IndexListView from './../public/indexListView'
import Native from './../../plusHandle'


class AddressList extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        Native.cancelBackBtn()
    }
    render() {
        return <div className="flexContainer" style={{position:'relative'}}>
            <IndexListView className="vm-addressList" />
        </div>;
    }
}

export default AddressList;