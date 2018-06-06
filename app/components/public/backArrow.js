import React from 'react';
import ReactDOM from 'react-dom';
import Native from './../../plusHandle'
import Hammer from 'react-hammerjs'

class BackArrow extends React.Component {
    constructor(props){
        super(props);
    }
    handleBack(){
        Native.closeThisWindow()
    }
    render() {
        return <Hammer onTap={()=>this.handleBack()}>
            <div className="backArrow">
                <img src="icons/backArrow.png"/>
            </div>
        </Hammer>

    }
}

export default BackArrow;