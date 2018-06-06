import React from 'react';
import ReactDOM from 'react-dom';
import { NavBar, Icon,Button,TabBar,PullToRefresh,ListView,SearchBar,Grid} from 'antd-mobile';
import WorkGrid from './workGrid'
import WorkData from './workData'
import WorkListItem from './workListItem'
import BackArrow from './../public/backArrow'
import VmSearchBar from './../public/vmSearchBar'



class WorkList extends React.Component {
    constructor(props){
        super(props);
        this.state={
            editable:false,
            searchStr:''
        };
        let that=this;
        let workData=new WorkData();
        workData.getWorkData(function(data){
            that.setState({
                workData:data
            })
        })
    }
    editableSwitch(){
        this.setState({
            editable:!this.state.editable
        })
    }
    cancelChange(){
        let workData=new WorkData(this.state.workData.modules);
        let ids=JSON.parse(localStorage.getItem("workIdList"));
        this.state.workData.ids=ids;
        this.state.workData.workList=workData.getWorkItemList(ids);
        this.setState({
            editable:false
        })
    }
    submitChange(){
        let ids=JSON.stringify(this.state.workData.ids);
        localStorage.setItem("workIdList",ids);
        this.setState({
            editable:false
        })
        plus.webview.getWebviewById("work").reload();
    }
    changeMyWorkList(id){
        let index=this.state.workData.ids.indexOf(id);
        if(index>=0){
            this.state.workData.ids.splice(index,1)
        }else{
            this.state.workData.ids.push(id)
        }
        let workData=new WorkData(this.state.workData.modules);
        this.state.workData.workList=workData.getWorkItemList(this.state.workData.ids);
        this.setState({
            updated:true
        })
    }
    handleChangeValue(value){
        this.setState({
            searchStr:value
        })
    }
    render() {
        return <div className="">
            {
                this.state.editable?<NavBar
                    mode="light"
                    leftContent={
                        <div onClick={()=>this.cancelChange()}>取消</div>
                    }
                    rightContent={
                        <div onClick={()=>this.submitChange()}>完成</div>
                    }
                >我的应用编辑</NavBar>:<div className="vm-search-bar-Container baseFlexContainer">
                    <BackArrow />
                    <div className="flex1">
                        <VmSearchBar
                            className="vm-fade-in"
                            placeholder="搜索"
                            value={this.state.searchStr}
                            onChange={e=>this.handleChangeValue(e.target.value)}
                        />
                    </div>
                </div>
            }
            {
                this.state.workData?<WorkListItem
                    data={{
                        title:'我的应用',
                        menus:this.state.workData.workList
                    }}
                    editableSwitch={()=>this.editableSwitch()}
                    extend={this.state.editable}
                    editable={this.state.editable}
                    myWorkListId={this.state.workData.ids}
                    changeMyWorkList={id=>this.changeMyWorkList(id)}
                />:null
            }
            {
                this.state.workData&&this.state.workData.modules.map(list=>{
                    return <WorkListItem
                        data={list}
                        editable={this.state.editable}
                        myWorkListId={this.state.workData.ids}
                        changeMyWorkList={id=>this.changeMyWorkList(id)}
                        searchStr={this.state.searchStr}
                    />
                })
            }
        </div>;
    }
}

export default WorkList;