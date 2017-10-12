<template>
    <div id='app'>
        <topBar></topBar>
        <headerBar></headerBar>
        <router-view></router-view>
        <footerBar></footerBar>
    </div>
</template>
<script>
import topBar from './components/topBar.vue'
import headerBar from './components/headerBar.vue'
import footerBar from './components/footerBar.vue'
export default {
    name: 'app',
        data () {
            return {
            }
        },
        components:{
            topBar,
            headerBar,
            footerBar
        }
    }
</script>

<style lang='less'>
* {
    border:0;
    margin:0;
    padding:0;
}
.container {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
}

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 14px;
    color: #000;
}

h1, h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    list-style: none;   
}

a {
    color: #2693d4;
    text-decoration: none;
}

button {
    outline: none;
}
/*清除浮动    */
.clear:after {
    content: "";
    display: block;
    height: 0;
    clear: both;
}

/*左浮动*/
.f-left {
    float: left;
}

/*右浮动*/
.f-right {
    float: right;
}

/*设置背景图片*/
i {
    display: inline-block;
    background-repeat: no-repeat;
    background-position: center;
}
/*分页码样式*/
.page {
    margin-top: 37px;
    text-align: center;
    ul {
        display: inline-block;
        overflow: hidden;
    }
    li {
        float:left;
        text-align: center;
        line-height: 36px;
        &.prev,
        &.next {
            width: 68px;
            height: 36px;
            color: #ccc;
            border: 1px solid #ccc;
            cursor: pointer;
        }
        &.num {
            width: 39px;
            height: 36px;
            margin: 0 6px;
            border: 1px solid #2693d4;
            color: #2693d4;
        }
    }
}
.arrow(@height){
    &:after{
        content:'';
        position: absolute;
        width: 0;
        height: 0;
        top:-@height;
        border-top: 4px solid #2693d4;
        border-right: 4px solid transparent;
        border-bottom: 4px solid transparent;
        border-left: 4px solid transparent;
    };
}
</style>
