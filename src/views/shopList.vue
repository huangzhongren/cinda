<template>
  <div class="shopList">
    <div class="container">
      <div class="nav">
        <div class="title">首页/公司工商</div>
        <ul class="gongshang-nav">
          <li class="server">
            <p class="f-left">服务区域</p>
            <form class="f-left">
              <select @blur = "getArea(0)">
                <option>省</option>
              </select>
              <select @blur = "getArea(1)">
                <option>市</option>
              </select>
              <select @blur = "getArea(2)">
                <option>区</option>
              </select>
            </form>
          </li>
          <li class="type">
            <p class="f-left">产品类型</p>
            <ul class="f-left" @click="chooseTab()">
              <li class="active">所有</li>
              <li>专利申请</li>
              <li>版权保护</li>
              <li>商标注册</li>
              <li>代理记账</li>
              <li>公司注册</li>
              <li>企业社保</li>
              <li>公司变更</li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="content">
        <ul class="sort">
          <li @click="sortNormal" class="active">综合排序</li>
          <li @click="sortJudge">好评<i></i></li>
          <li @click="sortSell">接单数<i></i></li>
        </ul>
        <ul class="list clear">
          <li class="clear" v-for="(list,index) in shopList">
            <div class="logo">
              <div>
                <img :src="'http://115.182.107.203:8088/xinda/pic'+list.providerImg" alt="店铺列表">
              </div>
              <p><i></i>金牌服务商</p>
            </div>
            <div class="shop-info">
              <p>{{list.providerName}}</p>
              <p>信誉<i></i><i></i><i></i><i></i><i></i><i></i></p>
              <p class="area">{{list.regionName}}</p>
              <p v-if="list.totalJudge == 0">
                累计服务客户次数：{{list.totalJudge}}
                                <span>|</span>
                好评率：{{100}}%
                            </p>
              <p v-else>
                累计服务客户次数：{{list.totalJudge}}
                                <span>|</span>
                好评率：{{list.goodJudge / list.totalJudge * 100}}%
                            </p>

              <ul class="things">
                <li class="active" v-for="(item,inx) in list.productTypes.split(',')">{{item}}</li>
              </ul>
              <router-link :to='"shopIndex/"+list.id'>
                <button type="button">进入店铺</button>
              </router-link>
            </div>
          </li>
        </ul>
      </div>
      <div class="changePage">
        <div>
          <button class="prePage">上一页</button>
          <ul>
            <li v-for="(list,index) in pageSize" v-text="index+1"></li>
          </ul>
          <button class="nextPage">下一页</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ajax from 'axios'

  export default{
    data(){
      return {
        shopList: '',//店鋪列表
        productTypes: [],
        pageSize: '',
        judge: true,
        sell: true
      }
    },
    created(){
      this.getAjax();
    },
    methods: {
      getAjax: function () {
        ajax.post('/xinda-api/provider/grid',{
            start: 0,
            limit: 6,
            productTypeCode: 10,
            judge: true,
            sell: true,
        }).then(res => {
            console.log(res)
          this.shopList = res.data.data;
          this.pageSize = res.data.pageSize;
        })
      },
      sort: function (cc, x) {
        var ev = ev || window.event;
        var el = event.currentTarget;
        var target = ev.target || ev.srcElement;
        var objSib = this.siblings(target);
        if (target.nodeName.toLowerCase() == "li") {
          target.className = "active";
          for (var i = 0; i < objSib.length; i++) {
            objSib[i].className = "";
          }
        }
        if (x == 0) {
          this.getAjax();
        } else {
          let goodJudge = [];
          let totalJudge = [];
          if (this.judge) {
            for (let i = 0; i < this.shopList.length; i++) {
              goodJudge.push(this.shopList[i].goodJudge);
              totalJudge.push(this.shopList[i].totalJudge);
              for (let j = 0; j < goodJudge.length - i; j++) {
                if (this.shopList[j][cc] < this.shopList[j + 1][cc]) {
                  let a = this.shopList[j];
                  this.shopList[j] = this.shopList[j + 1];
                  this.shopList[j + 1] = a;
                }
              }
            }
            this.judge = false;
          } else {
            for (let i = 0; i < this.shopList.length; i++) {
              goodJudge.push(this.shopList[i].goodJudge);
              totalJudge.push(this.shopList[i].totalJudge);
              for (let j = 0; j < goodJudge.length - i; j++) {
                if (this.shopList[j][cc] > this.shopList[j + 1][cc]) {
                  let a = this.shopList[j];
                  this.shopList[j] = this.shopList[j + 1];
                  this.shopList[j + 1] = a;
                }
              }
            }
            this.judge = true;
          }
          var tempList = this.shopList;
          this.shopList = [];
          this.shopList = tempList;
        }
      },
      sortJudge: function () {
        this.sort("goodJudge")
      },
      sortSell: function () {
        this.sort("totalJudge")
      },
      sortNormal: function () {
        this.sort("", 0)
      },
//      事件委托 切换产品类型
      chooseTab: function () {
        var ev = ev || window.event;
        var el = event.currentTarget;
//        当前点击事件
        var target = ev.target || ev.srcElement;
//        当前点击事件的兄弟元素
        var objSib = this.siblings(target);
        if (target.nodeName.toLowerCase() == "li") {
          target.className = "active";
          var targetTxt = target.innerText;
          var li = document.getElementsByClassName("list")[0].getElementsByClassName("active");
//          如果选择所有 则显示所有列表
          if (targetTxt == "所有") {
            var list = document.getElementsByClassName("list")[0].getElementsByClassName("clear");
            for (var i = 0; i < list.length; i++) {
              list[i].style.display = 'block';
            }
//            否则进行筛选
          } else {
            for (var i = 0; i < li.length; i++) {
              if (li[i].innerText == targetTxt) {
                var parentNode = li[i].parentNode.parentNode.parentNode;
                parentNode.style.display = 'block';
                var sib = this.siblings(parentNode);
                for (var z = 0; z < sib.length; z++) {
                  sib[z].style.display = 'none';
                }
              }
            }
          }
//        给点击的元素 增加选中样式
          for (var i = 0; i < objSib.length; i++) {
            objSib[i].className = "";
          }
        }
      }
      ,
//      获得区域
      getArea: function (idx){
        var ev = ev || window.event;
        var el = event.currentTarget;
//        当前点击事件
        var target = ev.target || ev.srcElement;
        var option = target.value;
        var areaTxt = document.getElementsByClassName("area");
        for (var i = 0; i < areaTxt.length ; i++) {
            if(areaTxt[i].innerText.split("-")[idx]!=option){
              areaTxt[i].parentNode.parentNode.style.display = "none";
            }else {
              areaTxt[i].parentNode.parentNode.style.display = "block";
            }
        }
      },
      siblings: function (elm) {
        var a = [];
        //找到父元素的所有的子元素
        var p = elm.parentNode.children;
        for (var i = 0, pl = p.length; i < pl; i++) {
          //移除当前元素
          if (p[i] !== elm) a.push(p[i]);
        }
        return a;
      }
      ,
    }
  }
</script>

<style lang="less" scoped>
  @server-h: 44px;
  @color-ccc: #ccc;
  @color-f7: #f7f7f7;
  @base-border: 1px solid @color-ccc;
  @border-radius: 4px;
  .shopList {
    .active {
      background: #2693d4;
      color: #fff;
    }
    padding: 26px 0;
    .nav {
      margin-bottom: 24px;
      .title {
        font-size: 12px;
        color: #060606;
        margin-bottom: 7px;
      }
      .gongshang-nav {
        p {
          width: 98px;
          height: 43px;
          border-right: @base-border;

        }
        & > li {
          width: 100%;
          height: @server-h;
          line-height: @server-h;
          background: @color-f7;
          border-top: @base-border;
          border-left: @base-border;
          border-right: @base-border;
          text-align: center;
          box-sizing: border-box;
        }
        .server {
          form {
            padding-left: 12px;
          }
          select {
            width: 88px;
            height: 22px;
            border: @base-border;
            border-radius: 1px;
            background: @color-f7;
          }
        }
        .type {
          border-bottom: @base-border;
          ul {
            padding-left: 12px;
          }
          li {
            height: 25px;
            line-height: 25px;
            display: inline-block;
            padding: 0 20px;
            border-radius: @border-radius;
          }
        }
      }
    }
    .content {
      .sort {
        width: 100%;
        height: @server-h;
        line-height: @server-h;
        background: @color-f7;
        border: @base-border;
        box-sizing: border-box;
        li {
          height: 43px;
          display: inline-block;
          text-align: center;
          width: 108px;
          i {
            background-image: url(../assets/shop/sort.png);
            width: 24px;
            height: 24px;
            margin-top: -4px;
          }
        }
      }
      .list {
        padding: 12px 14px;
        & > li {
          padding-top: 24px;
          padding-bottom: 24px;
          padding-left: 40px;
          padding-right: 60px;
          width: 570px;
          height: 272px;
          border: @base-border;
          float: left;
          margin-bottom: 12px;
          box-sizing: border-box;
          &:nth-child(2n-1) {
            margin-right: 30px;
          }
          div {
            float: left;
            &:nth-child(2n-1) {
              position: relative;
            }
          }
        }
        .logo {
          margin-right: 20px;
          height: 200px;
          width: 140px;
          div {
            width: 100%;
            top: 50px;
            text-align: center;
            left: 0;
          }
          h1 {
            display: inline-block;
            font-size: 30px;
            line-height: 56px;
            vertical-align: top;
          }
          img {
            height: 56px;
            width: 80%;
            margin-right: 13px;
          }
          p {
            width: 100%;
            position: absolute;
            bottom: 0;
            text-align: center;
          }
          i {
            background: url(../assets/shop/gold.png);
            height: 32px;
            width: 24px;
            margin-right: 13px;
          }
        }
        .shop-info {
          position: relative;
          height: 205px;
          span {
            margin: 0 20px;
          }
          p {
            &:nth-child(1) {
              margin-bottom: 15px;
            }
          }
          p {
            &:nth-child(4) {
              margin: 16px 0;
            }
          }
          .things {
            width: 305px;
            li {
              display: inline-block;
              padding: 0 5px;
              height: 22px;
              line-height: 22px;
              border-radius: @border-radius;
              margin-right: 5px;
              margin-bottom: 5px;
            }
          }
          button {
            width: 102px;
            height: 33px;
            background: #ff591b;
            border-radius: @border-radius;
            color: #fff;
            position: absolute;
            bottom: -10px;
          }
        }

      }
    }
  }

  .changePage {
    text-align: center;
    & > div {
      display: inline-block;
      margin-top: 62px;
      height: 34px;
    }
    button,
    ul,
    li {
      float: left;
      height: 34px;
    }
    button {
      height: 100%;
      width: 66px;
      border: @base-border;
      color: @color-ccc;
      background: #fff;
    }
    ul {
      margin: 0 6px;
      li {
        height: 34px;
        line-height: 34px;
        width: 38px;
        border: @base-border;
        color: @color-ccc;
        /*解决边框重合*/
        margin-right: -1px;
        &:first-child {
          .pageActive;
        }
      }
      .pageActive {
        border: 1px solid #2693d4 !important;
        color: #2693d4 !important;
        z-index: 2 !important;
        position: relative !important;
        background: #fff !important;
      }
    }
  }

  i {
    display: inline-block;
    background-position: 50%;
    background-repeat: no-repeat;
    vertical-align: middle;
  }
</style>
