
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class ProfileService {



    async getProfile(id) {
        const res = await api.get('api/profiles/' + id)
        logger.log("[get profile]", res.data)
        AppState.profile = res.data
        logger.log(AppState.profile)
    }



}
export const profileService = new ProfileService()