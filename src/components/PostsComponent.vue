<template>
  <div class="component w-75">
    <div class="card">
      <div class="card-body">
        <div
          v-if="account.id == posts.creatorId"
          class="d-flex justify-content-end mdi mdi-close-thick mdi-24px"
          @click="deletePost"
        ></div>
        <div class="col-md-3" v-if="posts.creator">
          <router-link
            :to="{ name: 'profile', params: { id: posts.creatorId } }"
          >
            <img
              :src="posts.creator.picture"
              alt="user photo"
              hieght="100px"
              class="rounded-circle selectable ms-3"
            />
          </router-link>
        </div>
        <div class="row">
          <div class="col-md-9 d-flex">
            <div>
              <h2>{{ posts.creator.name }}</h2>
              <h6 class="text-info">{{ posts.createdAt }}</h6>
              <img
                class="img-fluid"
                v-if="posts.imgUrl !== ''"
                :src="posts.imgUrl"
                alt=""
              />
            </div>
          </div>
        </div>
        <p class="m-3">
          {{ posts.body }}
        </p>
        <div class="d-flex justify-content-start">
          <i
            @click="like()"
            class="mdi mdi-heart-multiple-outline selectable mdi-48px"
          >
          </i>
        </div>
        <div>
          {{ posts.likes.length }}
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { AppState } from "../AppState";
import { computed, reactive, onMounted } from "vue";
import { postService } from "../services/PostService";
import Pop from "../utils/Pop";
export default {
  props: {
    posts: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    return {
      async like() {
        try {
          await postService.like(props.posts.id);
          await postService.getAll();
        } catch (error) {
          Pop.toast(error.message);
        }
      },
      async deletePost() {
        try {
          if (
            await Pop.confirm(
              "Do you want delete this post? ",
              "",
              "info",
              "yes."
            )
          )
            await postService.deletePost(props.posts.id);
        } catch (error) {
          Pop.toast(error.message, "error");
        }
      },
      account: computed(() => AppState.account),
    };
  },
};
</script>


<style lang="scss" scoped>
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
</style>