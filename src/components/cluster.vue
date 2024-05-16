<template>
<el-row>
    <el-col :span="14">
		<el-card style="width: 90%">
		<template #header>参数设置</template>
		<el-row>
		 	<el-col :span="4"><el-text size="default" class="canshu" type="default">Dataset</el-text></el-col>
		 	<el-col :span="8">
		 		<el-select v-model="form.dataset" placeholder="Select dataset" style="width: 150px">
		         <el-option label="TDrive_ESP (9k)" value="TDrive_ESP" />
		         <el-option label="TDrive_CubeSP_KL (9k)" value="TDrive_CubeSP_KL" />
				 <el-option label="TDrive_CubeSP_Greedy (9k)" value="TDrive_CubeSP_Greedy" />
				 <el-option label="NYTrip (20w)" value="NYTrip" />
				 <el-option label="chengdu (10w)" value="chengdu" />
				 
				</el-select>
		 	</el-col>
			<el-col :span="4"><el-text size="default" class="canshu" type="default">Eps1</el-text>
			</el-col>
			<el-col :span="8"><el-input v-model="eps1" style="width: 150px" placeholder="Please input" />
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="4"><el-text size="default" class="canshu" type="default">Eps2</el-text></el-col>
			<el-col :span="8"><el-input v-model="eps2" style="width: 150px" placeholder="Please input" /></el-col>
			<el-col :span="4"><el-text size="default" class="canshu" type="default">MinPts</el-text></el-col>
			<el-col :span="8"><el-input v-model="minpts" style="width: 150px" placeholder="Please input" /></el-col>
		</el-row>
		<el-row>
			<el-col :span="4"><el-text size="default" class="canshu" type="default">k</el-text></el-col>
			<el-col :span="8"><el-input v-model="k" style="width: 150px" placeholder="Please input" /></el-col>
			<el-col :span="4"><el-text size="default" class="canshu" type="default">x_bounding</el-text></el-col>
			<el-col :span="8"><el-input v-model="x_bounding" style="width: 150px" placeholder="Please input" /></el-col>
		</el-row>
		<el-row>
			<el-col :span="4"><el-text size="default" class="canshu" type="default">y_bounding</el-text></el-col>
			<el-col :span="8"><el-input v-model="y_bounding" style="width: 150px" placeholder="Please input" /></el-col>
			<el-col :span="4"><el-text size="default" class="canshu" type="default">t_bounding</el-text></el-col>
			<el-col :span="8"><el-input v-model="t_bounding" style="width: 150px" placeholder="Please input" /></el-col>
		</el-row>
		<el-row >
			<el-col :span="8"></el-col>
			<el-col :span="8"><el-button class="clusterbutton" type="primary" plain @click="cluster" :loading="loading">开始聚类</el-button></el-col>
			<el-col :span="8"></el-col>
		</el-row>
		</el-card>		
	</el-col>
    <el-col :span="10">
		<el-card style="width: 70%">
		    <template #header>聚类结果</template>
		    <el-text class="text1" size="default" type="default" style="display: block; margin-bottom: 20px;">算法执行时间 : {{ totaltime }}</el-text>
		    <el-text class="text1" size="default" type="default" style="display: block; margin-bottom: 20px;">聚簇总数 : {{ totalcluster }}</el-text>
			<el-table :data="tableData" height="230" style="width: 100%">
			    <el-table-column prop="id" label="聚簇ID" width="160" />
			    <el-table-column prop="sum" label="点数" width="160" />
			</el-table>
		</el-card>
	</el-col>
</el-row>
</template>


<script lang="ts" setup>
import { reactive, watch, ref } from 'vue';
import axios from 'axios';

// do not use same name with ref
const form = reactive({
  dataset: '',
})
const tableData = ref([]);
const eps1 = ref('');
const eps2 = ref('');
const minpts = ref('');
const k = ref('');
const x_bounding = ref('');
const y_bounding = ref('');
const t_bounding = ref('');
const totaltime = ref('');
const totalcluster = ref('');
const allcluster = ref([]);
const loading = ref(false);

function cluster(){
	
	loading.value = true;
	axios.get('http://localhost:5000/cluster', 
	{params:{dataset:form.dataset,eps1:eps1.value,eps2:eps2.value,minpts:minpts.value,
	k:k.value,x_bounding:x_bounding.value,y_bounding:y_bounding.value,t_bounding:t_bounding.value}})
			.then(response => {
			  totaltime.value= response.data['totaltime']
			  totalcluster.value= response.data['totalcluster']
			  allcluster.value= response.data['allcluster']
			  let index = 1;
			  tableData.value = [];
			  allcluster.value.forEach(clusterStr => {
			    const parts = clusterStr.split(': '); // 按冒号空格分割字符串
			    const clusterId = parts[0].split(' ')[0]+' '+index // 提取聚类 ID
			    const pointCount = parts[1] // 提取点数，并转为整数
			    tableData.value.push({ id: clusterId, sum: pointCount });
				index++;
			  });
			  
			  console.log('数据发送成功：', response.data);
			})
			.catch(error => {
			  console.error('发送数据时出错：', error);
			})
			.finally(() => {
			  loading.value = false; // 无论成功或失败，都要设置加载状态为 false
			});
}

// 监听 dataset 的变化，根据不同的 dataset 设置不同的推荐参数
watch(form, (newValue) => {
    if (newValue.dataset === 'TDrive_ESP'||newValue.dataset === 'TDrive_CubeSP_Greedy'||newValue.dataset === 'TDrive_CubeSP_KL') {
        eps1.value = '0.008';
        eps2.value = '1000';
        minpts.value = '40';
        k.value = '10';
        x_bounding.value = '0.05';
        y_bounding.value = '0.05';
        t_bounding.value = '3500';
    } else if (newValue.dataset === 'chengdu') {
        eps1.value = '0.005';
        eps2.value = '200';
        minpts.value = '100';
        k.value = '100';
        x_bounding.value = '0.04';
        y_bounding.value = '0.04';
        t_bounding.value = '50';
    }
});
</script>


<style>
.el-row {
  margin-bottom: 30px;
}

.el-col {
  border-radius: 4px;
}

.canshu{
	line-height: 30px;
	display: flex;
	justify-content: center;
}
.clusterbutton{
	text-align: right; /* 使按钮聚类居中 */
}
.text1{
	font-size: 15px; /* 使按钮聚类居中 */
}
</style>

