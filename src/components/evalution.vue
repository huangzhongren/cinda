<template>
	<div class="myEvalution">
		<p><span>我的评价</span></p>
		<div class='evalution' v-if="isEvaluate">
			<p>
				<span :class='no_evalution?"active":""' @click='no_evalution=true'>未评价</span
				><span :class='no_evalution?"":"active"' @click='no_evalution=false'>已评价</span>
			</p>
			<div class='content'>
				<ul class='evalutionList' v-if='no_evalution'>
					<li> 
						<div class='companyImg'>
							<img src="" alt="">
						</div>
						<div class='companyInfo'>
							<h1>信达北京服务中心</h1>
							<p class='serviceOrder'>服务单号         购买时间</p>
							<p class='buyContent'>购买内容</p>
						</div>
						<div class='goEvalute'>
							<button @click='goEvalute'>去评价</button>
						</div>
					</li>
				</ul>
				<ul class='evalutionList' v-else>
					<li>
						<div class='companyImg'>
							<img src="" alt="">
						</div>
						<div class='companyInfo'>
							<h1>信达北京服务中心</h1>
							<p class='serviceOrder'>服务单号         购买时间</p>
							<p class='buyContent'>购买内容</p>
						</div>
						<div class='Evaluted'>
							<button>已评价</button>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="to_evaluate" v-else>
	        <ul>
	            <li class="to_li1">
	                <span>服务单号 :</span>
	                <span class="a1">B1623060</span>
	                <span class="a2">购买内容:test</span>
	                <span class="a3">购买时间:2016-10-2</span>
	            </li>
	            <li class="to_li2">
	                <span>评价 :</span>
	                <div class="cb cb1" id="0" @click="check($event)">
	                    <div class="ct" v-show="isct1"></div>
	                </div>
	                <!-- <input type="radio" name="" checked> -->
	                <label for="c">好评</label>
	                <div class="cb cb2" id="1" @click="check($event)">
	                    <div class="ct" v-show="isct2"></div>
	                </div>
	                <label for="c">中评</label>
	                <div class="cb cb3" id="2" @click="check($event)">
	                    <div class="ct" v-show="isct3"></div>
	                </div>
	                <label for="c">差评</label>
	            </li>
	            <li class="to_li2 to_li3">
	                <span>评分 :</span>
	                <img src="../assets/evaluate-01.png">
	            </li>
	            <li class="to_li2 to_li4">
	                <span>感受 :</span>
	                <textarea type="text" class="input4"></textarea>
	            </li>
	        </ul>
	        <div class="submit_cli">
	            <span @click='submit'>提交</span>
	        </div>
	    </div>
	</div>
</template>
<script>
import ajax from 'axios'
	export default{
		data(){
			return {
				no_evalution:true,//未评价
				isEvaluate:true,//我的评价
				isct1:"",
				isct2:"",
				isct3:"",
			}
		},
		created(){
			this.$parent.isCur=1;
			this.getEvalution();
		},
		methods:{
			goEvalute(){//去评价
				this.isEvaluate = false;
			},
			getEvalution(){//获得评价数据
				ajax.post('/xinda-api/service/judge/grid',{
					start:0,
					limit:6,
					status:2
				}).then(res=>{
					console.log(res)
				})
			},
			check: function(e) {
                if (e.currentTarget.id == 0) {
                    this.isct1 = true;
                    this.isct2 = false;
                    this.isct3 = false;
                }
                if (e.currentTarget.id == 1) {
                    this.isct1 = false;
                    this.isct2 = true;
                    this.isct3 = false;
                }
                if (e.currentTarget.id == 2) {
                    this.isct1 = false;
                    this.isct2 = false;
                    this.isct3 = true;
                }
            },
            submit(){
            	this.isEvaluate = true;
            	this.ajax.post('xinda-api/service/judge/submit',this.qs.stringify({
            		id:1111,
					type:1,
					score:2	,
					content:1121,
					
            	})).then(res=>{
            		console.log(res)
            	})
            },
		}
	}
</script>
<style lang="less">
	.myEvalution {
		margin-left: 250px;
		>p{
			height: 32px;
			line-height: 32px;
			border-bottom: 1px solid #e9e9e9;
			span {
				width: 112px;
				height: 30px;
				display: inline-block;
				text-align: center;
				color: #2693d4;
				border-bottom: 2px solid #2693d4;
			}
		}
		.evalution {
			margin-top: 24px;
			>p {
				height: 43px;
				background: #e9e9e9;
				line-height: 43px;
				border: 1px solid #ccc;
				span {
					width: 107px;
					height: 100%;
					text-align: center;
					display: inline-block;
					cursor: pointer;
					&.active {
						color: #fff;
						background: #2693d4;
						position: relative;
						.arrow(50px);
					}
				}
			}
			.content {
				border-bottom: 1px solid #ccc;
				border-left: 1px solid #ccc;
				border-right: 1px solid #ccc;
				.evalutionList {
					li {
						padding: 28px 8px 23px 8px;
						overflow: hidden;
						div {
							float:left;
							&.companyImg {
								width: 100px;
								height: 100px;
								border: 1px solid #ccc;
							}
							&.companyInfo {
								margin-left: 12px;
								h1 {
									font-size: 16px;
									font-weight: 400;
								}
								.serviceOrder {
									margin-top: 20px;
									font-size: 12px;
								}
								.buyContent {
									margin-top: 20px;
									font-size: 12px;
								}
							}
							&.goEvalute {
								width: 100px;
								float : right;
								margin-right: 29px;
								button {
									width: 114px;
									height: 37px;
									background: #fff;
									border: 1px solid #2693d4;
									color: #2693d4;
									margin-top: 25px;
									border-radius: 4px;
								}
							}
							&.Evaluted {
								width: 100px;
								float : right;
								margin-right: 29px;
								button {
									width: 100px;
									height: 37px;
									margin-top: 25px;
									border-radius: 4px;
								}
							}
						}
					}
				}
			}
		}
		//去评价
        .to_evaluate {
            width: 782px;
            overflow: hidden;
            margin-top: 21px;
            padding-left: 20px;
            ul {
                list-style: none;
                li {
                    overflow: hidden;
                    span {
                        font-size: 12px;
                        color: #323232;
                        line-height: 21px;
                        display: block;
                        float: left;
                        height: 21px;
                    }
                    a {
                        font-size: 12px;
                        color: #323232;
                    }
                    .a2 {
                        padding-left: 91px;
                    }
                    .a3 {
                        padding-left: 71px;
                    }
                    .input4 {
                        border: 1px solid #7a7a7a;
                        width: 715px;
                        height: 137px;
                        box-sizing: border-box;
                        outline: none;
                        margin-left: 67px;
                        display: block;
                    }
                    .cb {
                        width: 13px;
                        height: 13px;
                        border: 1px solid #333333;
                        display: inline-block;
                        cursor: pointer;
                        color: #9b0e0e;
                        -webkit-border-radius: 14px;
                        border-radius: 14px;
                        position: relative;
                        .ct {
                            background: #333333;
                            width: 9px;
                            height: 9px;
                            margin-top: 2px;
                            margin-left: 2px;
                            -webkit-border-radius: 14px;
                            border-radius: 14px;
                            position: absolute;
                        }
                    }
                    label {
                        margin-left: 1px;
                    }
                    .cb:hover {
                        border: 1px solid #2693d4;
                        .ct {
                            background-color: #2693d4;
                        }
                    }
                    .cb1 {
                        margin-left: 37px;
                    }
                    .cb2 {
                        margin-left: 29px;
                    }
                    .cb3 {
                        margin-left: 38px;
                    }
                }
                .to_li2 {
                    margin-top: 24px;
                }
                .to_li3 {
                    overflow: hidden;
                    img {
                        width: 83px;
                        height: 13px;
                        margin-left: 67px;
                        display: block;
                        margin-top: 4px;
                    }
                }
                .to_li4 {
                    span {
                        display: block;
                        float: left;
                        margin-top: 2px;
                    }
                }
            }
            .submit_cli {
                width: 140px;
                height: 40px;
                background-color: #2693d4;
                border-radius: 3px;
                text-align: center;
                margin-top: 17px;
                float: right;
                span {
                    color: #fff;
                    display: block;
                    line-height: 40px;
                }
            }
        }
	}




	.arrow(@left){
	    &:after{
	        content:'';
	        position: absolute;
	        width: 0;
	        height: 0;
	        bottom:-8px;
	        left: @left;
	        border-top: 4px solid #2693d4;
	        border-right: 4px solid transparent;
	        border-bottom: 4px solid transparent;
	        border-left: 4px solid transparent;
	    };
	}
</style>