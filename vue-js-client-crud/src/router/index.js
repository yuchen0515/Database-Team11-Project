import Vue from 'vue'
import VueRouter from 'vue-router'
// import Cookies from 'js-cookie'
// import Session from ''

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    alias: 'Home',
    name: 'Home',
    meta: {requireAuth: true},
    component: () => import('../views/Home.vue')
  },
  {
    path: '/Memo',
    name: 'Memo',
    meta: {requireAuth: true},
    component: () => import('@/views/Memo.vue')
  },
  {
    path: '/Poject',
    name: 'Project',
    meta: {requireAuth: true},
    component: () => import('@/views/Project.vue')
  },
  {
    path: '/Calendar',
    name: 'Calendar',
    meta: {requireAuth: true},
    component: () => import('@/views/Calendar.vue')
  },
  {
    path: '/about',
    name: 'About',
    meta: {requireAuth: false},
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    meta: {requireAuth: false},
    component: () => import('@/views/Login.vue')
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach(async(to, from, next) => {
//   // 看看 to 和 from 兩個 arguments 會吐回什麼訊息
//   console.log('to: ', to)
//   console.log('from: ', from)
  
//   // 目的路由在meta上是否有設置requireAuth: true
//   if (to.meta.requireAuth) {
//     // 獲取Cookies當中的login資訊並取得token
//     const info = Cookies.get('login')
//     const token = JSON.parse(info).token
//     console.log(token)
//     if (info) {
//       // 如果token不為空，且確實有這個欄位則讓路由變更
//       if (token.length > 0 || token === undefined) {
//         next()
//       } else {
//         // 未通過則導回login頁面
//         next({ name: 'Login' })
//       }
//     } else {
//       next({ name: 'Login' })
//     }
//   } else {
//     next()
//   }
// })

export default router
