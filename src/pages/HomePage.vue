<template>
  <div class="row justify-content-center">
    <div
      v-for="p in posts"
      :key="p.id"
      class="col-7 my-3 d-flex justify-content-center"
    >
      <PostsComponent :posts="p" />
    </div>
    <div></div>
  </div>
  <div class="row d-flex justify-content-center">
    <div class="col-2 my-3 d-flex"></div>
  </div>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { postService } from "../services/PostService";
import { AppState } from "../AppState";
import PostsComponent from "../components/PostsComponent.vue";
import { signsService } from "../services/SignsService";

export default {
  components: { PostsComponent },
  name: "Home",

  setup() {
    onMounted(async () => {
      try {
        await postService.getAll();
      } catch (error) {
        logger.log(error);
        Pop.toast(error.message, "error");
      }
    });
    return {
      async getAll(props) {
        await postService.getAll(props);
      },
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.account),
      profile: computed(() => AppState.profile),
    };
  },
};
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card {
    width: 50vw;
    > img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
