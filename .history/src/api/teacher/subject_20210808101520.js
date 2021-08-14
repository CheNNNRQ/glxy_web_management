import request from '@/utils/request' //引入已经封装好的axios 和 拦截器

export default {
    //1、课程分类列表
    getSubjectListPage(current, limit, teacherQuery) {
        return request({
            url: `/eduService/subject/pageTeacherCondition/${current}/${limit}`,
            method: 'get',
            // data: teacherQuery
        })
    },
}