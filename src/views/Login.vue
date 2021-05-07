<template>
  <div class="bg-main title">
    <img src="../assets/logo2.png" width="250"/>
  </div>
  <div class="container main d-flex align-items-center justify-content-center">
    <form class="card" @submit.prevent="submit()">
      <div class="mb-3">
        <label for="FormControlInput1" class="form-label">Email address</label>
        <input
          type="email"
          class="form-control text-end"
          id="FormControlInput1"
          placeholder="name@example.com"
          v-model="email"
        />
      </div>
      <div class="mb-3">
        <label for="FormControlInput2" class="form-label">Password</label>
        <input
          type="password"
          class="form-control text-end"
          id="FormControlInput2"
          v-model="password"
        />
      </div>
      <button type="submit" class="btn bg-main fw-bold my-4">تسجيل</button>
      <hr />
      <router-link
        class="link text-center fw-bold"
        aria-current="page"
        :to="{ name: 'Register' }"
        >عمل حساب جديد</router-link
      >
    </form>
  </div>
</template>

<script>
import firebase from "@/firebase";
export default {
  name: "Login",
  data() {
    return {
      email: "power@yahoo.com",
      password: "123456789",
    };
  },
  methods: {
    submit() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email.toLowerCase(), this.password)
        .then((res) => {
          this.email = "";
          this.password = "";
          this.$router.push("/");
        })
        .catch((e) => {});
    },
  },
  beforeCreate() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$router.push("/");
      }
    });
  },
};
</script>

<style scoped>
.title {
  text-align: center;
  font-size: 3rem;
  padding: 5px;
}
.main {
  min-height: 80vh;
}
.card {
  width: 500px;
  text-align: left;
  padding: 50px 50px 30px;
}
.link {
  text-decoration: none;
  color: #67b75e;
}
</style>