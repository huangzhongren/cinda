<template>
    <div>
        <div class="success_up">
            <a>首页/支付</a>
            <span>支付成功</span>
            <div class="up_border"></div>
        </div>
        <div class="success_down">
            <div class="down_img">
                <img src="../assets/pay/success.png">
            </div>
            <div class="down_txt">
                <a class="a1">支付成功！</a>
                <a class="a2">我们将尽快确认您的（订单号：S7163637282821）付款信息。</a>
                <span class="span_txt">如有问题，请联系客服：<a class="a3">010-83421842</a></span>
            </div>
        </div>
    </div>
</template>
<style lang="less">
.success_up {
    width: 1201px;
    height: 88px;
    margin: 0 auto;
    padding-top: 25px;
    a {
        font-size: 14px;
        color: #686868;
    }
    span {
        font-size: 14px;
        color: #64aadb;
        margin-top: 20px;
        display: block;
    }
    .up_border {
        width: 1201px;
        height: 1px;
        background-color: #bdbdbd;
        margin-top: 9px;
    }
}

.success_down {
    margin-top: 12px;
    margin: 0 auto;
    width: 1201px;
    height: 382px;
    background-color: #f7f7f7;
    margin-bottom: 207px;
    overflow: hidden;
    .down_img {
        width: 125px;
        height: 116px;
        float: left;
        margin-left: 199px;
        margin-top: 138px;
        img {
            width: 125px;
            height: 116px;
        }
    }
    .down_txt {
        float: left;
        margin-left: 79px;
        margin-top: 119px;
        .a1 {
            font-size: 30px;
            color: #2693d4;
            display: block;
        }
        .a2 {
            font-size: 18px;
            color: #010101;
            display: block;
            margin-top: 30px;
        }
        .span_txt {
            font-size: 14px;
            color: #010101;
            display: block;
            margin-top: 15px;
            .a3 {
                font-size: 18px;
            }
        }
    }
}
</style>
