import request from '@/utils/request' //引入已经封装好的axios 和 拦截器

export default{
    //1、讲师列表（多条件分页查询）
    //page：当前页，limit：每页记录数，teacherQuery：条件对象
    getTeacherListPage(page,limit,teacherQuery){
        return request({
            // url: '/eduservice/edu-teacher/pageTeacherCondition/'+page+'/'+limit,
            url: `/eduService/teacher/pageTeacherCondition/{current}/{limit}`,
            method: 'post',
            //teacherQuery条件对象，如果后端使用RequestBody获取数据
            //data表示把对象转换成json对象进行传递到接口里
            data: teacherQuery
          })
    }
}