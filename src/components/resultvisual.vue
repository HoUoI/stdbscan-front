<template>
  <el-row>
    <el-col :span="12">
      <el-card style="max-width: 500px">
        <template #header>聚簇结果可视化<el-button style="margin-left: 10px;" type="primary" plain @click="getResultVisual">开始</el-button></template>
        <img v-if="!resultVisualLoading" :src="resultVisualUrl" alt=" " style="width: 105%;" class="viewer" @load="initViewer">
        <div v-else class="loading-indicator">正在加载聚簇结果可视化...</div>
      </el-card>    
    </el-col>
    <el-col :span="12">
      <el-card style="max-width: 500px">
        <template #header>聚簇中心可视化<el-button style="margin-left: 10px;" type="primary" plain @click="getCenterVisual">开始</el-button></template>
        <img v-if="!centerVisualLoading" :src="centerVisualUrl" alt=" " style="width: 105%;" class="viewer" @load="initViewer">
        <div v-else class="loading-indicator">正在加载聚簇中心可视化...</div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import axios from 'axios';
import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';
export default {
  data() {
    return {
      resultVisualUrl: '', // 用于存储结果可视化图片的 URL
      centerVisualUrl: '',  // 用于存储中心可视化图片的 URL
      resultVisualLoading: false, // 是否正在加载结果可视化图片
      centerVisualLoading: false  // 是否正在加载中心可视化图片
    };
  },
  methods: {
    // 点击按钮获取结果可视化图片
    getResultVisual() {
      this.resultVisualLoading = true; // 设置加载状态为 true
      axios.get('http://localhost:5000/resultvisual', { responseType: 'blob' })
        .then(response => {
          const imageUrl = URL.createObjectURL(new Blob([response.data], { type: response.headers['content-type'] }));
          this.resultVisualUrl = imageUrl;
        })
        .catch(error => {
          console.error('获取结果可视化图片时出错：', error);
        })
        .finally(() => {
          this.resultVisualLoading = false; // 无论成功或失败，都要设置加载状态为 false
		  loading.value = false;
        });
    },
    // 点击按钮获取中心可视化图片
    getCenterVisual() {
      this.centerVisualLoading = true; // 设置加载状态为 true
      axios.get('http://localhost:5000/centervisual', { responseType: 'blob' })
        .then(response => {
          const imageUrl = URL.createObjectURL(new Blob([response.data], { type: response.headers['content-type'] }));
          this.centerVisualUrl = imageUrl;
        })
        .catch(error => {
          console.error('获取中心可视化图片时出错：', error);
        })
        .finally(() => {
          this.centerVisualLoading = false; // 无论成功或失败，都要设置加载状态为 false
		  loading.value = false;
        });
    },
	
	initViewer(event) {
	      const image = event.target;
	      new Viewer(image, {
	        inline: false,
	      });
	    }
	}
  };
  </script>

<style>
.loading-indicator {
  text-align: center;
  padding: 20px;
}
</style>

