<template>
	<div id='footer' v-show='isFooter'>
		<ul class='container'>
			<li class='aboutUs'>关于我们</li>
			<li class='contactUs'>联系我们：contact@xinkeher.com</li>
			<li class='adress'>公司地址：北京市朝阳区大望路soho现代城</li>
			<li class='telephone'>官方客服电话：010-83421842</li>
		</ul>
		<p>@Copyright 2016北京信达科技有限公司 京ICP备 16211621号</p>
	</div>
</template>
<script>
import {mapGetters} from 'vuex'
	export default{
		data(){
			return {
				
			}
		},
		computed:{
			...mapGetters(['isFooter']),
		}
	}
</script>
<style lang="less">
	#footer {
		margin-top: 100px;
		background: #f8f8f8;
		font-weight: 400;
		ul {
			height: 200px;
		}
		p {
			height: 45px;
			text-align: center;
			line-height: 45px;
			font-size: 12px;
			background: #cdcccc;
		}
		.aboutUs {
			margin-top: 38px;
		}
		.contactUs {
			margin-top: 34px;
		}
		.adress {
			margin-top: 12px;
		}
		.telephone {
			margin-top: 11px;
			margin-bottom: 50px;
		}
	}
</style>