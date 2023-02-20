import {
    createRouter,
    createWebHashHistory
} from 'vue-router'

import Index from '~/pages/index.vue'
import About from '~/pages/about.vue'
import NotFound from '~/pages/404.vue'
import Login from '~/pages/login.vue'

// 2.定义一些路由
const routes = [
    { path: "/", component: Index, name: "index"},
    { path: "/about", component: About, name: "about"},
    { path: "/login", component: Login, name: "login"},
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]


// 3.创建路由实例并传递 `routes` 配置
const router = createRouter({
    history: createWebHashHistory(),
    routes
}) 


// 4.暴露出去
export default router