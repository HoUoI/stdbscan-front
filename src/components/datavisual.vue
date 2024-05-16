<template>
	<el-card style="max-width: 1000px">
	 <template #header>数据集可视化</template>
	 <el-row>
		 <el-col :span="3"><el-text size="default" class="canshu" type="default">选择数据集</el-text></el-col>
		 <el-col :span="6">
			<el-select v-model="form.dataset" placeholder="Select dataset">
				 <el-option label="TDrive" value="TDrive" />
				 <el-option label="NYTrip" value="NYTrip" />
			</el-select>
		 </el-col>
		 <el-col :span="15">
			 <el-button type="primary" plain @click="handleStart">开始</el-button>
		 </el-col>
	 </el-row>
	 <el-row>
	 <el-col :span="14"><img :src="img1url" alt=" " style="width: 90%;"></el-col>
	 <el-col :span="10"><img :src="img2url" alt=" " style="width: 100%;"></el-col>
	 </el-row>
	</el-card>	
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import axios from 'axios';

const form = reactive({
  dataset: '',
})
const img1url = ref('');
const img2url = ref('');

const handleStart = () => {
  if (form.dataset === 'TDrive') {
    img1url.value = '../src/assets/TD_heatmap.png';
    img2url.value = '../src/assets/TD_timeslot.png';
  } else if (form.dataset === 'NYTrip') {
    img1url.value = '../src/assets/NY_heatmap.png';
    img2url.value = '../src/assets/NY_timeslot.png';
  }
}
</script>

<style>
.canshu{
	line-height: 30px;
	display: flex;
	justify-content: center;
}
</style>
