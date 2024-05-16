<template>
  <div class="menu-wrapper">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1" style="font-size: 18px;"><router-link to='/first'>首页</router-link></el-menu-item>
      <el-menu-item index="2" style="font-size: 18px;"><router-link to='/datavisual'>数据集可视化</router-link></el-menu-item>
      <el-menu-item index="3" style="font-size: 18px;"><router-link to='/cluster'>聚类</router-link></el-menu-item>
      <el-menu-item index="4" style="font-size: 18px;"><router-link to='/resultvisual'>聚类结果可视化</router-link></el-menu-item>
    </el-menu>
    <div class="title-logo-wrapper">
          <div class="title-wrapper">
    		    <h1 tag="b" size="large" class="title" type="primary">分布式时空聚类</h1>
          </div>
          <div class="img-wrapper">
            <img
              src="./assets/mylogo.png"
              style="width: 25%"
            />
          </div>
	</div>
	</div>
  <div class="h-6" />
  <!-- 显示当前路由对应的组件 -->
  <router-view ></router-view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style scoped>


.el-menu-demo {
  flex: 1; /* 让菜单占据剩余的空间 */
  max-width: 1000px; /* 设置菜单的最大宽度 */
}

.menu-wrapper {
  display: flex;
  align-items: center;
}

.title-logo-wrapper {
  display: flex;
  align-items: center;
}

.img-wrapper {
  flex: 1; /* 让图片占据剩余的空间 */
}

.title-wrapper {
  flex: 2; /* 让标题占据更多的空间 */
}
.title {
  font-size: 30px;
  font-family: 'Microsoft YaHei', sans-serif; /* 设置字体 */
  color: lightskyblue; /* 设置颜色 */
  text-shadow: 2px 2px 2px rgba(199, 255, 249, 0.5); /* 添加阴影 */
  letter-spacing: 4px; /* 设置字母间距 */
  text-align: center;
}

.el-menu-demo a {
  text-decoration: none; /* 去掉链接下划线 */
}
</style>
