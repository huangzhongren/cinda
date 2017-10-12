<template>
	<div class="content">
		<div class="home-pay">
			<P>首页/支付</P>
		</div>
		<div class="fail-pay">
			<P>支付失败</P>
		</div>
		<div class="line">
		</div>
		<div class="failPay">
			<div class="fail">
				<img src="../assets/pay/fail.png">
			</div>
			<div class="failPay-text">
				<div class="failPay-title">
					支付失败
				</div>
				<div class="again">
					<div class="again-pay">
						支付未成功！让我们再试一次吧！
					</div>
					<div class="return-pay">
						返回支付页
					</div>
				</div>
				<div class="issue">
					<div class="service">
						如有问题，请联系客服：
					</div>
					<div class="tel">
						010-83421842
					</div>
				</div>
			</div>
		</div>

	</div>
</template>
<script>
	export default{
		
	}
</script>
<style lang='less' scoped>
.content{
	width:1200px;
	margin:0 auto;
	.home-pay{
		font-size: 14px;
		color: #060606;
		margin-top: 25px;
	}
	.fail-pay{
		font-size: 14px;
		color: #2693d4;
		margin-top: 25px;
	}
	.line{
		margin-top:9px;
		height:1px;
		width:1200px;
		background-color:#bcbdbd;
	}
	.failPay{
		width:1200px;
		height:381px;
		background-color: #f7f7f7;
		margin-top: 12px;
		overflow: hidden;
		.fail{
			padding-top:126px;
			margin-left:194px;
			float: left;

		}
		.failPay-text{
			padding-top:126px;
			padding-left:80px;
			float: left;
			overflow: hidden;
			.failPay-title{
				font-size:30px;
				color:#2693d4;
			

			}
			.again{
				overflow: hidden;
				.again-pay{
					margin-top:36px;
					float: left;
					font-size:18px;
					color:#010101;
				}
				.return-pay{
					margin-top:28px;
					float: left;
					width:124px;
					height:34px;
					border-radius:4px;
					border: 1px solid #2693d4;
					text-align: center;
					line-height: 34px;
					color:#2693d4;
				}
			}
			.issue{
				overflow: hidden;
				.service{
					margin-top: 17px;
					font-size: 14px;
					color:010101;
					float: left;
				}
				.tel{
					margin-top: 11px;
					font-size: 22px;
					color:010101;
					float: left;
				}

			}
		}
	}
}
</style>