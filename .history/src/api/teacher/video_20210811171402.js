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
    //根据id查询章节
    updateChapterById(chapterId) {
        return request({
            url: `/eduService/chapter/getChapterInfo/${chapterId}`,
            method: `get`,
        })
    },
    //修改章节
    updateChapter(chapter) {
        return request({
            url: `/eduService/chapter/updateChapter`,
            method: `post`,
            data: chapter
        })
    },
    //删除章节
    deleteById(chapterId) {
        return request({
            url: `/eduService/chapter/deleteChapter/${chapterId}`,
            method: `delete`,
        })
    },
    
}