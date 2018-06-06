import React from 'react';
import ReactDOM from 'react-dom';
import { NavBar, Icon,Button,TabBar,PullToRefresh,ListView,SearchBar,Grid} from 'antd-mobile';
import WorkGrid from './workGrid'
import WorkData from './workData'
import BackArrow from './../public/backArrow'
import VmSearchBar from './../public/vmSearchBar'




class WorkListItem extends React.Component {
    constructor(props){
        super(props);
    }
    changeType(){
        this.props.editableSwitch();
    }
    render() {
        return <div className="vm-work-list-item">
            <div className="vm-work-list-item-title-container">
                <div className="vm-work-list-item-title-container baseFlexContainer vm-fade-in">
                    <div className="vm-work-list-item-title">{this.props.data.title}</div>
                    {
                        this.props.extend == false?<div className="vm-work-icon-min-container flex1">
                            {
                                this.props.data.menus.map(item=>{
                                    return <div className="vm-work-icon-min"><img src={item.icon}  alt="" /></div>
                                })
                            }
                        </div>:null
                    }
                    {
                        this.props.extend== false ?<div
                            className="vm-work-list-btn "
                            onClick={()=>this.changeType()}
                        >编辑</div>:null
                    }
                </div>
            </div>
            <div className="vm-work-list-item-content">
                {
                    this.props.extend!==false?<WorkGrid
                        className="vm-slide-down-in"
                        data={this.props.data.menus}
                        editable={this.props.editable}
                        myWorkListId={this.props.myWorkListId}
                        changeMyWorkList={id=>this.props.changeMyWorkList(id)}
                        searchStr={this.props.searchStr}
                    />:null
                }
            </div>
        </div>
    }
}

export default WorkListItem;