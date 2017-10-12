import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/index.vue'
import Validate from '../views/validate.vue'
import Forgetpd from '../views/forgetPd.vue'
import Register from '../views/register.vue'
import Joinus from '../views/joinUs.vue'
import Shop from '../views/shopList.vue'
import Goodslist from '../views/goodsList.vue'
import Goodslists from '../views/goodsLists.vue'
import Goodsdetails from '../views/goodsDetails.vue'
import Cart from '../views/cart.vue'
import Vipcenter from '../views/vipCenter.vue'
import Myorder from '../components/myOrder.vue'
import Evalution from '../components/evalution.vue'
import Settings from '../components/accountSet.vue'
import Orderdetails from '../views/orderDetails.vue'
import Failpay from '../views/failPay.vue'
import Shopindex from '../views/shopIndex.vue'
import success from '../views/success.vue'
Vue.use(Router)
//暴露出路由
export default new Router({
    routes: [
        {
            path: '/index',
            name: 'index',
            component: Index
        },
        {
            path: '/validate',
            name: 'validate',
            component: Validate
        },
        {
            path: '/forgetPd',
            name: 'forgetPd',
            component: Forgetpd
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/joinUs',
            name: 'joinUs',
            component: Joinus
        },
        {
            path: '/shop',
            name: 'Shop',
            component: Shop
        },
        {
            path: '/goodsdetails/:goodsId',
            name: 'goodsdetails',
            component: Goodsdetails
        },
        {
            path: '/goodsList/:type',
            name: 'goodsList',
            component: Goodslist
        },
        {
            path: '/goodsLists/:type',
            name: 'goodsLists',
            component: Goodslists
        },
        {
            path:'/',
            redirect:'/index'
        },
        {
            path:'/cart',
            name:'cart',
            component:Cart
        },
        {
            path:'/vipCenter',
            name:'Vipcenter',
            component:Vipcenter,
            redirect:'/vipCenter/myOrder',
            children:[
                {path:'myOrder',component:Myorder},
                {path:'evalution',component:Evalution},
                {path:'accountSet',component:Settings},
            ]
        },
        {
            path: '/orderDetails/:orderId',
            name: 'orderDetails',
            component: Orderdetails
        },
        {
            path: '/failPay',
            name: 'failPay',
            component: Failpay
        },
        {
            path: '/shopIndex/:shopId',
            name: 'shopIndex',
            component: Shopindex
        },
        {
            path: '/success',
            name: 'success',
            component: success
        }

    ]
})
