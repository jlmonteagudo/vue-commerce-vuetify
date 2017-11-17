import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'

Vue.use(Router)

function load (component) {
  return () => import(`@/components/${component}.vue`)
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: load('Hello')
    },
    {
      path: '/product',
      name: 'ListProduct',
      component: load('product/ListProduct')
    },
    {
      path: '/product/new',
      name: 'NewProduct',
      component: load('product/NewProduct')
    },
    {
      path: '/product/:id/edit',
      name: 'EditProduct',
      component: load('product/EditProduct')
    }
  ]
})
