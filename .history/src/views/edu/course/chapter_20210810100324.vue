<template>
  <div class="app-container">
    <h2 style="text-align: center">发布新课程</h2>
    <el-steps
      :active="2"
      process-status="wait"
      align-center
      style="margin-
bottom: 40px;"
    >
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="最终发布" />
    </el-steps>
      <ul>
      <li v-for="chapter in chapterVideoList" :key="chapter.id">
        <p>
          {{ chapter.title }}
          <span>
            <el-button type="text">添加课时</el-button>
            <el-button style="" type="text">编辑</el-button>
            <el-button type="text">删除</el-button>
          </span>
        </p>

        <ul>
          <li v-for="video in chapter.children" :key="video.id">
            {{ video.title }}
          </li>
        </ul>
      </li>
      <li>
        <!-- 视频 -->
        <ul class="chanpterList videoList">
          <li v-for="video in chapter.children" :key="video.id">
            <p>
              {{ video.title }}
              <span class="acts">
                <el-button type="text">编辑</el-button>
                <el-button type="text">删除</el-button>
              </span>
            </p>
          </li>
        </ul>
      </li>
    </ul>
    <el-form label-width="120px">
      <el-form-item>
        <el-button @click="previous">上一步</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next"
          >下 一步</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import chapter from "@/api/teacher/chapter.js";
export default {
  data() {
    return {
      saveBtnDisabled: false,
      courseId: "",
      chapterVideoList: [],
    };
  },
  methods: {
    //跳转到上一步
    previous() {
      this.$router.push({ path: "/course/info/1" });
    },
    next() {
      //跳转到第三步
      this.$router.push({ path: "/course/publish/1" });
    },
    //根据课程id查询对应的课程章节和小结
    getChapterVideoByCourseId() {
      chapter.getChapterVideoByCourseId(this.courseId).then((resp) => {
        this.chapterVideoList = resp.data.items;
      });
    },
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      this.courseId = this.$route.params.id;
      //根据课程id查询对应的课程章节和小结
      this.getChapterVideoByCourseId();
    }
  },
};
</script>

<style>
</style>