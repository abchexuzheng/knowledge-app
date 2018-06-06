import React from 'react';
import ReactDOM from 'react-dom';
import { NavBar, Icon,Button,TabBar,Carousel,PullToRefresh,ListView,SearchBar,Tabs,Badge } from 'antd-mobile';
import RefreshListView from './../public/refreshListView'
import VmSearchBar from './../public/vmSearchBar'
import ScheduleItem from './scheduleItem'
import MessageItem from './messageItem'
//import MuiRefreshListView from './../public/muiRefreshListView'
import MuiRefreshListView from 'react-mobile-pull-to-refresh'
import Native from './../../plusHandle'

const tabs = [
    { title: <div className="vm-tab-title" >待办</div> },
    { title: <div className="vm-tab-title" >消息</div> },
    { title: <div className="vm-tab-title" >知会</div> }
];

class Message extends React.Component {
    constructor(props){
        super(props);
        this.state={
            searchStr:""
        }
        Native.cancelBackBtn()
    }
    handleSearch(value){
        this.setState({
            searchStr:value
        })
    }
    render() {
        return <div className="flexContainer">
            <NavBar
                className="am-navbar-nomargin"
                mode="light"
            >消息</NavBar>
            <VmSearchBar
                value={this.state.searchStr}
                onChange={e=>this.handleSearch(e.target.value)}
                placeholder="搜索"
                className="vm-search-bar-shadow"
            />
            <Tabs tabs={tabs}
                  initialPage={0}
                  onChange={(tab, index) => { console.log('onChange', index, tab); }}
                  onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                  tabBarUnderlineStyle={{borderColor:'#1d568f'}}
                  tabBarActiveTextColor="white"
                  useOnPan={false}
                  swipeable={true}
                  className='flex1'
                  prerenderingSiblingsNumber={true}
            >
                <MuiRefreshListView
                    id="daibanList"
                    key={`daibanList${this.state.searchStr}`}
                    index={0}
                    row={(data)=>{
                        return <ScheduleItem data={data} key={`danban${data.workflowid}`}/>
                    }}
                    getSource={(pageNow,pageSize)=>{
                        return `/ServiceAction/com.velcro.mobile.servlet.MobileServlet?method=getworkflowlist&sessionid=&workflowtype=1&currentpage=${pageNow}&pagesize=${pageSize}&workflowname=${this.state.searchStr}`
                    }}
                    getData={(res)=>{
                        return res.workflowlist
                    }}
                />
                <MuiRefreshListView
                    id="messageList"
                    key={`messageList${this.state.searchStr}`}
                    index={1}
                    row={(data)=>{
                        return <MessageItem data={data} />
                    }}
                    getSource={(pageNow,pageSize)=>{
                        return `/ServiceAction/com.velcro.remind.base.servlet.NoticeAction?action=search&tb=2&pageno=${pageNow}&pagesize=${pageSize}&isajax=1&messagecontent=${this.state.searchStr}`
                    }}
                    getData={(res)=>{
                        return res.resultlist
                    }}
                />
                <MuiRefreshListView
                    id="zhihuiListView"
                    key={`zhihuiListView${this.state.searchStr}`}
                    index={2}
                    row={(data)=>{
                        return <ScheduleItem data={data} key={`zhihui${data.workflowid}`}/>
                    }}
                    getSource={(pageNow,pageSize)=>{
                        return `/ServiceAction/com.velcro.mobile.servlet.MobileServlet?method=getworkflowlist&workflowtype=2&currentpage=${pageNow}&pagesize=${pageSize}&workflowname=${this.state.searchStr}`
                    }}
                    getData={(res)=>{
                        return res.workflowlist
                    }}
                />
            </Tabs>
        </div>;
    }
}

export default Message;