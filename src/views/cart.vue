<template>
	<div class="cart">
		<div class="container">
			<h2>首页/购物车</h2>
			<p class='cartTitle'>全部商品(<span>{{goodsList.length}}</span>)</p>
			<table rules="none">
				<thead>
					<tr>
						<th class='companyName'>公司</th>
						<th class='serviceGoods'>服务商品</th>
						<th class='price'>单价</th>
						<th class='num'>数量</th>
						<th class='cash'>金额</th>
						<th class='operate'>操作</th>
					</tr>
				</thead>
				<tbody align="center" v-for='(item,key) in goodsList'>
					<tr class='shop'>
						<td colspan="6">店铺：{{item.providerName}}</td>
					</tr>
					<tr class='productInfo'>
						<td><img :src="`http://115.182.107.203:8088/xinda/pic/${item.providerImg}`" alt="店铺logo"></td>
						<td>{{item.serviceName}}</td>
						<td>￥{{item.unitPrice/100+".00"}}</td>
						<td class='changeNum'><span @click='substract(item)'>-</span><input type="text" v-model='item.buyNum' @change='saveNum(item)' @input='limit(item)'><span @click='addNum(item)' >+</span></td>
						<td >￥{{item.unitPrice*item.buyNum/100+".00"}}</td>
						<td @click='dele(item)' class='delete'>删除</td>
					</tr>
				</tbody>
			</table>
			<p class='totalCash'>金额总计<span>￥{{totCash/100+".00"}}元</span></p>
			<p class='todo'><button id='goShop' @click='goShop'>继续购物</button><button id='goSettle' @click='goSettle'>去结算</button></p>
			<p>热门服务</p>
			<ul>
				<li></li>
			</ul>
		</div>

	</div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'
import ajax from 'axios'
	export default{
		data(){
			return {
				timer:'',//定时器
				
			}
		},
		created(){
			this.getCartList();
		},
		computed:{
			...mapGetters(['goodsList']),
			totCash:function(){
				let arr = [];
				for(var attr in this.goodsList){
					arr.push(this.goodsList[attr])
				}
				return arr.reduce((totCash,item)=>{
					return totCash+item.unitPrice*item.buyNum;
				},0)
			}
		},
		methods:{
			...mapActions(['getCartList','getCart']),
			//购物车结算提交
			goSettle(){
				ajax.post('/xinda-api/cart/submit',{}).then(res=>{
					console.log(res)
					if(res.data.status==1){
						//跳转到结算页面
						this.$router.push({path:'/orderDetails/'+res.data.data})
					}else {
						alert(res.data.msg)
					}
				})
			},
			goShop(){//继续购物
				this.$router.push({path:'/'})
			},
			limit(item){//限制input框输入类型
				if(/\D/.test(item.buyNum)) {
					item.buyNum = item.buyNum.replace(/\D+/g,'')
				} 
			},
			addNum(item){//增加数量
				item.buyNum++;
				//只执行最后一次ajax
				clearTimeout(this.timer)
				this.timer = setTimeout((function(){
					this.saveNum(item)
				}).bind(this),500)
			},
			substract(item){//减少数量
				if(item.buyNum>0)item.buyNum--;
				clearTimeout(this.timer)
				this.timer = setTimeout((function(){
					this.saveNum(item)
				}).bind(this),500)
			},
			saveNum(item){//设置产品数量
				this.ajax.post('/xinda-api/cart/set',this.qs.stringify({
					id:item.serviceId,
					num:item.buyNum
				})).then(res=>{
					console.log(res)
				})
			},
			dele(obj){//删除
				console.log(obj)
				this.ajax.post('/xinda-api/cart/del',this.qs.stringify({
					id:obj.serviceId,
				})).then(res=>{
					if(res.data.status==1){
						this.getCartList();
						this.getCart();
					}
				})
			},
		}
	}
</script>
<style lang="less" scoped>
	.cart {
		h2 {
			margin-top: 27px;
			margin-bottom: 26px;
			font-size: 14px;
			color: #060606;
		}
		.cartTitle {
			padding-left: 65px; 
			color: #2693d4;
			padding-bottom: 8px;
			border-bottom: 1px solid #bcbdbd;
		}
		.totalCash {
			margin-top: 25px;
			text-align: right;
			span {
				color: #2693d4;
				font-size: 24px;
			}
		}
		.todo {
			margin-top: 14px;
			text-align: right;
			button {
				border:1px solid #2693d4;
				width: 103px;
				height: 28px;
				text-align: center;
				line-height: 28px;
				color: #2693d4;
				font-size: 14px;
				border-radius: 4px;
				background: #fff;
			}
			#goSettle {
				margin-left: 6px;
				cursor: pointer;
			}
			#goShop {
				cursor: pointer;
			}
		}
	}
	table{
		width: 100%;
		th{
			padding-top: 25px;
		}
		.companyName {
			width: 165px;
		}
		.serviceGoods {
			width: 215px;
		}
		.price {
			width: 220px;
		}
		.num {
			width: 221px;
		}
		.cash {
			width: 225px;
		}
		tbody {
			.shop {
				width: 100%;
				display: block;
				padding: 15px 0 38px 65px;
			}
			.productInfo {
				background: #f7f7f7;
				height: 76px;
				.delete{
					cursor: pointer;
				}
			}
			.changeNum {
				span {
					width: 18px;
					height: 20px;
					display: inline-block;
					background: #bcbdbd;
					cursor: pointer;
				}
				input {
					width: 30px;
					text-align: center;
					height: 20px;
				}
			}
		}
	}
</style>