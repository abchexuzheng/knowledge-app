import React from 'react';
import ReactDOM from 'react-dom';

class ImgViewer extends React.Component {
    constructor(props){
        super(props);
        this.state={
            mounted:false,
            loaded:false
        }
    }
    componentDidMount(){
        this.setState({
            mounted:true
        })
    }
    imgLoaded(){
        let height=this.viewer.clientHeight;
        let width=this.viewer.clientWidth;
        let imgHeight=this.img.offsetHeight;
        let imgWidth=this.img.offsetWidth;
        if(height>imgHeight){
            this.extendMode="vertical"
        }
        this.setState({loaded:true})
    }
    render() {
        return <div
            className="vm-img-viewer"
            ref={el => this.viewer = el}
            style={this.props.style}
        >
            {
                this.state.mounted?<img
                    style={
                        {
                            visibility:this.state.loaded?"initial":"hidden",
                            width:this.extendMode=="vertical"?"auto":"100%",
                            height:this.extendMode=="vertical"?"100%":"auto"
                        }
                    }
                    src={this.props.src}
                    ref={el => this.img = el}
                    onLoad={()=>this.imgLoaded()}
                />:null
            }
            {
                !this.state.loaded?<div className="vm-img-loading">图片加载中…</div>:null
            }
        </div>
    }
}

export default ImgViewer;