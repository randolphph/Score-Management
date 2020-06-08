//确保网页先加载html文档后加载js脚本
function addLoadEvent(func){
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
***函数功能：绑定添加学生数据的确定按钮点击事件，读取输入框信息并存入数据库
***输入：按钮点击
***输出：数据库添加数据
*/
function addStudentData(){
    var insertbutton =  document.getElementById('change2');
    insertbutton.onclick = function(){                              //点击提交按钮运行

        var value = {};
        var form = document.getElementById('insertdata').getElementsByClassName('form');
        
        for(let i = 0 ; i < form.length ; i++){
            value[form[i].name]=form[i].value;
        }
        localStorage.setItem(""+form[0].value+"+"+form[3].value,JSON.stringify(value)); //以学号+课程号作为key
        alert('添加成功');
        return false;
    };

}
addLoadEvent(addStudentData);


/*
***函数功能：为成绩查询按钮绑定点击事件，根据输入框学号查询学生成绩并显示
***输入：按钮点击
***输出：对应学生成绩
*/
function search(){
    var search = document.getElementById('search');
    search.onclick = function(){
        var gridbody = document.getElementsByClassName('gridbody')[0];
        while(gridbody.hasChildNodes()){
            gridbody.removeChild(gridbody.firstChild);                 //在搜索前清楚所有表格数据
        }
        var searchNum = document.getElementById('searchNum').value;
        for(let key in localStorage){
            if(key.split("+")[0]!==searchNum)continue;
            var data = new Array();
            var information = localStorage.getItem(key);           //从localstorage读取数据
            information = JSON.parse(information);
            for(let items in information){
                data.push(information[items]);
            }
        var gridbody = document.getElementsByClassName('gridbody')[0];
        var formControl = document.createElement('tr');
        formControl.setAttribute('class','form-control');
        gridbody.appendChild(formControl);
        for(let i = 0 ; i < 8 ; i++){
            let newtd = document.createElement('td');
            newtd.innerHTML = data[i];
            formControl.appendChild(newtd);
        }

      
    }
    return false;

    }

}
addLoadEvent(search);


/*
***函数功能：为成绩修改按钮绑定点击事件，
***输入：按钮点击
***输出：数据库数据修改
*/
function changeStudentData(){
    var changeButton = document.getElementById('change1');
    changeButton.onclick = function(){
        var gridbody = document.getElementsByClassName('gridbody')[0];
        while(gridbody.hasChildNodes()){
            gridbody.removeChild(gridbody.firstChild);                 //在搜索前清楚所有表格数据
        }
        var form = document.getElementById('change-data');
        form = form.getElementsByClassName('form');
        var userNum = form[0].value;
        var number = form[1].value;
        var  score = form[2].value;
        for(let key in localStorage){
            var keyArr = key.split('+');
            if(keyArr[0]!==userNum || keyArr[1]!==number)continue;
            var value = localStorage.getItem(key);
            value = JSON.parse(value);
            value.score=score;
            localStorage.removeItem(key);
            localStorage.setItem(key,JSON.stringify(value));
        }
        return false;
        
    }
}
addLoadEvent(changeStudentData);

/*
***函数功能：为所有输入框绑定焦点丧失事件，输入框输入后判断输入数据是否格式错误
***输入：输入框焦点丧失
***输出：错误信息
*/
function checkData(){
    var changeData = document.getElementById('change-data');
    var form = changeData.getElementsByClassName('form');
    form[0].onblur = function(){
        if(this.value.length===0)return false;   //当输入框没有数据时不提示错误
        if(this.value.length!==10){        //学号必须为10位
            alert('学号格式错误');
        }
        return false;
    }
    form[1].onblur = function(){
        if(this.value.length===0)return false;
        if(this.value.length!==3){ //课程号必须为3位
            alert('课程号格式错误');
        }
        return false;
    }
    form[2].onblur = function(){
        if(this.value.length===0)return false;
        if(this.value.length>3){ //成绩不超过3位
            alert('成绩格式错误');
        }
        return false;
    }
    var insertData = document.getElementById('insertdata');
    var form1 = insertData.getElementsByClassName('form');
    form1[0].onblur = function(){
        if(this.value.length===0)return false;
        if(this.value.length!==10){ 
            alert('学号格式错误');
        }
        return false;
    }
    form1[1].onblur = function(){
        
        return false;
    }
    form1[2].onblur = function(){
        if(this.value.length===0)return false;
        if(this.value.length!==5){  //学年学期必须大于8位
            alert('学年学期格式错误');
        }
        return false;
    }
    form1[3].onblur = function(){
        if(this.value.length===0)return false;
        if(this.value.length!==3){ //课程号必须为3位
            alert('课程号格式错误');
        }
        return false;
    }
    form1[4].onblur = function(){
        return false;
        
    }
    form1[5].onblur = function(){
        if(this.value.length===0)return false;
        if(this.value.length>3){  //成绩不超过3位
            alert('成绩格式错误');
        }
        return false;
    }
    form1[6].onblur = function(){
        if(this.value.length===0)return false;
        if(this.value.length>8){  //学分不超过8位
            alert('学分格式错误');
        }
        return false;
    }
    form1[7].onblur = function(){
        if(this.value.length===0)return false;
        if(this.value.length>3){  //排名不超过3位
            alert('排名格式错误');
        }
        return false;
    }


}
addLoadEvent(checkData);



