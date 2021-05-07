<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container">
      <router-link class="navbar-brand" :to="{ name: 'Home' }">
        <img src="../assets/logo2.png" width="150" />
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'Home' }"
              >حساب ضرائب</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'SavedCalc' }"
              >جدول الضرائب</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'Profile' }"
              >بياناتى</router-link
            >
          </li>
          <li class="nav-item">
            <a href="#" @click.prevent="this.$emit('logout')" class="nav-link"
              >تسجيل خروج</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  methods: {},
};
</script>

<style>
nav {
  background: #F7F7F7;
}
.nav-link,
.navbar-toggler,
.navbar-brand {
  color: #67B75E;
  font-weight: bold;
}
.nav-link:hover,
.navbar-toggler:hover,
.navbar-brand:hover {
  color: #125c0c;
}
</style>