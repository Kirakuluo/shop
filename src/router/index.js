import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('views/login/Login.vue')
const Home = () => import('views/home/Home.vue')

Vue.use(VueRouter)

const routes = [
	{
		path: '',
		redirect: '/login'
	},
	{
		path: '/login',
		component: Login
	},
	{
		path: '/home',
		component: Home
	}
]

const router = new VueRouter({
	routes,
	mode: 'history'
})

router.beforeEach((to, form, next) => {
	if(to.path == '/login') return next()
	const tokenStr = window.sessionStorage.getItem('token')
	if(!tokenStr) return next('/login')  //没有token 强制next('/login')
	next()  //反之有token  下一步
})
export default router