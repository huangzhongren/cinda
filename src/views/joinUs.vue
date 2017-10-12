<template>
  <div class="joinUs">
    <div class="banner">
      <img src="../assets/JoinUs/us-banner.jpg" alt="JoinUs">
    </div>
    <div class="ToJoinIn box">
      <div class="container">
        <h2>TO JOIN IN</h2>
        <div class="title">
          <h1>
            <span>服务商加盟</span>
          </h1>
        </div>
        <span class="linkUrl">www.xinda.com</span>
        <div class="join-content">
          <h3>信达提供线上精准营销方案、帮助服务商快捷、低成本的获取有效客户，为传统优质服务商插上互联网的翅膀，助力企业腾飞。</h3>
          <img src="../assets/JoinUs/join-in.jpg" alt="join-in.jpg">
        </div>
      </div>
    </div>
    <div class="receive box">
      <div class="container">
        <h2>YOU WILL RECEIVE</h2>
        <div class="title">
          <h1>
            <span>你将获得</span>
          </h1>
        </div>
        <span class="linkUrl">www.xinda.com</span>
        <ul class="receive-content">
          <li>
            <i></i>
            <span>精准的线上曝光机会</span>
          </li>
          <li>
            <i></i>
            <span>万亿市场份额</span>
          </li>
          <li>
            <i></i>
            <span>系统化的营销解决方案</span>
          </li>
          <li>
            <i></i>
            <span>各种补贴优惠</span>
          </li>
        </ul>
      </div>

    </div>
    <div class="professional box">
      <div class="container">
        <h2>PROFESSIONAL</h2>
        <div class="title">
          <h1>
            <span>哪些职业可以加盟</span>
          </h1>
        </div>
        <span class="linkUrl">www.xinda.com</span>
        <ul class="professional-content">
          <li>
            <i></i>
            <h4>工商注册</h4>
            <span>REGISTERED</span>
          </li>
          <li>
            <i></i>
            <h4>财税服务</h4>
            <span>SERVICE</span>
          </li>
          <li>
            <i></i>
            <h4>知识产权</h4>
            <span>INTELLECTUAL PROPERTY</span>
          </li>
          <li>
            <i></i>
            <h4>人力外包</h4>
            <span>HR OUTSOURCING</span>
          </li>
        </ul>
        <div class="txt">
          <h3>我们需要什么样的服务商？</h3>
          <p>在商标注册，版权专利，著作权等领域深耕多年，具有丰富的知识产权经验； 与时俱进，视野立足未来，了解创业者的需求，并乐于为创业者</p>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
  export default{}
</script>
<style lang="less">
  .joinUs {
    .box {
      padding-top: 40px;
      padding-bottom: 40px;
      text-align: center;
      .title {
        width: 306px;
        margin: 0 auto;
        border-bottom: 1px solid #ccc;
      }
      h1 {
        height: 48px;
        border: 1px solid #ccc;
        margin: 15px auto;
        line-height: 50px;
        position: relative;
        text-align: center;
        span {
          color: #ff0000;
          font-size: 30px;
          display: inline-block;
          margin-top: 12px;
          padding: 0 20px;
        }
      }
      .linkUrl {
        line-height: 20px;
      }
      &:nth-child(2n) {
        background: #fff;
        h1 {
          span {
            background: #fff;
          }
        }
      }
      &:nth-child(2n+1) {
        background: #edf0f3;
        h1 {
          span {
            background: #edf0f3;
          }
        }
      }
      i {
        vertical-align: middle;
      }
    }
    .banner {
      width: 100%;
      min-width: 1200px;
      height: 396px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .ToJoinIn {
      .join-content {
        margin-top: 45px;
      }
    }
    .receive {
      .receive-content {
        margin-top: 45px;
        display: flex;
        flex-wrap: wrap;
        li {
          width: 50%;
          height: 80px;
          margin-bottom: 50px;
          span {
            vertical-align: middle;
          }
          i {
            width: 80px;
            height: 80px;
            margin-right: 20px;
          }

          &:nth-child(1) i {
            background-image: url(../assets/JoinUs/jihui.png);
          }
          &:nth-child(2) i {
            background-image: url(../assets/JoinUs/fene.png);
          }
          &:nth-child(3) i {
            background-image: url(../assets/JoinUs/fangan.png);
          }
          &:nth-child(4) i {
            background-image: url(../assets/JoinUs/youhui.png);
          }
        }
      }
    }
    .professional {
      margin-bottom: 50px;
      .professional-content {
        margin-top: 45px;
        /*弹性盒子*/
        display: flex;
        /*盒子等距离分布*/
        justify-content:space-around;
        li {
          &:nth-child(1) i {
            background-image: url(../assets/JoinUs/gongshang.png);
          }
          &:nth-child(2) i {
            background-image: url(../assets/JoinUs/guanshui.png);
          }
          &:nth-child(3) i {
            background-image: url(../assets/JoinUs/zhishichanquan.png);
          }
          &:nth-child(4) i {
            background-image: url(../assets/JoinUs/renliwaibao.png);
          }
        }
        h4 {
          font-size: 18px;
        }
        span {
          font-size: 12px;
          color: #666;
        }
        i {
          width: 132px;
          height: 153px;
          margin-bottom: 10px;
        }
      }

      .txt {
        margin-top: 60px;
        h3 {
          line-height: 50px;
          font-size: 22px;
        }
        p {
          width: 40%;
          margin: 0 auto;
        }
      }
    }

  }

</style>
