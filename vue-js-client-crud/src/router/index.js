import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
// import Cookies from 'js-cookie'
// import Session from ''

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    alias: 'Home',
    name: 'Home',
    meta: {requireAuth: true, reloadProject: true},
    component: () => import('../views/Home.vue'),
    // beforeEnter: function (to, from, next) {
    //   // console.log('Hello beforeEnter.');
    //   store.dispatch("loadProject", "");
    //   next();
    // },
  },
  {
    path: '/Memo',
    name: 'Memo',
    meta: {requireAuth: true},
    component: () => import('@/views/Memo.vue')
  },
  {
    path: '/Project',
    name: 'Project',
    meta: {requireAuth: true, reloadProject: true},
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
  // {
  //   path: '*',
  //   redirect: '/'
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async(to, from, next) => {
  console.log('to: ', to)
  console.log('from: ', from)
  
  document.title = to.name

  if (to.meta.requireAuth) {
    if(store.state.username){
      next()
    } else {
      next({ name: 'Login'})
    }
  } else {
    next()
  }
})

export default router
