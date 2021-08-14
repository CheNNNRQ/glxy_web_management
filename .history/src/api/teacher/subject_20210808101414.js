import request from '@/utils/request' //引入已经封装好的axios 和 拦截器

export default {
    //1、课程分类列表
    getSubjectListPage(current, limit, teacherQuery) {
        return request({
            // url: '/eduservice/edu-teacher/pageTeacherCondition/'+page+'/'+limit,
            url: `/eduService/teacher/pageTeacherCondition/${current}/${limit}`,
            method: 'post',
            //teacherQuery条件对象，如果后端使用RequestBody获取数据
            //data表示把对象转换成json对象进行传递到接口里
            data: teacherQuery
        })
    },
}