import Vue from 'vue'
import VueRouter from 'vue-router'
import listviewapp from '../components/listviewApp.vue'
import loading from '../components/loading.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/listview',
		component: listviewapp
	},
	{
		path: '/loading',
		component: loading
	}
]

const router = new VueRouter({
	routes
})

new Vue({
	router
}).$mount('#app')