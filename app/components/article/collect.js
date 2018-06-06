import React from 'react';
import ReactDOM from 'react-dom';
import { NavBar, Icon,Button,TabBar,Carousel,PullToRefresh,ListView,SearchBar,Tabs,Badge ,Modal,List, TextareaItem,InputItem,Toast} from 'antd-mobile';
import $ from 'jquery'
import mui from './../../plusHandle/mui'
import Hammer from 'react-hammerjs'

const prompt = Modal.prompt;

class Collect extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            value:""
        }
        this.getData()
    }
    showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        });
    }
    onClose = key => () => {
        console.log(key)
        this.setState({
            [key]: false,
        });
    };
    closeModal(){
        this.setState({
            modal:false
        })
    }
    onWrapTouchStart = (e) => {
        // fix touch to scroll background page on iOS
        if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
            return;
        }
        const pNode = closest(e.target, '.am-modal-content');
        if (!pNode) {
            e.preventDefault();
        }
    };
    //获取收藏夹列表
    getData(){
        let that=this;
        $.ajax({
            url: `${window.ipAddress}/ServiceAction/com.velcro.km.directory.servlet.DirectoryAction?action=getDirectorys&objId=${this.props.id}`,
            type: 'get',
            dataType: 'json',
            success: function (data) {
                that.setState({
                    directorys:data.directorys
                })
            },
            error: function (err) {
                message.error(err.text)
            }
        })
    }
    //创建收藏夹
    createDirectoryFun(name){
        console.log("create"+name)
        let that=this;
        $.ajax({
            url: `${window.ipAddress}/ServiceAction/com.velcro.km.directory.servlet.DirectoryAction?action=create`,
            type: 'post',
            data:{
                name:name
            },
            dataType: 'json',
            success: function (data) {
                if(data.errorMsg==""){
                    that.getData()
                }
                console.log(data);
            },
            error: function (err) {
                message.error(err.text)
            }
        })
    }
    //收藏
    //id 收藏夹id
    collect(id){
        let that=this;
        $.ajax({
            url: `${window.ipAddress}/ServiceAction/com.velcro.km.collection.servlet.CollectionAction?action=create`,
            type: 'post',
            data:{
                objId:that.props.id,
                directoryId:id
            },
            dataType: 'json',
            success: function (data) {
                if(data.errorMsg==""){
                    that.getData()
                    that.props.getData();
                }
            },
            error: function (err) {
                message.error(err.text)
            }
        })
    }
    //取消收藏
    cancelCollect(id){
        let that=this;
        $.ajax({
            url: `${window.ipAddress}/ServiceAction/com.velcro.km.collection.servlet.CollectionAction?action=cancel`,
            type: 'post',
            data:{
                objId:that.props.id,
                directoryId:id
            },
            dataType: 'json',
            success: function (data) {
                if(data.errorMsg==""){
                    that.getData();
                    that.props.getData();
                }
            },
            error: function (err) {
                message.error(err.text)
            }
        })
    }
    createDirectory(){
        let that=this;
        mui.prompt('请输入收藏夹名称',
            '',
            '创建收藏夹',
            [
                '取消',
                '提交'
            ],
            function(result){
                if(result.index==1){
                    that.createDirectoryFun(result.value)
                }
            }
        );
    }
    render(){
        return <div>
                <div onClick={this.showModal('modal')}>
                    {
                        this.props.collectState?<img src="icons/collect-red.png" />:<img src="icons/collect.png" />
                    }
                    <span>{this.props.data}</span>
                </div>
            <Modal
                popup
                visible={this.state.modal}
                onClose={this.onClose('modal')}
                animationType="slide-up"
            >
                <List renderHeader={() => <div style={{padding:'0.75rem',fontSize:'1rem'}}>收藏夹列表</div>} className="popup-list">
                    {
                        this.state.directorys&&this.state.directorys.length>0?this.state.directorys.map((item,index)=>(
                            <List.Item
                                key={index}
                            >
                                <div className="baseFlexContainer">
                                    <div className="flex1">{item.name}</div>
                                    {
                                        item.state?<div
                                            className="vm-author-btn vm-author-btn-grey"
                                            onClick={()=>this.cancelCollect(item.id)}
                                        >取消</div>:<div
                                            className="vm-author-btn"
                                            onClick={()=>this.collect(item.id)}
                                        >收藏</div>
                                    }
                                </div>
                            </List.Item>
                        )):null
                    }

                </List>
                <List.Item>
                    <Button type="primary" onClick={()=>this.createDirectory()}>添加新收藏夹</Button>
                </List.Item>
            </Modal>
        </div>
    }
}

export default Collect;