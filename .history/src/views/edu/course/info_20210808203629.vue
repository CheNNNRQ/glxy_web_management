<template>
  <div class="app-container">
    <h2 style="text-align: center">发布新课程</h2>
    <el-steps
      :active="1"
      process-status="wait"
      align-center
      style="margin-
bottom: 40px;"
    >
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="最终发布" />
    </el-steps>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      saveBtnDisabled:false,
    };
  },
  methods: {
    next() {
        //跳转到第二步
      this.$router.push({path:'/course/chapter/1'})
    },
  },
  created(){

  },
  
};
</script>

<style></style>