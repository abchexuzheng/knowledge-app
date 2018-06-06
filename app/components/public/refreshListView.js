import React from 'react';
import ReactDOM from 'react-dom';
import { Icon,Button,List,ListView,PullToRefresh } from 'antd-mobile';
import NewsCarousel from './../news/newsCarousel'
import $ from 'jquery'

const data = [
    {
        img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
        title: 'Meet hotel',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
        title: 'McDonald\'s invites you',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
        title: 'Eat the week',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
];
const NUM_ROWS = 20;
const PAGE_SIZE=20;
let pageIndex = 1;

function genData(pIndex = 0) {
    const dataArr = [];
    for (let i = 0; i < NUM_ROWS; i++) {
        dataArr.push(`row - ${(pIndex * NUM_ROWS) + i}`);
    }
    return dataArr;
}

class RefreshListView extends React.Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource,
            refreshing: true,
            isLoading: true,
            height: document.documentElement.clientHeight,
            useBodyScroll: false,
        };
    }
    getData(refresh=false){
        let that=this;
        const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
        if(this.props.getSource){
            $.ajax({
                url:window.ipAddress+this.props.getSource(pageIndex,PAGE_SIZE),
                type:'get',
                dataType:'json',
                success:function(data){
                    console.log(JSON.stringify(data));
                    console.log();
                    if(refresh){
                        that.rData=that.props.getData(data);
                    }else{
                        that.rData=[...that.rData,...that.props.getData(data)];
                    }
                    let header=that.props.getHeader?that.props.getHeader(data):'';
                    that.setState({
                        dataSource: that.state.dataSource.cloneWithRows(that.rData),
                        header:header,
                        refreshing: false,
                        isLoading: false,
                    });
                },
                error:function(data){
                    message.error(err.text)
                }
            })
        }else{
            setTimeout(() => {
                this.rData = genData();
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(genData()),
                    height: hei,
                    refreshing: false,
                    isLoading: false,
                });
            }, 1500);
        }
    }
    componentDidUpdate() {
        //if (this.state.useBodyScroll) {
        //    document.body.style.overflow = 'auto';
        //} else {
        //    document.body.style.overflow = 'hidden';
        //}
    }
    componentDidMount() {
        const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
        this.getData(true);
    }
    onRefresh = () => {
        this.setState({ refreshing: true, isLoading: true });
        this.getData(true);
    };
    onEndReached = (event) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading) {
            return;
        }
        console.log('reach end', event);
        this.setState({ isLoading: true });
        //pageIndex++;
        //this.getData();
    };
    render(){
        const row=this.props.row;
        console.log("refreshView")
        return <ListView
            key={this.state.useBodyScroll ? '0' : '1'}
            ref={el => this.lv = el}
            dataSource={this.state.dataSource}
            renderHeader={()=>this.state.header}
            renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                  {this.state.isLoading ? '' : ''}
                </div>)}
            renderRow={row}
            useBodyScroll={this.state.useBodyScroll}
            style={this.state.useBodyScroll ? {} : {
                  height: '100%',
                  border: '1px solid #ddd',
                  width: '100%'
            }}

            onEndReached={this.onEndReached}
            pageSize={5}
        />
    }
}

export default RefreshListView;