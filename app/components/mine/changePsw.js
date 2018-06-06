import React from 'react';
import ReactDOM from 'react-dom';
import { NavBar, Icon,Button,TabBar,Carousel,PullToRefresh,ListView,SearchBar,Tabs,Badge,List,Toast } from 'antd-mobile';
import BackArrow from './../public/backArrow'
import $ from 'jquery'
import './style'


class About extends React.Component {
    constructor(props){
        super(props)
        this.state={
            old:"",
            new:"",
            newRepeat:""
        }
    }
    changeValue(value,key){
        this.setState({
            [key]:value
        })
    }
    changePsw(){
        let that=this;
        $.ajax({
            url: `${window.ipAddress}/ServiceAction/com.velcro.mobile.servlet.MobileServlet?method=changepassword&sessionid=&oldpassword=${this.state.old}&logonpass=${this.state.new}`,
            type: 'get',
            success: function (data) {
                if(data==""){
                    Toast.success('修改成功',1,function(){
                        let webviewNow=plus.webview.currentWebview();
                        plus.webview.close(webviewNow,'slide-out-right')
                    })
                }else{
                    Toast.fail(data,2,'',false)
                }
            },
            error: function (err) {
                console.log(err)
            }
        })
    }
    render() {
        return <div className="flexContainer">
            <NavBar
                className="am-navbar-margin"
                mode="light"
                icon={<BackArrow />}
            >修改密码</NavBar>
            <div className="vm-login-container flex1">
                <input
                    className="vm-login-input needsclick"
                    placeholder="旧密码"
                    type="password"
                    value={this.state.old}
                    onChange={e=>this.changeValue(e.target.value,'old')}
                />
                <input
                    className="vm-login-input needsclick"
                    placeholder="新密码"
                    type="password"
                    value={this.state.new}
                    onChange={e=>this.changeValue(e.target.value,'new')}
                />
                <input
                    className="vm-login-input"
                    placeholder="新密码重复 needsclick"
                    type="password"
                    value={this.state.newRepeat}
                    onChange={e=>this.changeValue(e.target.value,'newRepeat')}
                />
                <Button
                    className="vm-login-btn"
                    onClick={()=>this.changePsw()}
                >修改密码</Button>
            </div>
        </div>;
    }
}

export default About;