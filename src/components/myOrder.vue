<template>
	<div class="myorder">
		<p><span>我的订单</span></p>
		<div class='orderNum'>
			<div>订单号：</div>
			<div>
				<input type="text" class='intText' placeholder="请输入订单号搜索" v-model='searchName'>
				<input type="button" class='search' value='搜索' @click='search'>
			</div>
		</div>
		<div class='createTime'>
			<div>创建时间：</div>
			 <el-date-picker v-model="value1" type="date" placeholder="选择日期" :picker-option='pickerOptions0' @change='getDate'></el-date-picker>
			 <el-date-picker v-model="value2" type="date" placeholder="选择日期" :picker-option='pickerOptions0' @change='getDate'></el-date-picker>
		</div>
		<ul class='goodsHead'>
			<li class='goodsName'>商品名称</li>
			<li class='price'>单价</li>
			<li class='number'>数量</li>
			<li class='totalCash'>总金额</li>
			<li class='orderStatus'>订单状态</li>
			<li class='orderOperate'>订单操作</li>
		</ul>
		<ul class='order'>
			<li v-for='order in orderList'>
				<p>
					<span>订单号：{{order.businessNo}}</span><span class='creatTime'>下单时间：{{order.createTime|transTime}}</span>
				</p>
				<div class='clear-wrap'>
					<div class='service'>
						<dl v-for='ser in services' v-if='ser.businessNo == order.businessNo'>
							<dt class='providerImg'><img src="" alt="服务商"></dt>
							<dt class='providerName'>{{ser.providerName}}</dt>
							<dt class='unitPrice'>￥{{ser.unitPrice/100+'.00'}}</dt>
							<dt class='buyNum'>{{ser.buyNum}}</dt>
							<dt class='totalPrice'>￥{{ser.totalPrice/100+'.00'}}</dt>
							<dt class='status'>等待买家付款</dt>
						</dl>
					</div>
					<div class='operate'>
						<div>
							<p class='pay' @click='pay(order)'>付款</p>
							<p class='delete' @click='deleteOrder(order)'>删除订单</p>	
						</div>
					</div>
				</div>
			</li>
		</ul>
		<div class="page">
			<ul>
				<li class='prev' @click='prev'>上一页</li>
				<li class='num'>{{page}}</li>
				<li class='next' @click='next'>下一页</li>
			</ul>
		</div>
	</div>
</template>
<script>
import {transTime} from '../filters'
import ajax from 'axios'
	export default{
		data(){
			return {
				startTime:"",//起始时间
				endTime:"",//截止时间
				pickerOptions0: {
		          disabledDate(time) {
		            return time.getTime() < Date.now() - 8.64e7;
		          }
		        },
		        value1:'',
		        value2:'',
		        orderList:'',//订单列表
		        services:'',//服务订单
		        page:1,//页数
		        searchName:'',//搜索内容
		    }
		},
		created(){
			this.getOrder()
		},
		methods:{
			search(){//搜索数据
				let arr = [];
				let list = this.orderList
				for(var i=0;i<list.length;i++){
					if(this.searchName.indexOf(list[i].businessNo)!==-1){
						arr.push(list[i])
					}
				}
				this.orderList = arr;
			},
			getDate(){//选择时间段筛选数据
				if(this.value1!==''&&this.value2!==''){
					let arr = [];
					let list = this.orderList;
					for(var i=0;i<list.length;i++){
						if(this.value1.getTime()<list[i].createTime&&this.value2.getTime()>list[i.createTime]){
							
							arr.push(list[i])
						}
					}
					this.orderList = arr;
				}
			},

			next(){
				this.page++
			},
			prev(){
				this.page>1?this.page--:""
			},
			getOrder(){
				//业务订单
				ajax.post('/xinda-api/business-order/grid',{
					businessNo:1,
					startTime:this.value1,
					endTime:this.value2,
					start:0
				})
				.then(res=>{
					console.log(res)
					this.orderList = res.data.data;
				})
				//服务订单
				ajax.post('/xinda-api/service-order/grid',{
					businessNo:1,
					startTime:this.value1,
					endTime:this.value2,
					start:this.page
				}).then(res=>{
					this.services = res.data.data;
					console.log(res)
				})
			},
			deleteOrder(obj){//删除订单
				console.log(obj)
				this.ajax.post('/xinda-api/business-order/del',this.qs.stringify({
					id: obj.id
				})).then(res=>{
					console.log(res)
					if(res.data.status==1){
						//再一次获取数据
						this.getOrder();
					}
				})
			},
			pay(obj){
				console.log(obj)
				this.$router.push({path:`/orderDetails/${obj.businessNo}`})
			},
		},
		watch:{
			page:function(){
				this.getOrder()
			}
		},
		components:{
			
		},
		filters:{
			transTime
		}
	}
</script>
<style lang="less">
	.myorder {
		margin-left: 264px;
		>p {
			height: 30px;
			line-height: 30px;
			font-size: 14px;
			color: #2693d4;
			border-bottom: 1px solid #e9e9e9;
			span {
				width: 112px;
				display: block;
				text-align: center;
				border-bottom: 1px solid  #2693d4;
			}
		}
		.orderNum {
			overflow: hidden;
			margin-top: 23px;
			padding-left: 2px;
			div:nth-child(1){
				width: 76px;
			}
			div{
				line-height: 25px;
				float:left;
				.intText {
					width: 265px;
					height: 25px;
					border:1px solid #b0b0b0;
				}
				.search {
					width: 70px;
					height: 26px;
					display: inline-block;
					border: 1px solid #2693d4;
					border-radius: 3px;
					text-align: center;
					color: #2693d4;
					background: #fff;
				}
				input::-ms-input-placeholder{
					text-indent:10px;
				}
				input::-webkit-input-placeholder{
					text-indent:10px;
				}

			}
		}
		.createTime {
			margin-top: 20px;
			padding-left: 2px;
			overflow: hidden;
			div:nth-child(1){
				width: 76px;
			}
			div {
				float: left;
				input {
					width: 150px;
					height: 25px;
					border: 1px solid #b0b0b0;
				}
				&:nth-child(3){
					margin-left: 16px;
				}
			}
			.el-date-editor.el-input {
				width: 150px;
			}
		}
		.goodsHead {
			height: 34px;
			margin-top: 21px;
			line-height: 34px;
			background: #f7f7f7;
			color: #3e3e3e;
			font-size: 12px;
			font-weight: bold;
			li {
				float:left;
				&.goodsName {
					margin-left: 38px;
				}
				&.price {
					margin-left: 255px;
				}
				&.number {
					margin-left: 85px;
				}
				&.totalCash {
					margin-left: 85px;
				}
				&.orderStatus {
					margin-left: 80px;
				}
				&.orderOperate {
					margin-left: 80px; 
				}
			}
		}
		.order {
			li {
				margin-top: 12px;
				border-top: 1px solid #e8e8e8;
				border-left: 1px solid #e8e8e8;
				border-right: 1px solid #e8e8e8;
				>p{
					height: 37px;
					padding-left: 23px;
					line-height: 37px;
					background: #f7f7f7;
					border-bottom: 1px solid #e8e8e8;
					.creatTime {
						margin-left: 25px;
					}
				}
				dl {
					overflow: hidden;
					dt {
						height: 68px;
						float:left;
						border-bottom: 1px solid #e8e8e8;
					}
				}
				.providerImg {
					padding-left: 12px;
				}
				.providerName {
					width: 100px;
					padding-left: 11px;
					line-height: 25px;
				}
				.unitPrice {
					width: 130px;
					text-align: center;
					padding-left: 125px;
					line-height: 68px;
				}
				.buyNum {
					width: 102px;
					text-align: center;
					line-height: 68px;
					border-right: 1px solid #e8e8e8;
				}
				.totalPrice {
					width: 148px;
					text-align: center;
					line-height: 68px;
					color: #2693d4;
					border-right: 1px solid #e8e8e8;
				}
				.status {
					padding: 0 25px;
					line-height: 68px;
					color: #2693d4;
					border-right: 1px solid #e8e8e8;
				}
				.clear-wrap {
					overflow: hidden;
					position: relative;
				}
				.service {
					float: left;
				}
				.operate {
					width: 120px;
					height: 100%;
					right: 0;
					text-align: center;
					position: absolute;
					box-sizing: border-box;
					border-bottom: 1px solid #e8e8e8;
					>div {
						width: 100px;
						height: 40px;
						position: absolute;
						margin: auto;
						left: 0;
						right: 0;
						top: 0;
						bottom: 0;
					}
					.pay {
						width: 56px;
						height: 23px;
						margin: 0 auto;
						border: 1px solid #2693d4;
						border-radius: 4px;
						color: #2693d4;
					}
					.delete {
						color: #F00;
						cursor: pointer;
					}

				}
			}
		}
		
	}
</style>