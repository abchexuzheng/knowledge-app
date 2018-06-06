import React from 'react';
import ReactDOM from 'react-dom';
//import { province } from 'antd-mobile-demo-data';
import { StickyContainer, Sticky } from 'react-sticky';
import { ListView, List, SearchBar,Modal } from 'antd-mobile';
import VmSearchBar from './vmSearchBar'
import $ from 'jquery'
import mui from './../../plusHandle/mui'
import './style'

const { Item } = List;
const alert = Modal.alert;


function genData(ds, provinceData) {
    const dataBlob = {};
    const sectionIDs = [];
    const rowIDs = [];
    Object.keys(provinceData).forEach((item, index) => {
        sectionIDs.push(item);
        dataBlob[item] = item;
        rowIDs[index] = [];
        provinceData[item].forEach((jj) => {
            rowIDs[index].push(jj.value);
            dataBlob[jj.value] = jj.label;
        });
    });
    return ds.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs);
}
function genData2(ds, provinceData) {
    const dataBlob = {};
    const sectionIDs = [];
    const rowIDs = [];
    for(let i of provinceData){
        if(sectionIDs.indexOf(i.pinyin)<0){
            let sectionPos=getPushPos(sectionIDs,i.pinyin);
            sectionIDs.splice(sectionPos,0,i.pinyin);
            dataBlob[i.pinyin] = i.pinyin;
            rowIDs.splice(sectionPos,0,[i.id]);
            dataBlob[i.id] = i.name;
        }else{
            let rowIDsPos=getPushPos(rowIDs[sectionIDs.indexOf(i.pinyin)],i.name,dataBlob);
            rowIDs[sectionIDs.indexOf(i.pinyin)].splice(rowIDsPos,0,i.id);
            //rowIDs[sectionIDs.indexOf(i.pinyin)].push(i.id);
            dataBlob[i.id] = i.name;
        }
    }
    return ds.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs);
}
function getPushPos(array,item,map){
    let last = '';
    for(let [index,ele] of array.entries()){
        if(item>last&&item<=(map?map[ele]:ele)){
            return index
        }else{
            last=ele;
        }
    }
    return array.length;
}

class IndexListView extends React.Component {
    constructor(props) {
        super(props);
        const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
        const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

        const dataSource = new ListView.DataSource({
            getRowData,
            getSectionHeaderData: getSectionData,
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        });

        this.state = {
            inputValue: '',
            dataSource,
            isLoading: true,
        };
    }

    componentDidMount() {
        // simulate initial Ajax
        this.getData();
        //setTimeout(() => {
        //    this.setState({
        //        dataSource: genData(this.state.dataSource, province),
        //        isLoading: false,
        //    });
        //}, 600);
    }
    getData(refresh=false){
        let that=this;
        $.ajax({
            url:window.ipAddress+'/ServiceAction/com.velcro.weixin.browser.action.HumresBrowserAction?action=gethumreslist',
            type:'get',
            dataType:'json',
            success:function(data){
                console.log(genData2(that.state.dataSource, data.humreslist));
                that.humresList=data.humreslist;
                that.setState({
                    dataSource: genData2(that.state.dataSource, data.humreslist),
                    isLoading: false,
                });
            },
            error:function(data){
                message.error(err.text)
            }
        })
    }
    onSearch = (val) => {
        let resultList=[];
        for(let ele of this.humresList){
            if(ele.name.indexOf(val)>=0){
                resultList.push(ele)
            }
        }
        this.setState({
            inputValue: val,
            dataSource: genData2(this.state.dataSource, resultList),
        });
    };
    handleTel(id){
        let tel=this.humresList.find(function(item){
            return item.id==id;
        }).tel;
        if(tel){
            //mui.confirm(`即将拨打:${tel}`,
            //    '拨打电话',
            //    [
            //        '取消',
            //        '确认'
            //    ],
            //    function(result){
            //        if(result.index==1){
            //            window.location=`tel:${tel}`
            //        }
            //    }
            //);
            window.location=`tel:${tel}`
        }else{
            alert("未录入电话号码！")
        }
    }
    render() {
        return (<div
            {...this.props}
            style={{ paddingTop: '44px', position: 'relative',height:'100%' }}
        >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0}}>
                <SearchBar
                    value={this.state.inputValue}
                    placeholder="搜索"
                    onChange={this.onSearch}
                    onClear={() => { console.log('onClear'); }}
                    onCancel={() => { console.log('onCancel'); }}
                />
            </div>
            <ListView.IndexedList
                dataSource={this.state.dataSource}
                className="am-list sticky-list"
                ref={el => this.lv = el}
                style={{height:'100%'}}
                renderSectionWrapper={sectionID => (
                  <StickyContainer
                    key={`s_${sectionID}_c`}
                    className="sticky-container"
                    style={{ zIndex: 4 }}
                  />
                )}
                renderSectionHeader={sectionData => (
                  <Sticky>
                    {({
                      style,
                    }) => (
                      <div
                        className="sticky"
                        style={{
                          ...style,
                          zIndex: 3,
                          backgroundColor: '#f1f1f1',
                          color: '#999999',
                          height:44
                        }}
                      >{sectionData}</div>
                    )}
                  </Sticky>
                )}
                renderRow={(rowData,key,id) => {
                    return <Item style={{padding:'0 20px'}}  onClick={()=>this.handleTel(id)}>{rowData}</Item>
                }}
                quickSearchBarStyle={{
                    position:'absolute',
                    top: 85,
                    right:10,
                    zIndex:5
                }}
                delayTime={10}
                delayActivityIndicator={<div style={{ padding: 25, textAlign: 'center' }}>加载中...</div>}
            />
        </div>);
    }
}

export default IndexListView


