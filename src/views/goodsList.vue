<template>
  <div class="goodsList">
    <div class="container">
    <div class='goodsList-l'>
       <div class="nav">
        <div class="title">首页/公司工商</div>
        <ul class="goods-nav">
          <li class="type">
            <p class="f-left">服务区域</p>
            <ul class="f-left">
              <li v-for='(item,index) in secondCatalog' :class='isCur== index?"active":""' @click='isCur=index'>{{item.name}}</li>
            </ul>
          </li>
          <li class="type">
            <p class="f-left">产品类型</p>
            <ul class="f-left">
              <li v-for='(item,index) in thirdCatalog' :class='isCurrent == index?"active":""' @click='isCurrent=index'>{{item.name}}</li>
            </ul>
          </li>
          <li class="server">
            <p class="f-left">类型</p>
            <form class="f-left">
              <select>
                <option>省</option>
              </select>
              <select>
                <option>市</option>
              </select>
              <select>
                <option>区</option>
              </select>
            </form>
          </li>
        </ul>
      </div>
      <div class="content">
        <ul class="sort">
          <li @click='sortAll' :class="tab?'active':''">综合排序</li>
          <li @click="sortPrice($event)" :class="tab?'':'active'">价格↿↾</li>
        </ul>
        <ul class="sort-title clear">
          <li class="f-left">商品</li>
          <li class="f-right">价格</li>
        </ul>
        <ul class='service-list'>
          <li v-for="service in serList" class='clear'>
            <div class='companyLogo' @click='goGoodsDetails(service)'>
              <img :src='"http://115.182.107.203:8088/xinda/pic"+service.providerImg' alt="">
            </div>
            <div class='info'>
              <h1>{{service.serviceName}}</h1>
              <p class='serviceInfo'>{{service.serviceInfo}}</p>
              <p class='serviceName'>{{service.providerName}}<span>{{service.regionName}}</span></p>
            </div>
            <div class='priceOpe'>
              <p class='price'>{{service.price}}{{service.unit}}</p>
              <p class='operate'>
                <button @click='buyNow(service)'>立即购买</button><button v-on:click='addCart(service)'>加入购物车</button>
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div class="page">
          <ul>
            <li class='prev' @click='prev'>上一页</li>
            <li class='num'>{{page}}</li>
            <li class='next' @click='next'>下一页</li>
          </ul>
        </div> 
    </div>
      <div class="goodsList-r">
          <div class="detial-cells">
                    <div class="img-cell">
                        <img src="../assets/listPage/pingtaidanbao.png" />
                    </div>
                    <span>平台担保</span>
                </div>
                <div class="detial-cells">
                    <div class="img-cell">
                        <img src="../assets/listPage/youzhifuwu.png" />
                    </div>
                    <span>优质服务</span>
                </div>
                <div class="detial-cells">
                    <div class="img-cell">
                        <img src="../assets/listPage/guochengjiandu.png" />
                    </div>
                    <span>过程监督</span>
                </div>
                <div class="detial-cells">
                    <div class="img-cell">
                        <img src="../assets/listPage/zengzhifuwu.png" />
                    </div>
                    <span>增值服务</span>
                </div>
            </div>
      </div>
    </div>
  </div>
</template>
<script>
import ajax from 'axios'
import {mapActions} from 'vuex'
  export default{
      data(){
          return {
            isCur:0,//当前二级目录索引
            isCurrent:0,//当前三级目录索引
            shopList:'',
            secondCatalog:[],//二級目錄
            thirdCatalog:[],//三级目录
            productId:"",//当前产品id
            serviceList:[],//所有服务产品列表
            page:1,//当前页码
            sort:2,//排序方式（默认时升序）
            tab:true,//是否是综合排序
            serList:[],//当前页的服务产品
          }
      },
      created(){
        //获取挂参
        var htmlType = this.$route.params.type
        
        //获取产品类型
        ajax.post('/xinda-api/product/style/list',{}).then(res=>{
          let data = res.data.data;
          console.log(data)
          for(var attr in data){
            if(data[attr].name == htmlType){
              var item = data[attr].itemList
              for(var attr in item){
                this.secondCatalog.push(item[attr])//存放到数组中
              }
              this.secondCatalog.sort(this.compare('showOrder'))//二级目录排序
              this.getThirdItem(this.isCur)
               //调用获得服务产品ajax
               this.getServiceList();
            }
          }
        })
      },
      watch:{
        isCur:function(){
            this.page = 1;
            this.getThirdItem(this.isCur)
        },
        isCurrent:function(){
          this.getServiceList();
        },
        page: function(){
            this.serList = this.serviceList.slice((this.page-1)*8,this.page*8-1)
        }
      },
      methods:{
        ...mapActions(['getCart']),
        getThirdItem(idx){//根据索引获得有序的三级目录数组
          var seconditems = this.secondCatalog[idx].itemList//获得三级目录对象
          this.thirdCatalog = [];//置空数组
          for(var attr in seconditems){
            this.thirdCatalog.push(seconditems[attr])
          }
          this.thirdCatalog.sort(this.compare('showOrder'))//三级目录排序
          this.productId = this.thirdCatalog[idx].id//根据当前索引确定产品id
        },
        next(){
          this.page++
        },
        prev(){
          this.page>1?this.page--:""
        },
        //得到产品服务列表
        getServiceList(){
          this.page = 1;//当前页数置为1
          this.serviceList = [];//服务列表置为空
          this.ajax.post('/xinda-api/product/package/grid',{
            start:this.page,
            limit:8,
            productTypeCode: "1",
            productId: this.productId,
            sort:this.sort
          }).then(res=>{
            console.log(res)
            //对得到的数据处理，根据价格排序
            var serviceItems = res.data.data;
            for(var attr in serviceItems){
                this.serviceList.push(serviceItems[attr]);
            }
            this.serviceList.sort(this.compare('price'))
            //根据当前page值截取所有服务列表中的8条数据
            this.serList = this.serviceList.slice((this.page-1)*8,this.page*8-1)
          })
        },
        goGoodsDetails(item){
            let id = item.id;
            this.$router.push({path:`/goodsDetails/${id}`})
        },
        sortPrice:function (event){//商品排序
            this.tab = false;
            let oLi = event.target;
            if(this.sort==2){
                this.sort=3;
                this.serviceList.sort(this.compare('price'))
                this.serList = this.serviceList.slice((this.page-1)*8,this.page*8-1)
                oLi.innerText = '价格↿↾'
            }else {
                this.sort =2;
                this.serviceList.sort(this.compare1('price'))
                this.serList = this.serviceList.slice((this.page-1)*8,this.page*8-1)
                oLi.innerText = '价格⇃⇂'
            }
        },
        sortAll:function (){
          this.sort("",0)
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
        addCart(service){//加入购物车
          this.ajax.post('/xinda-api/cart/add',this.qs.stringify({
            id:service.id,
            num:1
          })).then(res=>{
            this.getCart();
          })
        },
        buyNow(obj){//立即购买
            console.log(obj)
            //生成订单
            // this.ajax.post('/xinda-api/cart/add',this.qs.stringify({
            //     id:obj.id,
            //     num:1
            // })).then(res=>{
            //     console.log(res)
            //     if(res.status==-1){
            //         this.ajax.post('/')
            //     }
            // })
           // this.$router.push({path:`/orderDetails/${obj.id}`})
        }
      }
  }
</script>


<style lang="less" scoped>
  @server-h: 44px;
  @color-ccc: #ccc;
  @color-f7: #f7f7f7;
  @base-border: 1px solid @color-ccc;
  @border-radius: 4px;
  .goodsList-r {
    margin-top: 24px;
    width: 238px;
    height: 659px;
    margin-left: 12px;
    float: left;
    box-sizing: border-box;
    border: 1px solid #cccccc;
    .detial-cells {
        width: 171px;
        height: 149px;
        margin: 0 auto;
        border-bottom: 1px solid #cccccc;
        box-sizing: border-box;
        cursor: pointer;
        .img-cell {
            margin-top: 11px;
            width: 171px;
            height: 94px;
            box-sizing: border-box;
            padding: 0 38.5px;
            img {
                width: 94px;
                height: 94px;
                border-radius: 50%;
            }
        }
        span {
            display: block;
            width: 171px;
            height: 27px;
            margin: 0 auto;
            font-size: 18px;
            line-height: 27px;
            text-align: center;
            margin-top: 16px;
        }
    }
}
  .goodsList {
    .goodsList-l {
        width: 842px;
        float: left;
    }
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
      .goods-nav {
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
          border-bottom: @base-border;
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
          ul {
            padding-left: 12px;
          }
          li {
            height: 25px;
            line-height: 25px;
            display: inline-block;
            padding: 0 20px;
            border-radius: @border-radius;
            cursor: pointer;
          }
        }
      }
    }
    .content {
      border: 1px solid #ccc;
      .sort {
        width: 100%;
        height: @server-h;
        line-height: @server-h;
        background: @color-f7;
        border-bottom: 1px solid #ccc;
        box-sizing: border-box;
        li {
          height: 43px;
          display: inline-block;
          text-align: center;
          width: 108px;
          cursor: pointer;
          i {
            background-image: url(../assets/shop/sort.png);
            width: 24px;
            height: 24px;
            vertical-align: middle;
            margin-top: -4px;
          }
        }

      }
      .sort-title {
        height: 50px;
        line-height: 50px;
        li {
          width: 100px;
          text-align: center;
        }
      }
      .service-list {
        padding: 0 11px;
        li{
          overflow: hidden;
          height: 101px;
          padding: 11px 0 12px;
          border-top: 1px solid #eaeaea;
          >div {
            float:left;
          }
          .companyLogo {
            width: 100px;
            height: 100px;
            border: 1px solid #eaeaea;
            box-sizing: border-box;
            cursor: pointer;
            img {
              width: 100%;
              height: 100%;
              display: inline-block;
            }
          }
          .info {
            margin-left: 12px;
            width: 460px;
            h1 {
              font-size: 16px;
            }
            .serviceInfo {
              margin-top: 13px;
              font-size: 14px;
            }
            .serviceName {
              margin-top: 12px;
              font-size: 14px;
              span {
                margin-left: 71px;
              }
            }
          }
          .priceOpe {
            text-align: center;
            float:right;
            .price {
              color: #f00;
              font-size: 30px;
              display: inline-block;
            }
            .operate {
              button {
                width: 89px;
                height: 29px;
                background: #2693d4;
                color: #fff;
                border-radius: 4px;
                cursor: pointer;
                &:nth-child(2){
                  margin-left: 11px;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
