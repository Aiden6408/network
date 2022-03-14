
<template>
  <form class="d-flex flex-column rounded shadow p-5 bg-info">
    <label for="">name</label>
    <input v-model="editable.body" type="text" />
    <label for="">img</label>
    <input v-model="editable.imgUrl" type="text" />
    <button type="button" class="btn btn-info" @click="createPost">
      submit
    </button>
  </form>
</template>


<script>
import { AppState } from "../AppState";
import { computed, reactive, onMounted, ref, watchEffect } from "vue";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { postService } from "../services/PostService";

export default {
  setup() {
    const editable = ref({});

    watchEffect(() => {
      logger.log("change happened re-running watch effect");
      // editable.value = props.postData;
    });
    return {
      editable,
      async createPost() {
        try {
          logger.log(editable.value);
          await postService.createPost(editable.value);
          editable.value = {};
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
    };
  },
};
</script>

<style lang="scss" scoped>
</style>