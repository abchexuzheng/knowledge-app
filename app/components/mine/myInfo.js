import React from 'react';
import ReactDOM from 'react-dom';
import { NavBar, Icon,Button,TabBar,Carousel,PullToRefresh,ListView,SearchBar,Tabs,Badge } from 'antd-mobile';
import $ from 'jquery'


class MyInfo extends React.Component {
    constructor(props){
        super(props)
        this.state= {
            myInfo: undefined
        }
        this.getMyInfo();
    }
    getMyInfo(){
        let that=this;
        $.ajax({
            url: `${window.ipAddress}/ServiceAction/com.velcro.km.commons.common.BaseDataAction?action=getHumresInfo&myinfo=1`,
            type: 'get',
            dataType: 'json',
            success: function (data) {
                that.setState({
                    myInfo:data
                });
            },
            error: function (err) {
                console.log(err)
            }
        })
    }
    render() {
        return this.state.myInfo?<div className="vm-mine-info">
            <div className="vm-mine-info-container baseFlexContainer">
                <div className="vm-mine-info-head"><img src={ipAddress+this.state.myInfo.imgSrc} /></div>
                <div className="vm-mine-info-user">
                    <div>
                        <span className="vm-mine-info-user-name">{this.state.myInfo.humres.objname}</span>
                    </div>
                    <div className="vm-mine-info-user-desc">{this.state.myInfo.department}</div>
                </div>
            </div>
        </div>:null
    }
}

export default MyInfo;