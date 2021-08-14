import request from '@/utils/request' //引入已经封装好的axios 和 拦截器

export default {
    //添加章节
    addChapter(chapter) {
        return request({
            url: `/eduService/chapter/addChapter`,
            method: `post`,
            data: chapter
        })
    },
    
    
}