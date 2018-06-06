import React from 'react';
import ReactDOM from 'react-dom';
import { NavBar, Icon,Button,TabBar,PullToRefresh,ListView,SearchBar,Grid} from 'antd-mobile';
import Native from './../../plusHandle'
import Hammer from 'react-hammerjs'


class WorkGrid extends React.Component {
    showNewWebview(href){
        if(!this.props.editable){
            console.log(href)
            Native.openWindow(href,'','','slide-in-right')
        }
    }
    render() {
        let that=this;
        let data=this.props.data;
        if(!this.props.editable&&this.props.searchStr){
            data=[];
            for(let item of this.props.data){
                if(item.title.indexOf(this.props.searchStr)>=0){
                    data.push(item);
                }
            }
        }
        return <div
            className={`vm-work-grid ${this.props.editable?"vm-work-grid-editable":""}`}
        >
            <Grid
                data={data}
                renderItem={dataItem => (
                    <Hammer onTap={()=>this.showNewWebview(dataItem.link)}>
                        <div style={{ padding: '0rem' }}>
                          <img src={dataItem.icon} style={{ height: '1.56rem' }} alt="" />
                          <div style={{ color: '#363636', fontSize: '0.75rem', marginTop: '0.625rem' }}>
                            <span>{dataItem.title}</span>
                          </div>
                          {
                             that.props.myWorkListId&&that.props.myWorkListId.indexOf(dataItem.id)>=0?
                             <div
                                 className="vm-work-edit-btn vm-work-edit-btn-red vm-fade-in"
                                 onClick={()=>this.props.changeMyWorkList(dataItem.id)}>
                             -</div>:
                             <div
                                className="vm-work-edit-btn vm-fade-in"
                                onClick={()=>this.props.changeMyWorkList(dataItem.id)}>
                             +</div>
                          }
                        </div>
                    </Hammer>
                )}
            />
        </div>;
    }
}

export default WorkGrid;