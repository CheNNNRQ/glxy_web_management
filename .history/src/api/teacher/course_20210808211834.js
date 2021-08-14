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
    getAllTeacher(){
        return request({
            url:"/eduservice/edu-teacher/findAll",
            method: 'get',
        })
    }
}