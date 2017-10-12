<template>
    <div class="zhuce">
        <div class="zhuce-zhuce">
            <div class="zhuce-left">
                <div class="zhuce-box">
                    <div class="zhuce-l">
                        <input type="text" placeholder="请输入手机号码" style="width:281px;height:37px;font-size: 18px" v-model='phoneNum' v-on:blur='checkPhone' v-on:focus='error1=""'>
                        <span>{{error1}}</span>
                    </div>
                    <div class="zhuce-l">
                        <input type="text" placeholder="请输入验证码" style="width:172px;height:37px;font-size: 18px" v-model='imgCode' v-on:focus='error2=""'>    
                        <img :src='imgCodeUrl' alt='图片验证码' @click='imgCodeUrl = getImgCodeUrl(imgCodeUrl)'>
                        <span>{{error2}}</span>
                    </div>
                    <div class="zhuce-l">
                        <input type="text" placeholder="请输入短信验证码" style="width:172px;height:37px;font-size: 18px" v-model='validCode' @focus='error3=""'>
                        <button :class="judgeclass?'getCode':'throw'" v-on:click='getMsg'>{{getnum}}</button>
                        		<!--判断是点击前还是点击后的样式        ↑        触发获取验证码的点击事件↑    动态内容-->     
                        <span>{{error3}}</span>
                    </div>
                    <div class="zhuce-l">
                        <Distpicker province='江苏省' @area="cc"></Distpicker> 
                        <span>{{error4}}</span> 
                    </div>
                    <div class="zhuce-l">
                        <input type="text" placeholder="请设置密码" style="width:281px;height:37px;font-size: 18px;" v-model='passWord'>
                        <span>{{error5}}</span> 
                    </div>
                    <div class="zhuce-l">
                        <button type="submit" class='goRegister' @click='goRegister'>立即注册</button>
                    </div>
                    <p>注册即同意遵守<strong>《服务协议》</strong></p>
                </div>
            </div>
            <div class="denglu-center"></div>
            <div class="zhuce-right">
                <p class="p1">已有账号？</p>
                <a class="p2" href='/validate'>立即登陆>></a>
                <img src="../assets/login/man.jpg">
            </div>
        </div>
        <p class="zhuce-footer">Copyright 2016 北京信达科技有限公司 京ICP备 16011621号</p>
    </div>
</template>
<script>
    import {mapGetters,mapActions} from 'vuex'
    import Distpicker from 'v-distpicker'
    import qs from 'qs'
    import ajax from 'axios';
    export default{
        data(){
            return {
                phoneNum:"",
                imgCode:'',//图片验证码
                validCode:'',//短信验证码
                validCode_g:'',//动态生成的验证码
                error1:"",//手机号码验证错误信息
                error2:"",//验证码验证信息
                error3:"",//短信密码验证信息
                error4:"",//选择城市提示信息
                error5:"",//注册密码
                tips:"",//短信状态提示信息
                imgCodeUrl:"/xinda-api/ajaxAuthcode",
                passWord:'',//用户密码
                regionId:'',//所属地区id
                num:60,//倒计时
                getnum:"点击获取",//获取验证码按钮的文字动态内容
                judge:true,//判断获取验证码按钮是否点击
                judgeclass:true,//判断是点击前还是点击后的样式
                myAccount:'C55015489',
                myPassword:'40eb0235a85502465c34cf42c6b2bc58',
            }

        },
        created(){
            this.setIllogin(false)
            this.setTips("欢迎注册")

        },
        methods:{
            cc(value){
                this.regionId = Distpicker.methods.getAreaCode(value)
            },
            ...mapActions(['setIllogin','setTips']),
            checkPhone(){
                if(this.phoneNum==''){
                    this.error1 = '手机号码不能为空'
                    return false
                }else if(!/^1[34578]\d{9}$/.test(this.phoneNum)){
                    this.error1 = '手机号码不正确'
                    return false
               }else{
                    return true
               }
            },
            checkImfCode(){//检查验证码
                if(this.imgCode==''){
                    this.error2 = '图片验证码不能为空'
                    return false
                }else{
                    return true
                }
            },
            checkPw(){//检查密码输入
                if(this.passWord==''){
                    this.error5 = '密码不能为空'
                    return false
                }else {
                    return true
                }
            },
            checkMsgCode(){//检查短信验证码
                if(this.validCode==''){
                    this.error3 = '请输入短信验证码'
                    return false;
                }else if(this.validCode==this.validCode_g){
                    return true;
                }else {
                    this.error3 = '短信验证码错误，请重新获取';
                    // this.validCode_g = '';
                    return false;
                }
            },
            genrateCode(len){
                var arr = [];
                for(var i = 0;i<len;i++){
                    var n = Math.floor(Math.random()*9);
                    arr.push(n);
                }
                return this.validCode_g = arr.join('')
            },
            getMsg(){//点击获取短信验证码
            	if (this.judge == true) {
	                if(this.checkPhone()){//判断手机号码是否符合规则
	                    if(this.imgCode==''){
	                        this.error2 = '验证码不能为空';
	                    }else{//获取短信验证码
                            var url = `http://106.ihuyi.com/webservice/sms.php?method=Submit&account=${this.myAccount}&password=${this.myPassword}&mobile=${this.phoneNum}&content=您的验证码是：${this.genrateCode(4)}。请不要把验证码泄露给其他人。&format=json`;
                            this.ajax.get('https://bird.ioliu.cn/v1/?url='+url).then(res=>{
                                if(res.data.code===2){//成功
                                        this.judgeclass = false;
                                        var that = this;
                                        this.getnum = this.num + "s 后重新获取";
                                        var timer = setInterval(function(){
                                            if(that.num-- == 0){
                                                that.getnum = "点击获取";
                                                that.judgeclass = true;
                                                that.validCode_g = '';//验证码无效
                                                clearInterval(timer)
                                                return
                                            }else {
                                                that.getnum = that.num-- + "s 后重新获取";
                                            }
                                        },1000)  
                                }

                            })
	                    }
	                }
            	}
            }
            ,
            checkArea(){//检查是否选择城市
                if(this.regionId==''){
                    this.error4 = '请选择区域'
                    return false
                }else {
                    return true
                }
            },
            goRegister(){//注册
                if(this.checkPhone()&&this.checkImfCode()&&this.checkMsgCode()&&this.checkArea()&&this.checkPw()){
                    console.log('验证完成')
                    // this.ajax.post('/xinda-api/register/register',qs.stringify({
                    //     cellphone:this.phoneNum,                   
                    //     smsType:1,                 
                    //     validCode:this.validCode,
                    //     password:this.passWord,
                    //     regionId:this.regionId
                    // })).then(res=>{
                    //     console.log(res)
                    //     if(res.data.status==1){
                    //         //跳到登陆页面
                    //         this.$router.push({path:"/validate"})
                    //     }
                    // },err=>{
                    //     console.log(err)
                    // })
                }
            }
        },
        computed:{
            ...mapGetters(['validatePic'])
        },
        components:{
            Distpicker
        }
        
    }
</script>
<style lang='less'>
* {
    margin: 0;
    padding: 0;
    border: 0;
}

.zhuce {
    width: 100%;
    height: 653px;
    background-color: #f5f5f5;
    padding-top: 52px;
}

.zhuce-zhuce {
    width: 1200px;
    height: 435px;
    background-color: #fff;
    margin: 0 auto;
}

.zhuce-left {
    width: 587px;
    height: 382px;
    position: relative;
    float: left;
}

.zhuce-left img {
    height: 35px;
    position: absolute;
    top: 2px;
    left: 182px;
}

.zhuce-box {
    position: absolute;
    top: 53px;
    left: 147px;
}

.zhuce-box p {
    width: 281px;
    text-align: center;
    margin-top: 10px;
    font-size: 14px;
}

.zhuce-box p strong {
    color: #409cd7;
}
.zhuce-l {
    width: 288px;
    position: relative;
}
.zhuce-l input {
    border: 1px solid #cecece;
    margin-bottom: 19px;
    border-radius: 3px;
    color: #cecece;
    box-sizing: border-box;
    padding-left: 10px;
}
.getCode {
    width:98px;
    height:37px;
    color:#2693d4;
    border:1px solid #2693d4;
    font-size: 14px;
    margin-left: 5px;
    background: #fff;
    border-radius: 4px;
    outline:none;
    cursor: pointer;
}
.throw {
	width:98px;
    height:37px;
    color:#cecece;
    border:1px solid #cecece;
    font-size: 14px;
    margin-left: 5px;
    background: #fff;
    border-radius: 4px;
    outline:none;
}
.zhuce-l span {
    width: 100%;
    height: 37px;
    line-height: 37px;
    position: absolute;
    left: 286px;
    top:0;
    color: #2693d4;
    font-size: 14px;
}

.zhuce-l .address select {
    width: 80px;
    height: 35px;
    padding:0 0 0 5px;
    margin-bottom: 19px;
    border-radius: 3px;
    border: 1px solid #cecece;
    font-size: 18px;
    &:first-child{
        margin-right: 16px;
    };
    &:last-child{
        margin-left: 16px;
    };
}
.goRegister{
    width: 281px;
    height: 37px;
    border: 1px solid #2693d4;
    color: #2693d4;
    background-color: #fff;
    border-radius: 3px;
    font-size: 18px;
    cursor: pointer;
}

.denglu-center {
    float: left;
    height: 260px;
    border-right: 1px solid #dadada;
    margin: 82px auto;
}

.zhuce-right {
    float: left;
    img{
        display: block;
        margin-left: 187px ;
        margin-top: 19px;
    }
}

.zhuce-right .p1 {
    margin-top: 43px;
    margin-left: 188px;
    font-size: 18px;
}

.zhuce-right .p2 {
    margin-top: 23px;
    margin-left: 188px;
    color: #2693d4;
    font-size: 18px;
}

.zhuce-right img {
    margin-top: 19px;
    margin-left: 188px;
}
.zhuce-footer {
    width: 440px;
    height: 12px;
    margin: 0 auto;
    margin-top: 118px;
    font-size: 14px;
    color: #000;
    font-family:"微软雅黑";
}
</style>
