<template>
    <div class="main">
        <div class="cont_pro">
            <div class="page1" style="border:1px solid #e9e9e9">
                <div class="head_pro">
                    <a class="head_logo">
                        <img src="../assets/img/header-02.png">
                    </a>
                    <h2 class="ng-binding">{{dat.name}}</h2>
                    <p>
                        服务地址：<span class="ng-binding">{{dat.regionName}}</span>
                    </p>
                </div>
            </div>
            <div class="page1" style="overflow:hidden;">
                <div class="page_brief">
                    <div class="cpy_brief">
                        <h3>公司介绍</h3>
                        <p class="">{{dat.providerInfo}}</p>
                    </div>
                    <div class="side-bottom" style="background-color:#fff;">
                        <ul>
                            <li>
                                <a href="javascript:void(0);" class="ensure-1">平台担保</a>
                            </li>
                            <li>
                                <a href="javascript:void(0);" class="ensure-2">优质服务</a>
                            </li>
                            <li>
                                <a href="javascript:void(0);" class="ensure-3">过程监督</a>
                            </li>
                            <li>
                                <a href="javascript:void(0);" class="ensure-4">增值服务</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="page_big">
                    <div class="page_detail">
                        <ul class="tab_nav">
                            <li v-for="(item,$index) in titletype">
                                <a href="javascript:void(0);" @click="toggle($index)" :class="{active:active==$index}">{{item}}</a>
                            </li>
                        </ul>
                        <!-- 服务内容 -->
                        <!-- ngIf: viewPage==1 -->
                        <div class="view_cont" v-show="serpro">
                            <div class="view_title">
                                <h4>服务产品</h4>
                                <span></span>
                            </div>
                            <div class="view_brief">
                                <ul id="service_list" class="fuwu_del">
                                    <!-- ngRepeat: data in packageGrid.grid.data -->
                                    <li class="" v-for="products in product">
                                        <div class="c_service">
                                            <h3><span class="ng-binding">{{products.providerName}}</span></h3>
                                            <p>质量认证 {{products.serviceInfo}}</p>
                                            <span class="">销量：{{products.serviceName}}</span>
                                            <div class="service_money">
                                                <h4><span ng-bind="data.price | money" class="ng-binding">￥{{products.price}}.00</span></h4>
                                                <s class="">原价：￥ {{products.marketPrice}}.00</s>
                                                <router-link :to="'/goodsDeatils/'+products.id">查看详情>>></router-link>
                                            </div>
                                        </div>
                                    </li>
                                    <!-- end ngRepeat: data in packageGrid.grid.data -->
                                </ul>
                                <!-- 内容为空时显示 -->
                                <div id="empty_service" class="empty_cont" style="display: none;">
                                    <p>店家正在准备中，请稍等。</p>
                                    <span>去逛逛其他店去吧！</span>
                                </div>
                            </div>
                        </div>
                        <div class="view_cont" v-show="customer">
                            <div class="view_title">
                                <h4>客服</h4>
                                <span></span>
                            </div>
                            <div class="view_brief">
                                <div id="customer_service" class="kefu_advice">
                                    <div class="kefu_time">
                                        <p class="ng-scope"><span ng-bind="'工作时间：'+provider.workTime" class="ng-binding">工作时间：周一到周五</span></p>
                                        <h6 ng-if="provider.qq!=null&amp;&amp;provider.qq!=''" class="ng-scope">
                                        <span>QQ咨询：{{dat.qq}}</span>
                                        <a href="" taraget="_blank">
                                            <img src="">
                                        </a>
                                    </h6>
                                    </div>
                                </div>
                                <!-- 内容为空时显示 -->
                                <div id="empty_service" class="empty_cont" style="display: none;">
                                    <p>店家正在准备中，请稍等。</p>
                                    <span>去逛逛其他店去吧！</span>
                                </div>
                            </div>
                        </div>
                        <div class="view_cont" v-show="diploma">
                            <div class="view_title">
                                <h4>资质证书</h4>
                                <span></span>
                            </div>
                            <div class="view_brief">
                                <ul id="cert_list" class="diploma_cpy">
                                    <li>
                                        <a>
                                            <img :src='"http://115.182.107.203:8088/xinda/pic"+dat.providerImg'>
                                        </a>
                                    </li>
                                </ul>
                                <!-- 内容为空时显示 -->
                                <div id="empty_service" class="empty_cont" style="display: none;">
                                    <p>店家正在准备中，请稍等。</p>
                                    <span>去逛逛其他店去吧！</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bottom-change">
                        <div class="bottom-change-center">
                            <div class="change-center-cells">
                                上一页
                            </div>
                            <div class="change-center-middle">
                                1
                            </div>
                            <div class="change-center-cells">
                                下一页
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
export default {
    data() {
            return {
                storyid: this.$route.params.shopId,
                titletype: ["服务产品",
                    "客服", "资质证书"
                ],
                active: 0,
                dat: [],
                serpro: true,
                customer: false,
                diploma: false,
                product: ""
            }
        },
        methods: {
            ready() {
                axios.post('/xinda-api/provider/detail?id=' + this.storyid).then(res => {
                    console.log(res.data.data);
                    this.dat = res.data.data;
                }, err => {
                    console.log(err);
                })
                axios.post('/xinda-api/recommend/list', {}).then(res => {
                    console.log(res.data.data.product);
                    this.product = res.data.data.product;
                }, err => {
                    console.log(err);

                })
            },
            toggle: function(num) {
                this.active = num;
                if (num == 0) {
                    this.serpro = true;
                    this.customer = false;
                    this.diploma = false;
                } else if (num == 1) {
                    this.serpro = false;
                    this.customer = true;
                    this.diploma = false;
                } else if (num == 2) {
                    this.serpro = false;
                    this.customer = false;
                    this.diploma = true;
                }
            }
        },
        created() {
            this.ready();
            this.$parent.yc = true;
            console.log(this.$route.params.shopId)
        },
        computed: {

        },
        filters: {

        }
}
</script>
<style lang="less" scoped>
body {
    color: #666;
}
.main {
    width: 100%;
    min-height: 780px;
    .cont_pro {
        width: 100%;
        min-height: 960px;
        .page1 {
            width: 1200px;
            margin: 0 auto;
            height: 100%;
            .head_pro {
                width: 100%;
                height: 106px;
                padding: 26px 0;
                background: #fff;
                position: relative;
                .head_logo {
                    position: absolute;
                    left: 95px;
                    top: 46px;
                    width: 65px;
                    height: 65px;
                    overflow: hidden;
                    img {
                        display: block;
                        width: 100%;
                        height: 100%;
                    }
                }
                h2 {
                    font-size: 30px;
                    margin-left: 206px;
                    height: 56px;
                    line-height: 56px;
                    overflow: hidden;
                    color: #333;
                    font-weight: bold;
                }
                p {
                    margin-left: 206px;
                    height: 50px;
                    line-height: 50px;
                    font-size: 14px;
                    .over_prove {
                        margin-left: 30px;
                        margin-right: 10px;
                        img {
                            display: inline-block;
                            vertical-align: middle;
                        }
                    }
                }
            }
        }
        .page1 {
            width: 1200px;
            margin: 0 auto;
            height: 100%;
            .page_brief {
                float: left;
                width: 300px;
                margin-top: 24px;
                overflow: hidden;
                .cpy_brief {
                    background-color: #fff;
                    padding: 20px;
                    border: 1px solid #e9e9e9;
                    h3 {
                        font-size: 20px;
                        font-weight: normal;
                        color: #333;
                    }
                    p {
                        font-size: 14px;
                        line-height: 30px;
                        width: 100%;
                        overflow: hidden;
                        text-indent: 2em;
                        word-break: break-all;
                        color: #666;
                        min-height: 330px;
                    }
                }
                .side-bottom {
                    border: 1px solid #e9e9e9;
                    height: 250px;
                    background-color: #f7f7f7;
                    border-top: none;
                    ul {
                        width: 100%;
                        height: 100%;
                        overflow: hidden;
                        li {
                            float: left;
                            width: 50%;
                            height: 50%;
                            text-align: center;
                            list-style: none;
                            a {
                                margin-top: 20px;
                                padding-top: 64px;
                                color: #333;
                                font-size: 14px;
                                display: inline-block;
                            }
                            .ensure-1 {
                                background: url(../assets/img/homeshop-01.png) center top no-repeat;
                            }
                            .ensure-2 {
                                background: url(../assets/img/homeshop-02.png) center top no-repeat;
                            }
                            .ensure-3 {
                                background: url(../assets/img/homeshop-03.png) center top no-repeat;
                            }
                            .ensure-4 {
                                background: url(../assets/img/homeshop-04.png) center top no-repeat;
                            }
                        }
                    }
                }
            }
            .page_big {
                width: 876px;
                float: right;
                .page_detail {
                    width: 876px;
                    float: right;
                    border: 1px solid #e9e9e9;
                    margin-top: 24px;
                    min-height: 647px;
                    .tab_nav {
                        width: 100%;
                        height: 38px;
                        background-color: #fff;
                        border-bottom: 2px solid #f4f4f4;
                        li {
                            float: left;
                            height: 38px;
                            a {
                                width: 125px;
                                height: 38px;
                                line-height: 38px;
                                text-align: center;
                                border-bottom: 4px solid transparent;
                                position: relative;
                                font-size: 14px;
                                color: #333;
                                display: inline-block;
                            }
                            a:hover {
                                border-bottom: 2px solid #2693d4;
                                color: #2693d4;
                            }
                            .active {
                                border-bottom: 2px solid #2693d4;
                                color: #2693d4;
                                .active:after {
                                    content: "";
                                    width: 0;
                                    height: 0;
                                    border: 6px solid transparent;
                                    border-top: 6px solid #4eb5ba;
                                    position: absolute;
                                    top: 40px;
                                    left: 50%;
                                    margin-left: -6px;
                                }
                            }
                        }
                    }
                    .view_cont {
                        width: 100%;
                        .view_title {
                            width: 100%;
                            height: 100px;
                            background-color: #fff;
                            margin-top: 4px;
                            h4 {
                                color: #2693d4;
                                font-weight: bold;
                                font-size: 24px;
                                text-align: center;
                                padding-top: 26px;
                            }
                        }
                        .view_brief {
                            width: 100%;
                            background-color: #fff;
                            margin-top: 3px;
                            border-top: 1px solid #e9e9e9;
                            .fuwu_del {
                                width: 100%;
                                overflow: hidden;
                                padding-bottom: 80px;
                                li {
                                    width: 264px;
                                    height: 188px;
                                    margin: 30px 0 0 20px;
                                    float: left;
                                    border: 1px solid #d9d9d9;
                                    list-style: none;
                                    .c_service {
                                        padding: 14px;
                                        h3 {
                                            font-size: 18px;
                                            font-weight: normal;
                                            color: #333;
                                            padding-bottom: 10px;
                                            background: url(../assets/img/homeshop-05.png) left bottom no-repeat;
                                            span {
                                                display: inline-block;
                                                width: 100%;
                                                height: 24px;
                                                font-size: 18px;
                                                color: #333;
                                                line-height: 24px;
                                                word-break: break-all;
                                                overflow: hidden;
                                                white-space: nowrap;
                                                text-overflow: ellipsis;
                                            }
                                        }
                                        p {
                                            font-size: 14px;
                                            height: 30px;
                                            line-height: 30px;
                                            overflow: hidden;
                                            text-overflow: ellipsis;
                                            white-space: nowrap;
                                        }
                                        span {
                                            font-size: 14px;
                                            color: #999;
                                            display: block;
                                            overflow: hidden;
                                            text-overflow: ellipsis;
                                            white-space: nowrap;
                                        }
                                        .service_money {
                                            width: 100%;
                                            position: relative;
                                            h4 {
                                                color: #2693d4;
                                                font-size: 13px;
                                                height: 50px;
                                                overflow: hidden;
                                                span {
                                                    font-size: 38px;
                                                    color: #2693d4;
                                                }
                                            }
                                            s {
                                                font-size: 14px;
                                            }
                                            a {
                                                position: absolute;
                                                right: 0;
                                                bottom: 0px;
                                                color: #2693d4;
                                                font-size: 16px;
                                            }
                                        }
                                    }
                                }
                            }
                            .kefu_advice {
                                width: 100%;
                                height: 220px;
                                padding-top: 40px;
                                .kefu_time {
                                    padding: 0 10px;
                                    margin-left: 50px;
                                    border: 1px solid #d9d9d9;
                                    width: 230px;
                                    border-radius: 3px;
                                    p {
                                        height: 60px;
                                        line-height: 60px;
                                        border-bottom: 1px solid #ccc;
                                        padding-left: 15px;
                                        font-size: 18px;
                                        span {
                                            color: #333;
                                            font-weight: bold;
                                        }
                                    }
                                    h6 {
                                        height: 60px;
                                        line-height: 60px;
                                        padding-left: 15px;
                                        font-size: 18px;
                                        span {
                                            color: #333;
                                            font-weight: bold;
                                        }
                                    }
                                }
                            }
                            .diploma_cpy {
                                padding: 15px 0px 15px 30px;
                                overflow: hidden;
                                li {
                                    width: 350px;
                                    height: 260px;
                                    border: 1px solid #d9d9d9;
                                    float: left;
                                    overflow: hidden;
                                    margin: 20px 0 20px 56px;
                                    text-align: center;
                                    a {
                                        display: block;
                                        width: 100%;
                                        height: 260px;
                                        line-height: 260px;
                                        overflow: hidden;
                                        img {
                                            display: inline-block;
                                            vertical-align: middle;
                                            width: 100%;
                                        }
                                    }
                                }
                            }
                            .empty_cont {
                                width: 100%;
                                padding: 360px 0px 220px;
                                text-align: center;
                                background: url(../assets/img/empty_store.png) center 70px no-repeat;
                                p {
                                    font-size: 18px;
                                    color: #333;
                                    height: 30px;
                                    line-height: 30px;
                                }
                                span {
                                    font-size: 16px;
                                }
                            }
                        }
                    }
                }
                .bottom-change {
                    height: 36px;
                    margin-left: -70px;
                    box-sizing: border-box;
                    margin-top: 29px;
                    .bottom-change-center {
                        width: 187px;
                        height: 36px;
                        box-sizing: border-box;
                        margin: 0 auto;
                        .change-center-cells {
                            width: 68px;
                            height: 36px;
                            float: left;
                            font-size: 13px;
                            line-height: 34px;
                            text-align: center;
                            color: #CCC;
                            cursor: pointer;
                            box-sizing: border-box;
                            border: 1px solid #CCC;
                        }
                        .change-center-middle {
                            width: 39px;
                            height: 36px;
                            float: left;
                            margin: 0 6px;
                            font-size: 13px;
                            line-height: 34px;
                            text-align: center;
                            color: #2693d4;
                            box-sizing: border-box;
                            border: 1px solid #2693d4;
                        }
                    }
                }
            }
        }
    }
}
</style>
