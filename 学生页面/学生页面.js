function addLoadEvent(func){//确保html文件加载完后再加载js脚本
    var oldload = window.onload;
    if(typeof window.onload !='function'){
        window.onload = func;
    }
    else{
        window.onload = function(){
            oldload();
            func();
            
        }
    }
}
/*
***函数功能：页面加载脚本，获取当前url传递的参数（学号），将对应学号的数据从数据库读取并显示
***输入：页面加载
***输出：该参数对应的成绩数据并以表格显示，对应的学分绩
 */
function load(){
    var url = document.location.toString();
    var arrUrl = url.split("?");
    var para = arrUrl[1];
    var allSum = 0;
    var pointSum = 0;
    var gridbody = document.getElementsByClassName('gridbody')[0];
    for(let key in localStorage){
        var keyArr = key.split('+');
        if(keyArr[0]!==para) continue;
        var value = localStorage.getItem(key);
        value = JSON.parse(value);
        allSum+=parseInt(value.score)*parseInt(value.points);
        pointSum+=parseInt(value.points);
        var tr = document.createElement('tr');
        tr.setAttribute('class','form-control');
        gridbody.appendChild(tr);
        for(let item in value){
            var td = document.createElement('td');
            td.innerHTML = value[item];
            tr.appendChild(td);
        }
    }
    var toolBar = document.getElementsByClassName('toolbar_bar')[0];
    var strong = document.createElement('strong');
    toolBar.appendChild(strong);
    strong.innerHTML = allSum/pointSum;

}
addLoadEvent(load);

/*
***函数功能：绑定学年学期按钮的点击事件，获取点击按钮的内容（学年学期），并将学年学期对应成绩输出
***输入：按钮点击
***输出：该学年学期的所有数据
 */
function listByYear(){
    var menu = document.getElementById('menu');
    var button = menu.getElementsByTagName('button');
    for(let i = 0 ; i < button.length ; i++ ){
        button[i].onclick = function(){
            var gridbody = document.getElementsByClassName('gridbody')[0];
            while(gridbody.hasChildNodes()){
                gridbody.removeChild(gridbody.firstChild);
            }
            var year = this.innerHTML;
            for(let key in localStorage){
                var value = localStorage.getItem(key);
                value = JSON.parse(value);
                if(value.date===year){
                    var tr = document.createElement('tr');
                    tr.setAttribute('class','form-control');
                    gridbody.appendChild(tr);
                    for(let info in value){
                        var td = document.createElement('td');
                        td.innerHTML = value[info];
                        tr.appendChild(td);

                    }
                }
            }
        }
    }
}
addLoadEvent(listByYear);