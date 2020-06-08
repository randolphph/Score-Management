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
***函数功能：为登陆按钮绑定点击动作，点击登陆按钮时读取用户框和密码框的值，根据用户账号密码选择跳转网页或报错
***输入：按钮点击动作
***输出：页面跳转/错误信息
 */
function login(){
    var loginButton = document.getElementById('login');
    loginButton.onclick = function(){
        var username = document.getElementsByClassName('form-control')[0].value;//获取用户框的值（用户名）
        var password = document.getElementsByClassName('form-control')[1].value;//获取密码框的值 （密码）
        if(username.length>11 || username.length < 10){
            alert("用户账号格式错误");
            return false;
        }
        if(username.length===10 && username.charAt(0)==='t'){  //老师账号必须10位且以t开头
            for(let key in localStorage){
            if(key===username){
                if(password===localStorage[key]){
                    window.location.assign('../教师/教师页面.html');
                }
                else{
                    alert('密码错了');
                }
                return false;
            }

        }
        }
        else if(username.length===11 && username.charAt(0)==='s'){  //学生的账号必须11位且以s开头
            for(let key in localStorage){
                if(key===username){
                    if(password===localStorage[key]){
                        var userArr = username.split('');
                        userArr.shift();
                        var newUser = userArr.join('');
                        window.location.assign('../学生页面/学生页面.html?'+newUser); //跳转到学生页面时传递学生学号信息
                    }
                    else{
                        alert('密码错了');
                    }
                    return false;
                }
            }
        }
        alert("账号貌似不存在");
       
    }
}
addLoadEvent(login);

/*
***函数功能：为注册按钮绑定点击动作，读取账号框和密码框的值，根据账号密码报错或在数据库中注册信息
***输入：按钮点击
***输出：报错信息/信息注册
*/
function signin(){
    var signinButton = document.getElementById('signin');
    signinButton.onclick = function(){
        var username = document.getElementsByClassName('form-control')[0].value;
        var password = document.getElementsByClassName('form-control')[1].value;
        if(username.length===10 && username.charAt(0)==='t'){  //老师账号必须10位且以t开头
           localStorage.setItem(username,password);
           alert('教师账号创建成功！ 注意：重复创建会覆盖原有账号');
        }
        else if(username.length===11 && username.charAt(0)==='s'){  //学生的账号必须11位且以2开头
            localStorage.setItem(username,password);
            alert('学生账号创建成功！ 注意：重复创建会覆盖原有账号');
        }
        else{
            alert('用户账号输入错误');
        }

    }
}
addLoadEvent(signin);