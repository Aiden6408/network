import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"







class PostService {

    async getAll(query = {}) {
        const res = await api.get('api/posts', { params: query })
        logger.log('[ get all posts]', res.data)
        AppState.posts = res.data.posts


    }

    async createPost(postData) {
        const res = await api.post('api/posts', postData)
        logger.log(res.data)
        AppState.posts.unshift(res.data)

    }


    async deletePost(id) {
        const res = await api.delete('api/posts/' + id)
        logger.log(res.data)
        AppState.posts = AppState.posts.filter(p => p.id != id)

    }

    async like(id) {
        await api.post(('api/posts/' + id + '/like'))

    }

}


export const postService = new PostService()
