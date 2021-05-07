<template>
  <Navbar v-if="auth" @logout="logout" />
  <router-view />
</template>

<script>
import Navbar from "@/components/Navbar";
import firebase from "@/firebase";
export default {
  components: { Navbar },
  data() {
    return {
      auth: false,
      authUser: {},
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.auth = false;
          this.authUser = {};
          this.$router.push("Login");
        })
        .catch((error) => {});
    },
  },
  beforeCreate() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.auth = true;
        this.authUser = user;
      } else {
        this.auth = false;
        this.authUser = {};
      }
    });
  },
  unmounted() {
    this.logout();
  },
};
</script>

<style>
.bg-main {
  background-color: #F7F7F7;
  color: #67B75E;
}
</style>
