
import { createRouter, createWebHistory } from 'vue-router';
import App from '../App.vue';
import first from '../components/first.vue';
import cluster from '../components/cluster.vue';
import resultvisual from '../components/resultvisual.vue';
import datavisual from '../components/datavisual.vue';//这里的import跟导入意思有点不一样
const routes = [
  {
    path: '/first',
    component: first,
	
  },
  {
    path: '/cluster',
    component: cluster,
	
  },
  {
    path: '/resultvisual',
    component: resultvisual
  },
  {
    path: '/datavisual',
    component: datavisual
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
