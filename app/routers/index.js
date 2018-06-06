import React from 'react';
import ReactDom from 'react-dom';
import { HashRouter as Router, Route, Link, Switch, HashHistory,IndexRoute  } from 'react-router-dom';
//import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Button } from 'antd-mobile'
import IndexViewer from './indexViewer'
import Article from './../components/article'
import CommentList from './../components/article/commentList'
import News from './../components/news'
import NewsSearchList from './../components/news/newsSearchList'
import Message from './../components/message'
import AddressList from './../components/addressList'
import Work from './../components/work'
import WorkList from './../components/work/workList'
import Mine from './../components/mine'
import Account from './../components/mine/account'
import About from './../components/mine/about'
import Contact from './../components/mine/contact'
import ChangePsw from './../components/mine/changePsw'
import Login from './../components/login'
import VelcroViewer from './../components/public/velcroViewer'


class VelcroMobile extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        return <Router>
            <div className="baseContainer">
                <Route path="/" exact component={Login} />
                <Route path="/indexViewer" component={IndexViewer} />
                <Route path="/article/:id" exact component={Article} />
                <Route path="/article/commentList/:id" component={CommentList} />
                <Route path="/news" exact component={News} />
                <Route path="/newsSearch/:searchStr" component={NewsSearchList} />
                <Route path="/message" component={Message} />
                <Route path="/addressList" component={AddressList} />
                <Route path="/work" component={Work} />
                <Route path="/workList" component={WorkList} />
                <Route path="/mine" component={Mine} />
                <Route path="/account" component={Account} />
                <Route path="/about" component={About} />
                <Route path="/contact" component={Contact} />
                <Route path="/changePsw" component={ChangePsw} />
                <Route path="/velcroViewer" component={VelcroViewer} />
            </div>
        </Router>


    }
}

export default VelcroMobile;