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
      <!-- 课程简介-->
      <el-form-item label="课程简介">
        <tinymce :height="300" v-model="courseInfo.description" />
      </el-form-item>

      <!-- 课程封面-->
      <el-form-item label="课程封面">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :action="BASE_API + '/eduoss/fileoss/upload'"
          class="avatar-uploader"
        >
          <img :src="courseInfo.cover" />
        </el-upload>
      </el-form-item>

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
import Tinymce from "@/components/Tinymce";
export default {
  components: { Tinymce },
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
        cover:
          "https://diodi-college.oss-cn-beijing.aliyuncs.com/2021/08/09/a6955f1708b34829925a1e33199332d603DD07B46CBF3F9EA9BE35CB060861CB.jpg",
        price: 0,
      },
      courseId: "",
      BASE_API: process.env.BASE_API, // 接口API地址
      teacherLists: [], //封装所有讲师数据
      subjectOneList: [], //封装所以一级分类数据
      subjectTwoList: [], //封装二级分类数据
    };
  },
  methods: {
    //查询课程分类
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
    //点击某个一级分类，触发change，显示对应二级分类
    subjectLevelOneChanged(value) {
      //value就是一级分类id值
      //遍历所有的分类，包含一级和二级
      for (var i = 0; i < this.subjectOneList.length; i++) {
        //每个一级分类
        var oneSubject = this.subjectOneList[i];
        //判断：所有一级分类id 和 点击一级分类id是否一样
        if (value === oneSubject.id) {
          //从一级分类获取里面所有的二级分类
          this.subjectTwoList = oneSubject.children;
          //把二级分类id值清空
          this.courseInfo.subjectId = "";
        }
      }
    },
    //上传封面成功调用的方法
    handleAvatarSuccess(res, file) {
      this.courseInfo.cover = res.data.url;
    },
    //上传之前调用的方法
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //获取课程信息
    getCourseInfo() {
      course.getCourseInfoById(this.courseId).then((resp) => {
        this.courseInfo = resp.data.courseInfoVo;
        //查询所有分类，包含一级和二级所有
        subject.getSubjectListPage().then((resp) => {
          //获取所有一级分类
          this.subjectOneLists = resp.data.list;
          

          //把所有一级分类数组进行遍历
          for (var i = 0; i < this.subjectOneLists.length; i++) {
            //获取每个一级分类
            var oneSubject = this.subjectOneLists[i];
            //比较当前courseInfo里面的一级分类id和所有的一级分类id是否一样
            if (this.courseInfo.subjectParentId == oneSubject.id) {
              //获取一级分类中所有的二级分类
              this.subjectTwoLists = oneSubject.children;
              
            }
          }
        
        });
        //初始化所有讲师
        this.getListTeacher();
      });
    },
  },
  created() {
    //判断路径中是否有课程id
    if (this.$route.params && this.$route.params.id) {
      this.courseId = this.$route.params.id;
      //根据课程id 查询课程基本信息
      this.getCourseInfo();
      
    } else {
      //初始化所有讲师
      this.getListTeacher();
      //初始化一级分类
      this.getOneSubject();
    }
  },
  watch: {
    $route(to, from) {
      //路由变化方式，当路由发送变化，方法就执行
      this.courseInfo = {};
    },
  },
};
</script>


<style scoped>
.tinymce-container {
  line-height: 29px;
}
</style>