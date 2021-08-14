<template>
  <div class="app-container">讲师列表</div>
</template>

<script>
//引入要调用的方法，teacher.js文件
import teacher from "@/api/teacher/teacher.js";

export default {
  //写核心代码位置
  data() {
    //1、定义变量和初始值
    return {
      list: null, //查询之后给接口返回的数据装的集合
      current: 1, //当前页
      limit: 10, //每页显示记录数
      teacherQuery: {}, //条件封装对象
      total: 0, //总记录数
    };
  },
  created() {
    //页面渲染之前执行，调用method定义的方法
    //调用
    this.getList();
  },
  methods: {
    //调用具体的方法，调用teacher.js定义的方法
    //讲师列表的方法
    getList() {
      teacher
        .getTeacherListPage(this.page, this.limit, this.teacherQuery)
        .then((resp) => {
          //resp接口返回的数据
          // console.log(resp);
          this.list = resp.data.rows;
          console.log(this.list);
          this.total = resp.data.total;
          console.log(this.total);
        }) //请求成功
        .catch((err) => {
          console.log(err);
        }); //请求失败
    },
  },
};
</script>

<style></style>