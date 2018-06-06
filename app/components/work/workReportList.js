import React from 'react';
import ReactDOM from 'react-dom';
import { NavBar, Icon,Button,TabBar,PullToRefresh,ListView,SearchBar,Grid} from 'antd-mobile';
import WorkGrid from './workGrid'
import WorkReportItem from './workReportItem'
import $ from 'jquery'
import './style'



//const data = Array.from(new Array(3)).map((_val, i) => ({
//    id:'abac',
//    title: `工作报表${i+1}`,
//}));


class WorkReportList extends React.Component {
    constructor(props){
        super(props);
        this.state={
            reportList:[],
            loaded:false
        };
        this.getReportList()
    }
    getReportList(){
        let that=this;
        $.ajax({
            url: `${window.ipAddress}/ServiceAction/com.velcro.km.app.common.DataBaseAction?action=listReport`,
            type: 'get',
            dataType: 'json',
            success: function (data) {
                $.getScript(`${ipAddress}/vworkflow/report/bundle.js`,function(){
                    that.setState({
                        reportList:data,
                        loaded:true
                    });
                });
            },
            error: function (err) {
                console.log(err)
            }
        })
    }
    render() {
        return <div>
            {
                this.state.loaded?this.state.reportList.map(item=>{
                    return <WorkReportItem data={item} key={`report${item.reportid}`}/>
                }):<div className="vm-loading-container"><Icon type="loading"/></div>
            }
        </div>;
    }
}

export default WorkReportList;