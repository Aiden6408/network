<template>
  <div class="row bg-light justify-content-center">
    <div class="col-md-12">
      <img class="img-fluid coverimg" :src="profile.coverImg" />
      <div class="row justify-content-start">
        <div class="col-md-4 d-flex-justify-content-center text-white">
          <div class="title">
            <img
              class="profile-img rounded-circle elevation-4"
              :src="profile.picture"
            />
            <h1>{{ profile.name }}</h1>
            <p>{{ profile.bio }}</p>
            <p>
              {{ profile.email }}
            </p>
            <p>
              {{ profile.class }}
            </p>

            <a
              v-if="profile.graduated"
              class="mdi mdi-school mdi-48px selectable text-info"
              :href="profile.graduated"
            ></a>
            <a
              v-if="profile.github"
              class="mdi mdi-github logo mdi-48px selectable text-info"
              :href="profile.github"
            ></a>
            <a
              v-if="profile.linkedin"
              class="mdi mdi-linkedin mdi-48px selectable text-info"
              :href="profile.linkedin"
            ></a>
          </div>
        </div>
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col-8 d-flex-justiyfy-content-center">
        <PostCreate v-if="account.id == profile.id" />
        <div class="row justify-content-center">
          <div v-for="p in posts" :key="p.id">
            <PostsComponent :posts="p" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
    


<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import { onMounted, watchEffect } from "@vue/runtime-core";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { profileService } from "../services/ProfileService";
import { useRoute } from "vue-router";
import { postService } from "../services/PostService";
import "@mdi/font/css/materialdesignicons.css";
import PostCreate from "../components/PostCreate.vue";
export default {
  components: { PostCreate },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const route = useRoute();
    watchEffect(async () => {
      try {
        if (route.name == "profile") {
          await profileService.getProfile(route.params.id);
          await postService.getAll({ creatorId: route.params.id });
        }
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    });
    return {
      posts: computed(() => AppState.posts),
      profile: computed(() => AppState.profile),
      account: computed(() => AppState.account),
      async remove() {
        if (await Pop.confirm()) {
          postService.deletePost(props.posts.id);
        }
      },
    };
  },
};
</script>


  <style lang="scss" scoped>
.coverimg {
  height: 60vh;
  width: 100vw;
  object-fit: cover;
}

.title {
  position: relative;
  bottom: 475px;
  left: 150px;
}
</style>