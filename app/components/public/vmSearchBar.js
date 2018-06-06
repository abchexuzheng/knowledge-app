import React from 'react';
import ReactDom from 'react-dom';
import { Icon,Button,List } from 'antd-mobile';
import Native from './../../plusHandle'
import './style'


class VmSearchBar extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        return <div className="vm-search-bar-container-div">
            <div className={"vm-search-bar-div "+this.props.className}>
                <img className="vm-search-bar-icon" src="./icons/searchIcon.png" />
                <input
                    {...this.props}
                    onTouchStart={()=>console.log("touchStart")}
                    onTouchEnd={()=>console.log("touchEnd")}
                    className="vm-search-bar needsclick"
                />
            </div>
        </div>
    }
}

export default VmSearchBar;