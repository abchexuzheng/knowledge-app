import React from 'react';
import ReactDOM from 'react-dom';
import { NavBar, Icon,Button,TabBar,Carousel,PullToRefresh,ListView,SearchBar,Tabs,Badge } from 'antd-mobile';
import moment from 'moment'

class AuthorInfo extends React.Component {
    constructor(props) {
        super(props);
        let dateMoment=new moment(this.props.date)
        this.date=dateMoment.format("YYYY-MM-DD")
    }
    render(){
        console.log(this.props)
        return <div className="vm-author-info-container baseFlexContainer">
            <div className="vm-author-head"><img src={window.ipAddress+this.props.data.imgSrc} /></div>
            <div className="flex1">
                <div className="vm-author-name">{this.props.data.objname}</div>
                <div className="vm-author-date">{this.date}</div>
            </div>

        </div>
    }
}

export default AuthorInfo;