<template>
  <nav
    ref="navarMenuRef"
    aria-label="main navigation"
    class="navbar is-success"
    role="navigation"
  >
    <div class="container is-max-desktop px-2">
      <div class="navbar-brand">
        <h1 class="navbar-item has-text-white is-size-4 is-family-monospace">
          Noteballs
        </h1>

        <a
          @click.prevent="showMobileNav = !showMobileNav"
          aria-expanded="false"
          aria-label="menu"
          class="navbar-burger"
          :class="{ 'is-active': showMobileNav }"
          data-target="navbarBasicExample"
          role="button"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbarBasicExample"
        class="navbar-menu"
        :class="{ 'is-active': showMobileNav }"
      >
        <div class="navbar-start">
          <button
            v-if="storeAuth.userState.id"
            @click="logout"
            class="button is-small has-text-success-light my-1 ml-3"
          >
            Log out {{ storeAuth.userState.email }}
          </button>
        </div>
        <div class="navbar-end">
          <RouterLink
            @click="showMobileNav = false"
            to="/"
            class="navbar-item"
            active-class="is-active"
          >
            Home
          </RouterLink>

          <RouterLink
            @click="showMobileNav = false"
            to="/stats"
            class="navbar-item"
            active-class="is-active"
          >
            Stats
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
// imports
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { useStoreAuth } from '@/stores/storeAuth';

const storeAuth = useStoreAuth();

// Mobile Nav
const showMobileNav = ref(false);

// click outside to close

const navarMenuRef = ref(null);
onClickOutside(navarMenuRef, () => {
  showMobileNav.value = false;
});

// logout
const logout = () => {
  showMobileNav.value = false;
  storeAuth.logoutUser();
};
</script>

<style>
.navbar-item.is-active {
  background-color: #3f986d;
}

@media (width < 1023px) {
  .navbar-menu {
    position: absolute;
    left: 0;
    width: 100%;
  }
}
</style>
