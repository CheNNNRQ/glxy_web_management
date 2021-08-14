.<template>
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
    <el-form label-width="120px">
      <el-form-item label="课程标题">
        <el-input
          v-model="courseInfo.title"
          placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"
        />
      </el-form-item>

      <!-- 所属分类 -->
      <el-form-item label="课程分类">
        <el-select
          v-model="courseInfo.subjectParentId"
          placeholder="一级分类"
          @change="subjectLevelOneChanged"
        >
          <el-option
            v-for="subject in subjectOneList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>

        <!-- 二级分类 -->
        <el-select v-model="courseInfo.subjectId" placeholder="二级分类">
          <el-option
            v-for="subject in subjectTwoList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>
      </el-form-item>
      <!--课程讲师-->
      <el-form-item label="课程讲师">
        <el-select v-model="courseInfo.teacherId" placeholder="请选择">
          <el-option
            v-for="teacher in teacherLists"
            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="总课时">
        <el-input-number
          :min="0"
          v-model="courseInfo.lessonNum"
          controls-position="right"
          placeholder="请填写课程的总课时数"
        />
      </el-form-item>

      <!-- 课程简介 TODO -->
      <el-form-item label="课程简介">
        <el-input v-model="courseInfo.description" placeholder="" />
      </el-form-item>

      <!-- 课程封面 TODO -->

      <el-form-item label="课程价格">
        <el-input-number
          :min="0"
          v-model="courseInfo.price"
          controls-position="right"
          placeholder="免费课程请设置为0元"
        />
        元
      </el-form-item>

      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdate"
          >保存并下一步</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import course from "@/api/teacher/course.js";
import subject from "@/api/teacher/subject.js";
export default {
  data() {
    return {
      saveBtnDisabled: false,
      courseInfo: {
        title: "",
        subjectId: "",
        subjectParentId: "",
        teacherId: "",
        lessonNum: 0,
        description: "",
        cover: "",
        price: 0,
      },
      BASE_API: process.env.BASE_API, // 接口API地址
      teacherLists: [], //封装所有讲师数据
      subjectOneLists: [], //封装所以一级分类数据
      subjectTwoLists: [], //封装二级分类数据
    };
  },
  methods: {
    getListTeacher() {
      course.getAllTeacher().then((resp) => {
        this.teacherLists = resp.data.items;
        
      });
    },
    saveOrUpdate() {
      course.addCourseInfo(this.courseInfo).then((resp) => {
        this.$message({
          message: "添加课程信息成功",
          type: "success",
        });
        //跳转到第二步，并带着这个课程生成的id
        this.$router.push({ path: "/course/chapter/" + resp.data.courseId });
      });
    },
    //查询所有的一级分类
    getOneSubject() {
      subject.getSubjectListPage().then((response) => {
        this.subjectOneList = response.data.list;
      });
    },
  },
  created() {
    //初始化所有讲师
    this.getListTeacher();
    //初始化一级分类
    this.getOneSubject();
  },
};
</script>

<style>
</style>
