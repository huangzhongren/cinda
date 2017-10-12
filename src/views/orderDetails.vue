<template>
	<div>
		<div class="container">
			<p class='contenthead'>首页/支付</p>
			<p class='contentBar'>订单详情</p>
			<div class="orderList">
				<el-collapse v-model="activeNames">
					<el-collapse-item  name="1">
						<template slot='title'>
							<span>订单编号：{{orderId}}</span>
							<span>创建时间：{{orderDetails.createTime|transTime}}</span>
							<span>订单金额：{{orderDetails.price/100+""}}元</span>
						</template>	
						<div v-for='service in orderDet'>
							<span>服务名称：{{service.serviceName}}</span>
							<span>单价:{{service.unitPrice/100+'.00'}}元</span>
							<span>数量:{{service.buyNum}}</span>
							<span>服务总额:{{service.totalPrice/100+'.00'}}元</span>
						</div>
					</el-collapse-item>
				</el-collapse>
			</div>
			<div class="pay">
				<p class='contentBar'>支付方式</p>
				<p class='ionlinePay'>非网银支付</p>
					<el-radio class="radio firstPay" v-model="radio" label="1"><i></i></el-radio>
				<p class='platPay'>平台支付</p>
					<el-radio class="radio secondPay" v-model="radio" label="2">微信支付</el-radio>
					<el-radio class="radio thirdPay" v-model="radio" label="3">快捷支付</el-radio>
				<p class='selfTransfer'>自助转账<span>因限额不能支付时，建议使用自助转账</span></p>
					<el-radio class="radio forthPay" v-model="radio" label="4">
						<div class='bankInfo'>
							<span><i>开户账号：</i>110916853310605<br></span>
							<span><i>开户名：</i>北京爱蓝领网络科技有限公司<br></span>
							<span><i>开户行：</i>招商银行股份有限公司北京东三环支行<br></span>
						</div>
					</el-radio>
				<p class='tips'>`注：转账时请将订单编号备注在付款信息里：转账完成后，请通知客服。</p>
				<p class='totalCash'>金额总计：<span>{{totalCash/100+".00"}}元</span></p>
				<p class='goCharge'><button @click='pay'>去结算</button></p>
			</div>
			<div class="weixin" v-if='isWeixin'>
                <div class="weixin_header">
                    <span>微信支付</span>
                    <span class="xx_span"@click='isWeixin=false'>X</span>
                </div>
                <div class="weixin_code">
                    <img src="../assets/weixin-01.jpg">
                    <span>请使用微信扫一扫 进行扫码支付</span>
                </div>
                <div class="weixin_down">
                    <router-link to="/success">
                        <div class="wx_success">
                            <span @click='success'>已完成支付</span>
                        </div>
                    </router-link>
                    <router-link to="/fail">
                        <div class="wx_fail">
                            <span @click='fail'>支付遇到问题</span>
                        </div>
                    </router-link>
                    <router-link to="/payment">
                        <span class="down_span3">返回重新选择支付方式</span>
                    </router-link>
                </div>
            </div>
		</div>
		
	</div>
</template>
<script>
import ajax from 'axios'
import qs from 'qs'
import {transTime} from '../filters'
import {mapActions} from 'vuex'
	export default{
		data(){
			return {
				radio:'1',
				activeNames:['0'],
				orderId:"",//当前订单编号
				orderDetails:'',//订单详情
				orderDet:[],//订单明细
				totalCash:"",//金额总计
				isWeixin:false,//是否是微信
			}
		},
		created(){
			this.ready()
		},
		methods:{
			...mapActions(['setBank']),
			ready(){
				this.orderId = this.$route.params.orderId;
				console.log(this.orderId)
				//查询订单明细
				ajax.post('/xinda-api/business-order/detail',qs.stringify({
					businessNo: this.orderId
				})).then(res=>{
					console.log(res)
					this.orderDet = res.data.data.serviceOrderList;
				})
				//查询订单详情
				ajax.post('/xinda-api/pay/detail',qs.stringify({
					businessNo: this.orderId
				})).then(res=>{
					//console.log(res)
					this.orderDetails = res.data.data;
					this.totalCash = this.orderDetails.price;
				},err=>{
					console.log(err)
				})
			},
			pay(){//结算
				if(this.radio=='1'){//非网银支付
					this.ajax.post('/xinda-api/pay/china-pay',this.qs.stringify({
						businessNo: this.orderId
					})).then(res=>{
						console.log(res.data)
						this.setBank(res.data)
						console.log(location.pathname)
						window.open()
						//window.open()
					},err=>{
						//跳转到支付失败页面
						this.$router.push({path:"/failPay"})
					})
				}else if(this.radio=='2'){//微信支付
					//显示二维码
					this.isWeixin = true;
				}else if(this.radio=='3'){//支付宝支付
					this.ajax.post('/xinda-api/pay/ali-pay',this.qs.stringify({
						businessNo: this.orderId
					})).then(res=>{
						console.log(res)
					})
				}
				
			},
			success(){
				this.$router.push({path:'/success'})
			},
			fail(){

			}
		},
		filters:{
			transTime
		}

	}
</script>
<style lang="less">
	.contenthead {
		margin: 25px 0;
	}
	.contentBar {
		height: 32px;
		line-height: 32px;
		font-size: 14px;
		color: #2693d4;
		border-bottom: 1px solid #bcbcbd;
	}
	.orderList {
		margin: 36px 0 46px 0;
		.el-collapse-item__header {
			background: #f7f7f7;
			span {
				width: 380px;
				display: inline-block;
			}
		}
		.el-collapse-item__wrap {
			background: #f7f7f7;
		}
		.el-collapse-item__content {
			span {
				width: 285px;
				display: inline-block;
			}
		}
	}
	.pay {
		.radio {
			border: 1px solid #f0efef;
			height: 52px;
			line-height: 52px;
			margin-top: 28px;
			.el-radio__label {
				padding-left: 97px;
			}
			.el-radio__input {
				margin-left: 5px;
			}
			
		}
		.ionlinePay {
			margin-top: 22px;
		}
		.firstPay {
			width: 207px;
			background: url(../assets/orderDetails/yinlian.jpg) no-repeat 47px;
			
		}
		.platPay {
			margin-top: 43px;
		}
		.secondPay {
			width: 207px;
			background: url(../assets/orderDetails/wechat.jpg) no-repeat 47px;
			
		}
		.thirdPay {
			width: 207px;
			background: url(../assets/orderDetails/zhifubao.jpg) no-repeat 47px;
			
		}
		.selfTransfer {
			margin-top: 39px;
		}
		.forthPay {
			width: 422px;
			position: relative;
			background: url(../assets/orderDetails/zhaoshang.jpg) no-repeat 47px;
			.bankInfo {
				line-height: 16px;
				position: absolute;
				font-size: 12px;
				top: 0;
				left: 162px;
				margin-top: 2px;
				i {
					font-style: normal;
					color: #999;
				}
			}
			
		}
		.tips {
			color: #f00;
			font-size: 12px;
			margin-top: 12px;
		}
		.totalCash,
		.goCharge {
			text-align: right;
		}
		.totalCash {
			color: #020202;
			span {
				color: #2693d4;
				font-size: 24px;
			}
		}
		.goCharge {
			margin-top: 14px;
			button {
				border:1px solid #2693d4;
				width: 103px;
				height: 28px;
				font-size: 14px;
				color: #2693d4;
				background: #fff;
				border-radius: 4px;
			}
		}
	}
	.weixin {
        width: 334px;
        height: 367px;
        border-bottom: 1px solid #8d8d8d;
        border-right: 1px solid #8d8d8d;
        position: absolute;
        box-sizing: border-box;
        margin-top: -470px;
        margin-left: 422px;
        .weixin_header {
            height: 40px;
            border-bottom: 1px solid #f1f1f2;
            box-sizing: border-box;
            background-color: #f7f7f7;
            span {
                font-size: 14px;
                color: #444343;
                line-height: 14px;
                display: block;
                float: left;
                margin-top: 13px;
                margin-left: 18px;
            }
            .xx_span {
                margin-left: 214px;
                cursor: pointer;
            }
        }
        .weixin_code {
            margin-top: 18px;
            img {
                width: 185px;
                margin-left: 74px;
            }
            span {
                font-size: 15px;
                display: block;
                line-height: 15px;
                color: #393c55;
                width: 215px;
                text-align: center;
                margin-left: 60px;
                margin-top: 3px;
            }
        }
        .weixin_down {
            width: 235px;
            height: 60px;
            overflow: hidden;
            margin-left: 50px;
            margin-top: 11px;
            span {
                font-size: 14px;
                color: #8bddf4;
                display: block;
            }
            .wx_success {
                width: 114px;
                height: 30px;
                float: left;
                border: 1px solid #8bddf4;
                box-sizing: border-box;
                border-radius: 3px;
                cursor: pointer;
                span {
                    line-height: 30px;
                    text-align: center;
                }
            }
            .wx_fail {
                width: 114px;
                height: 30px;
                float: left;
                border-radius: 3px;
                border: 1px solid #8bddf4;
                box-sizing: border-box;
                margin-left: 2px;
                cursor: pointer;
                span {
                    line-height: 30px;
                    text-align: center;
                }
            }
            .down_span3 {
                font-size: 10px;
                line-height: 46px;
                width: 120px;
                cursor: pointer;
            }
        }
    }
	
</style>