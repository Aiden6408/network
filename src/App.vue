<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
    <div
      class="offcanvas offcanvas-start"
      tabindex="-1"
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
    >
      <div class="text-center offcanvas-header">
        <h3 id="offcanvasRightLabel">Account Details</h3>
        <button
          type="button"
          class="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        ...
        <AccountPage />
      </div>
    </div>
  </main>
  <footer>
    <div class="bg-info text-light text-center p-4"></div>
  </footer>

  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css"
  />
</template>

<script>
import { computed } from "vue";
import { AppState } from "./AppState";
export default {
  name: "App",
  setup() {
    return {
      appState: computed(() => AppState),
      account: computed(() => AppState.account),
    };
  },
};
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
</style>
