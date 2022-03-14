<template>
  <form class="form-group row" @submit.prevent="search">
    <input
      v-model="searchTerm"
      type="text"
      class="col-9"
      placeholder="search...."
    />
    <button class="btn btn-outline-primary col-3">search</button>
  </form>
</template>


<script>
import { AppState } from "../AppState";
import { computed, reactive, onMounted, ref } from "vue";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { postService } from "../services/PostService";
export default {
  setup() {
    const searchTerm = ref("");
    return {
      searchTerm,
      async search() {
        try {
          await postService.getAll({ query: searchTerm.value });
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