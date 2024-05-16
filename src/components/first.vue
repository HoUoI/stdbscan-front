<template>
<!-- <img src="../assets/overview.png" alt="Description"> -->
<el-row>
    <el-col :span="12">
		<el-card style="max-width: 500px;height: 450px;">
		 <template #header>算法框架</template>
		 <img
		   src="../assets/overview.png"
		   style="width: 100%"
		   class="viewer"
		 />
		</el-card>		
	</el-col>
    <el-col :span="12">
		<el-card style="max-width: 500px;height: 450px;">
		    <template #header>技术工具</template>
		    <img
		      src="../assets/tech.png"
		      style="width: 70%"
			  class="viewer"
		    />
		</el-card>
	</el-col>
  </el-row>
</template>

<script>

import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';

export default {
  mounted() {
    const images = document.querySelectorAll('.viewer');
    images.forEach(image => {
      new Viewer(image);
    });
  }
}
</script>

<style scoped>

</style>