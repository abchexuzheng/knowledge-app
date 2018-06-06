import React from 'react';
import ReactDOM from 'react-dom';
import { NavBar, Icon,Button,TabBar,Carousel,PullToRefresh,ListView,SearchBar,Tabs,Badge } from 'antd-mobile';
import Native from './../../plusHandle'
import $ from 'jquery'
import './style'


class Login extends React.Component {
    constructor(props){
        super(props);
        document.addEventListener("plusready", this.onPlusReady, false );
        this.state={
            needLog:false,
            username:"",
            password:""
        };
    }
    componentDidMount(){
        Native.cancelBackBtn()
    }
    onPlusReady=()=>{
        this.logIn(true);
    };
    logIn(isAuto){
        let that=this;
        let random=Math.random();
        let info=plus.push.getClientInfo();
        let token=info.token;
        let clientId=info.clientid;
        let version=plus.runtime.version;
        let loginUrl=`${window.ipAddress}/ServiceAction/com.velcro.mobile.servlet.MobileServlet?method=login&username=${this.state.username}&password=${this.state.password}&token=${token}&clientid=${clientId}&version=${version}`
        if(isAuto){
            loginUrl=`${window.ipAddress}/ServiceAction/com.velcro.mobile.servlet.MobileServlet?method=login`
        }
        $.ajax({
            url: loginUrl,
            type: 'get',
            dataType: 'json',
            success: function (data) {
                if(data.msg==""||data.msg=="expired"||data.msg=="isfirst"){
                    //localStorage.setItem("username", that.state.username);
                    window.location='index.html#/indexViewer'
                }else{
                    if(!isAuto){
                        alert(data.msg)
                    }else{
                        that.setState({
                            needLog:true
                        })
                    }
                }
            },
            error: function (err) {
                console.log(err.text);
                that.setState({
                    needLog:true
                })
            }
        })
    }
    changeValue(value,name){
        this.state[name]=value;
        this.setState({
            updated:true
        })
    }
    render() {
        return this.state.needLog?<div className="vm-login-container">
            <div className="vm-login-title-container">
                <img src="img/logo.png"/>
            </div>
            <input
                className="vm-login-input needsclick"
                placeholder="用户名"
                type="text"
                value={this.state.username}
                onChange={e=>this.changeValue(e.target.value,'username')}
            />
            <input
                className="vm-login-input needsclick"
                placeholder="密码"
                type="password"
                value={this.state.password}
                onChange={e=>this.changeValue(e.target.value,'password')}
            />
            <Button
                className="vm-login-btn"
                onClick={()=>this.logIn()}
            >登录</Button>
        </div>:null
    }
}

export default Login;