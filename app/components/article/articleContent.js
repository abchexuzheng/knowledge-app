import React from 'react';
import ReactDOM from 'react-dom';
import { NavBar, Icon,Button,TabBar,Carousel,PullToRefresh,ListView,SearchBar,Tabs,Badge } from 'antd-mobile';
import $ from 'jquery'

class AuthorInfo extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        console.log(this.contentRef)
        $(this.contentRef).find("img").each(function(){
            let newSrc=window.ipAddress+$(this).attr("src");
            $(this).attr("src",newSrc)
        })
    }
    render() {
        return <div
            className="vm-article-content"
            ref={el => this.contentRef = el}
            dangerouslySetInnerHTML={{__html:this.props.content}}
        >
        </div>
    }
}

export default AuthorInfo;