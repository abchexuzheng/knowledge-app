import React from 'react';
import ReactDom from 'react-dom';
import { NavBar, Icon,Button,TabBar,Carousel } from 'antd-mobile';
import Native from './../../plusHandle'
import Hammer from 'react-hammerjs'
import ImgViewer from './../public/imgViewer'

class NewsCarousel extends React.Component {
    constructor(props) {
        super(props);
    }
    handleClick(id){
        Native.openWindow(`index.html#/article/${id}`,'','','slide-in-right')
    }
    handleScroll(e){
        e.stopPropagation()
    }
    render(){
        let that=this;
        return this.props.data.length>0?<Carousel
            autoplay={true}
            autoplayInterval={500000}
            infinite
            style={{width:'100%',height:'11.69rem'}}
            selectedIndex={0}
        >
            {this.props.data.map(val => (
                <Hammer
                    onTap={()=>that.handleClick(val.id)}
                >
                    <a
                        key={val.id}
                        style={{ display: 'inline-block', width: '100%', height: '11.69rem' }}

                    >
                        <ImgViewer
                            src={window.ipAddress+val.imgs[0]}
                            alt=""
                            style={{ width: '100%', verticalAlign: 'top',height:'100%' }}
                            onLoad={() => {
                              // fire window resize event to change height
                              window.dispatchEvent(new Event('resize'));
                              //this.setState({ imgHeight: '100%' });
                            }}
                        />
                    </a>
                </Hammer>
            ))}
        </Carousel>:null
    }
}

export default NewsCarousel;