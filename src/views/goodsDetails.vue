<template>
  <div class="goodsDetails container clear">
    <p class="now-page">首页/公司注册</p>
    <div class="goods-info clear">
      <img :src='"http://115.182.107.203:8088/xinda/pic/"+product.img' alt="产品信息" class="f-left">
      <div class="f-left">
        <h2>{{product.name}}</h2>
        <p class="info">{{product.info}}</p>
        <ul>
          <li class="price">
            <p>市场价：<span class="old-price">￥{{product.marketPrice}}</span></p>
            <p>价   格：<b class="new-price">￥ {{providerProduct.price}}</b>元</p>
          </li>
          <li>
            类   型：<span class="tags">{{product.info}}</span>
          </li>
          <li>
            地   区：  {{goodsDetails.regionText}}
          </li>
          <li>
            <span class="buy-txt">购买数量：</span>
            <div class="buy">
              <button class="subtract" @click="subtract">-</button>
              <input class="buyNum" value="1" min="0" @keyup="changeNum" @blur="changeNum">
              <button class="add" @click="add">+</button>
            </div>
          </li>

        </ul>
        <button type="button" class="buyNow btn" @click='buyNow'>立即购买</button>
        <button type="button" class="joinCar btn" @click='addCart'>加入购物车</button>
      </div>
      <div class="provider">
          <div>
              <h1>顶级服务商</h1>
              <p>北京信达服务中心</p>
              <button type='button' class='consult btn' @click='consult'>马上咨询</button>
          </div>
          <div>
              <button type='button' class='queryProvider btn' @click='queryProvider'>查看服务商</button>
          </div>
      </div>
    </div>
    <div class="banner">
      <img src="../assets/detail/detail-2.jpg" alt="banner">
    </div>
    <div class="content">
      <ul class="goodsDetails-nav" @click='changeNav'>
        <li class="active">服务内容</li>
        <li>商品评价</li>
      </ul>
      <div>

        <div class="goodsDetails-box tow-box" v-for="list in serviceList" v-html="list.serviceContent">
        </div>

        <div class="evaluate tow-box" v-show="false">
          <div class="evaluate_pj" style="">
            <div class="evaluate-bar">
              <div class="bar-left">
                <p class="f-left"><span ng-bind="goodRate | percentage" class="ng-binding">0%</span> 好评</p>
                <div class="pingJia">
                  <h3>
                    <span>好评(<em ng-bind="goodRate | percentage" class="ng-binding">0%</em>)</span>
                    <a><i id="good-bar" class="good speed"></i></a>
                  </h3>
                  <h3>
                    <span>中评(<em ng-bind="midRate | percentage" class="ng-binding">0%</em>)</span>
                    <a><i id="mid-bar" class="zhong speed"></i></a>
                  </h3>
                  <h3>
                    <span>差评(<em ng-bind="badRate | percentage" class="ng-binding">0%</em>)</span>
                    <a><i id="bad-bar" class="bad speed"></i></a>
                  </h3>
                </div>
              </div>
              <div class="bar-right">
                <p>客户印象</p>
                <h4 id="tag-static" style="display: none;">
                </h4>
                <h4 id="empty-tag" style="">
                  <p>暂无已添加的印象标签</p>
                </h4>
              </div>
            </div>
            <ul class="pingjia_all">
              <li ng-class="{'active':viewType==0}" ng-click="switchViewType(0)" class="active">
                <a href="javascript:void(0);">全部评价(<span ng-bind="judgeDetail.totalNum"
                                                         class="ng-binding">0</span>)<i></i></a>
              </li>
              <li ng-class="{'active':viewType==1}" ng-click="switchViewType(1)" class="">
                <a href="javascript:void(0);">好评(<span ng-bind="judgeDetail.goodNum"
                                                       class="ng-binding">0</span>)<i></i></a>
              </li>
              <li ng-class="{'active':viewType==2}" ng-click="switchViewType(2)" class="">
                <a href="javascript:void(0);">中评(<span ng-bind="judgeDetail.midNum"
                                                       class="ng-binding">0</span>)<i></i></a>
              </li>
              <li ng-class="{'active':viewType==3}" ng-click="switchViewType(3)" class="">
                <a href="javascript:void(0);">差评(<span ng-bind="judgeDetail.badNum"
                                                       class="ng-binding">0</span>)<i></i></a>
              </li>
            </ul>
            <div id="serviceJudgeGrid" class="init-grid" style="display: block;">
              <table id="content-list" class="table_pj" style="display: none;">
                <tbody>
                <tr class="first">
                  <th>评价</th>
                  <th>满意度</th>
                  <th>用户</th>
                </tr>
                </tbody>
              </table>
            </div>
            <div id="empty-result" class="table_pj" style="text-align: center; padding: 30px;">
              <p>暂无用户评价</p>
            </div>
            <div class="page-change change_detail ng-isolate-scope" jk-page-bar="serviceJudgeGrid"
                 style="display: none;">
              <a href="javascript:void(0);" class="one" aria-label="Previous" ng-click="barGrid.addPage(-1)"
                 ng-disabled="barGrid.grid.pageNum==1" disabled="disabled"> 上一页
		</a>
              <a href="javascript:void(0);" ng-bind="barGrid.grid.pageNum" class="active ng-binding">1</a>
              <a href="javascript:void(0);" aria-label="Next" ng-click="barGrid.addPage(1)"
                 ng-disabled="barGrid.grid.pageNum==barGrid.grid.pageSize">下一页
		</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ajax from 'axios'
import qs from 'qs'
import {mapActions} from 'vuex'
  export default{
    data(){
      return {
        goodsDetails: '',
        product: '',
        providerProduct: '',
        code: '',//当前产品id
        serviceList: '',

      }
    },
    created(){

      this.getAjax();
      
    },
    methods: {
        ...mapActions(['getCart']),
      getAjax: function () {
        this.code = this.$route.params.goodsId;
        console.log(this.code)
        //产品服务详情
        ajax.post('/xinda-api/product/package/detail',qs.stringify({
          sId:this.code
        })).then(res => {
          console.log(res.data.data)
          this.goodsDetails = res.data.data;
          this.product = this.goodsDetails.product;
          this.providerProduct = this.goodsDetails.providerProduct;
          this.serviceList = this.goodsDetails.serviceList;
        })
      },
      consult(){//马上咨询

      },
      addCart(){//加入购物车
        var num = Number(document.querySelector(".buyNum").value)
        this.ajax.post('/xinda-api/cart/add',this.qs.stringify({
            id:this.code,
            num:num
        })).then(res=>{
            console.log(res)
            this.getCart();
        })
      },
      queryProvider(){

      },
      buyNow(){//立即购买
        this.$router.push({path:"/cart"})
      },
      subtract: function () {
        var num = Number(document.querySelector(".buyNum").value);
        if (num > 0) {
          num--;
          document.querySelector(".buyNum").value = num;
        }
      },
      add: function () {
        var num = Number(document.querySelector(".buyNum").value);
        if (num >= 0) {
          num++;
          document.querySelector(".buyNum").value = num;
        }
      },
      changeNum: function () {
        document.querySelector(".buyNum").value = document.querySelector(".buyNum").value.replace(/\D/g, '')
      },
      changeNav: function () {
        var aLi = document.querySelectorAll(".goodsDetails-nav li");
        var ev = ev || window.event;
        var el = event.currentTarget;
        var target = ev.target || ev.srcElement;
        var objSib = this.siblings(target);
        if (target.nodeName.toLowerCase() == "li") {
          var index;
          for (var i = 0; i < aLi.length; i++) {
            if (aLi[i] === target) {
              index = i;
            }
            if (index >= 0) {
              target.className = "active";
              document.querySelectorAll(".tow-box")[index].style.display = 'block';
              this.siblings(document.querySelectorAll(".tow-box")[index])[0].style.display = 'none';
              // console.log(this.siblings(document.querySelectorAll(".tow-box")[index])[0])
              // console.log(document.querySelectorAll(".tow-box")[index])
              for (var i = 0; i < objSib.length; i++) {
                objSib[i].className = "";
              }

            }
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
      },
    }
  }
</script>
<style lang="less">
  .goodsDetails {
    .active {
      background: #2693d4;
      color: #fff;
    }
    .now-page {
      margin-top: 20px;
      margin-bottom: 15px;
    }
    .goods-info {

      margin-bottom: 22px;
      .btn {
        width: 95px;
        height: 27px;
        border-radius: 2px;
      }
      .buyNow {
        margin-left: 60px;
        background: #2693d4;
        color: #fff;
        margin-right: 12px;
      }
      .joinCar {
        border: 1px solid #2693d4;
        background: #fff;
        color: #2693d4;
      }
      li {
        margin-bottom: 20px;
        .old-price {
          text-decoration: line-through;
        }
        .new-price {
          color: #ff0000;
          font-size: 16px;
        }
        .tags {
          color: #2693d4;
          border: 1px solid #2693d4;
          padding: 5px;
        }
        .buy-txt {
          color: #ff6b00;
        }
        .buy {
          border: 1px solid #cccccc;
          height: 26px;
          display: inline-block;
          button {
            height: 100%;
            width: 30px;
            background: #f7f7f7;
          }
          .buyNum {
            display: inline-block;
            width: 48px;
            text-align: center;
          }
          .subtract {
            border-right: 1px solid #cccccc;
          }
          .add {
            border-left: 1px solid #cccccc;
          }
        }
      }
      .price {
        line-height: 30px;
        background: #f7f7f7;
        padding-left: 7px;
        padding-top: 10px;
        padding-bottom: 10px;
      }
      .info {
        margin-bottom: 18px;
      }
      h2 {
        font-weight: 800;
        font-size: 24px;
        margin-bottom: 22px;
      }
      img {
        width: 535px;
        height: 393px;
        margin-right: 30px;
      }
      .provider {
        width: 199px;
        border: 1px solid #2693d4;
        text-align: center;
        float: right;
        div:first-child {
            height: 158px;
        }
        div:last-child {
            height: 75px;
            line-height: 75px;
            background: #bddef2;
        }
        h1 {
            padding-top: 23px;
            font-size: 23px;
            font-weight: bold;
        }
        p {
            margin-top: 21px;
        }
        .consult {
            width: 90px;
            height: 30px;
            background: #fff;
            color: #2693d4;
            border: 1px solid #2693d4;
            margin-top: 23px;
            cursor: pointer;
        }
        .queryProvider {
            width: 110px;
            background: #2693d4;
            color: #c1daef;
            cursor: pointer;
        }
      }

    }
    .banner {
      width: 100%;
      height: 98px;
      margin-bottom: 38px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .goodsDetails-nav {
      height: 44px;
      border: 1px solid #cccccc;
      background: #f7f7f7;
      li {
        float: left;
        width: 135px;
        height: 43px;
        line-height: 43px;
        text-align: center;
      }
    }
    .goodsDetails-box {
      width: 100%;
      height: 746px;
      border-left: 1px solid #cccccc;
      border-right: 1px solid #cccccc;
      border-bottom: 1px solid #cccccc;
      padding: 44px 24px;
      box-sizing: border-box;
    }
    .evaluate {
      width: 100%;
      border: 1px solid #ccc;
      border-top: none;
      margin-bottom: 20px;
      font-size: 14px;
      box-sizing: border-box;
      ul {
        width: 100%;
        height: 40px;
        background-color: #f7f7f7;
        border-bottom: 1px solid #ccc;
        li {
          float: left;
          height: 40px;
          border: 1px solid #ccc;
          margin-left: -1px;
          margin-top: -1px;
        }
        a {
          display: block;
          padding: 0 20px;
          height: 40px;
          line-height: 40px;
          position: relative;
        }
      }
      .evaluate-bar {
        padding: 10px 0;
        overflow: hidden;
        & > div {
          float: left;
        }
        .bar-right {
          padding-left: 100px;
          p {
            margin-bottom: 10px;
          }
          h4 {
            font-weight: normal;
            font-size: 12px;
            margin-bottom: 10px;
          }
        }
        .bar-left {
          border-right: 1px solid #ccc;
          width: 49%;
          p {
            padding: 20px;
            color: #4eb5ba;
            font-size: 14px;
            font-weight: bold;
            span {
              font-size: 36px;
            }
          }
        }

      }
      .pingJia h3 {
        font-weight: normal;
        font-size: 14px;
        margin-top: 5px;
        span {
          display: inline-block;
          width: 85px;
        }
        a {
          display: inline-block;
          width: 100px;
          height: 15px;
          background-color: #ccc;
          vertical-align: middle;
        }

        .speed {
          display: inline-block;
          height: 100%;
          background-color: #4eb5ba;
        }
      }
      .pingjia_all {
        border-top: 1px solid #ccc;

        li.active a {
          color: #fff;
        }
      }
      .table_pj {
        width: 98%;
        margin: 0 auto;
        border-spacing: 0;
        border-collapse: collapse;
        font-size: 14px;
      }

    }
  }

</style>
