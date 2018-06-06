import React from 'react';
import ReactDOM from 'react-dom';
import { NavBar, Icon,Button,TabBar,PullToRefresh,ListView,SearchBar,Grid} from 'antd-mobile';
import WorkGrid from './workGrid'
import WorkReportList from './workReportList'
import WorkData from './workData'
import Native from './../../plusHandle'
import $ from 'jquery'
import './style'

const showMoreIcon={
    icon: "icons/show-more.png",
    id: "showMore",
    link:'index.html#/workList',
    title: "更多"
}

class Work extends React.Component {
    constructor(props){
        super(props);
        this.state={
            workList:[]
        };
        let that=this;
        let workData=new WorkData();
        workData.getWorkData(function(data){
            let list=data.workList;
            list.push(showMoreIcon);
            that.setState({
                workList:list
            })
        })
    }
    componentDidMount(){
        Native.cancelBackBtn()
    }
    render() {
        return <div className="flexContainer">
            <NavBar
                mode="light"
            >工作</NavBar>
            <div className="flex1">
                <WorkGrid style={{marginTop:'0.315rem'}} data={this.state.workList}/>
                <WorkReportList />
            </div>
        </div>;
    }
}

export default Work;