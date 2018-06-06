import mui from './mui'


class plusHandle{
    constructor(){
        if(window.plus){
            this.plusReady();
        }else{
            document.addEventListener('plusready', this.plusReady, false);
        }

    }
    plusReady(){
        this.isPlus=true;
    }
    openWindow(href,id,style,animate){
        let that=this;
        //if(that.isPlus){
            plus.webview.open(href,id,style,animate);
        //}else{
        //    window.open(href);
        //}
    }
    closeThisWindow(){
        //if(this.isPlus){
            let thisWebview=plus.webview.currentWebview();
            plus.webview.close(thisWebview)
        //}else{
        //    window.close()
        //}
    }
    cancelBackBtn(){
        mui.init({
            keyEventBind: {
                backbutton: false  //关闭back按键监听
            }
        });
    }
    createLocalPushMsg() {
        var options = {cover: false};
        var str = "";
        str += ": 欢迎使用Html5 Plus创建本地消息！";
        plus.push.createMessage(str, '{"url":"http://www.baidu.com"}', options);
        //outSet("创建本地消息成功！");
        //outLine("请到系统消息中心查看！");
        if (plus.os.name == "iOS") {
            //outLine('*如果无法创建消息，请到"设置"->"通知"中配置应用在通知中心显示!');
        }
    }
    addPushListener(){
        let that=this;
        let message = document.getElementById("message");
        // 监听点击消息事件
        plus.push.addEventListener( "click", function( msg ) {
            // 判断是从本地创建还是离线推送的消息
            //alert("点击消息事件"+msg.content);
            //alert("点击消息事件"+msg.payload)
            that.handlePushMsg(msg)
        }, false );
        // 监听在线消息事件
        plus.push.addEventListener( "receive", function( msg ) {
            //alert("在线消息事件"+msg.content);
            //alert("在线消息事件"+msg.payload);
            //console.log(plus.os.name);
            if(plus.os.name!=="iOS"){
                that.handlePushMsg(msg)
            }
        }, false );
    }
    handlePushMsg(msg){
        let url=JSON.parse(msg.payload).url;
        that.openWindow(`index.html#velcroViewer?address=${url}`,'','','slide-in-right');
    }
}

let Native=new plusHandle();
export default Native;