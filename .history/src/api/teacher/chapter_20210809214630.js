import request from '@/utils/request' //引入已经封装好的axios 和 拦截器

export default {
    //1、添加课程信息
    addCourseInfo(courseInfo){
        return request({
            url:"/eduService/course/addCourseInfo",
            method: 'post',
            data: courseInfo,
        })
    },
    //根据课程id获取章节和小节数据列表
    getChapterVideoByCourseId(courseId){
        return request({
            url:`/eduservice/edu-chapter/getChapterVideo/${courseId}`,
            method: 'get',
        })
    },
    
}