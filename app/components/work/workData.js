import $ from 'jquery'

class WorkData {
    constructor(modules){
        this.modules=modules;
    }
    getWorkData(recall){
        let that=this;
        $.ajax({
            url:window.ipAddress+'/ServiceAction/com.velcro.km.app.common.DataBaseAction?action=listMenus',
            type:'get',
            dataType:'json',
            success:function(data){
                let workIdList=JSON.parse(localStorage.getItem("workIdList"));
                if(!workIdList){
                    workIdList=data.defaults;
                    localStorage.setItem("workIdList",JSON.stringify(workIdList));
                }
                that.modules=that.initModules(data.modules);
                let workData={
                    ids:workIdList,
                    modules:that.modules,
                    workList:that.getWorkItemList(workIdList)
                }
                recall(workData);
            },
            error:function(data){
                console.log(data)
            }
        })
    }
    initModules(modules){
        for(let list of modules){
            for(let item of list.menus){
                item.icon=ipAddress+item.icon;
                item.link=`index.html#/velcroViewer?address=${ipAddress+(item.link!="#"?item.link:"")}`;
            }
        }
        return modules
    }
    getWorkItemList(workIdList){
        let itemList=[];
        for(let id of workIdList){
            let item=this.getItemById(id);
            if(item){
                itemList.push(item);
            }
        }
        return itemList;
    }
    getItemById(id){
        let modules=this.modules;
        for(let list of modules){
            for(let item of list.menus){
                if(item.id===id){
                    return item;
                }
            }
        }
    }
}


export default WorkData