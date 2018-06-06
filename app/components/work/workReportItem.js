import React from 'react';
import ReactDOM from 'react-dom';
import { NavBar, Icon,Button,TabBar,PullToRefresh,ListView,SearchBar,Grid} from 'antd-mobile';
import './style'



class WorkReportItem extends React.Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){
        if(this.reportItem){
            npReport.render(this.reportItem)
        }
    }
    render() {
        return <div className="vm-work-report-item">
            <div className="vm-work-report-item-title-container">
                <div className="vm-work-report-item-title">{this.props.data.title}</div>
            </div>
            <div className="vm-work-report-item-content">
                <div
                    ref={el => this.reportItem = el}
                    className="np-report"
                    data-source={`${ipAddress}/ServiceAction/com.velcro.workflow.creport.servlet.CReportAction?reportid=${this.props.data.reportid}&action=search`}
                ></div>
            </div>
        </div>;
    }
}

export default WorkReportItem;