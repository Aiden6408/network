<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <h6>
      <h4>Email:</h4>
      {{ account.email }}
    </h6>
  </div>
  <div class="text-center">
    <i class="mdi mdi-pencil mdi-24px myDIV hover"></i>
  </div>
  <div>
    <form class="hide d-flex rounded shadow flex-column p-5 bg-info">
      <h6>Name:</h6>
      <input v-model="account.name" type="text" />
      <h6>Graduated:</h6>
      <input v-model="account.graduated" type="text" />
      <h6>Linkedin:</h6>
      <input v-model="account.linkedin" type="text" />
      <h6>Github:</h6>
      <input v-model="account.github" type="text" />
      <h6>Profile Picture:</h6>
      <input v-model="account.picture" type="text" />
      <button
        class="btn btn-success rounded-pill mt-3 hoverable selectable"
        @onsubmit="editProfile"
      >
        submit
      </button>
    </form>
  </div>
</template>

<script>
import { AppState } from "../AppState";
import { computed, reactive, onMounted, ref, watchEffect } from "vue";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { accountService } from "../services/AccountService";
export default {
  setup() {
    const account = ref({});
    watchEffect(() => {
      account.value = AppState.account;
    });
    return {
      account,
      async editProfile() {
        try {
          await accountService.editProfile(account.value);
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
      account: computed(() => AppState.account),
      profile: computed(() => AppState.profile),
    };
  },
};
</script>
<style scoped>
img {
  max-width: 100px;
}
</style>
