//main.js
//import "babel-polyfill";
import 'idempotent-babel-polyfill';
import "fetch-polyfill";
import React from 'react';
import ReactDom from 'react-dom';
import VelcroMobile from './routers/'
import './style'
//import initReactFastclick from 'react-fastclick';
import FastClick from './modules/fastclick'

FastClick.attach(document.body);


//initReactFastclick();

var velcroMobileDom=document.getElementsByClassName("velcroMobile");



var render=function(dom,options){
    for(var i=0;i<velcroMobileDom.length;i++){
        ReactDom.render(
            <VelcroMobile/>,
            velcroMobileDom[i]
        );
    }
};
render();


window.velcroMobile={
    render:render
};