<template>
  <div class="bg-main title">
    <img src="../assets/logo2.png" width="250" />
  </div>
  <div class="container main d-flex align-items-center justify-content-center">
    <form class="card" @submit.prevent="submit()">
      <div class="mb-3">
        <label for="input1" class="form-label">Name</label>
        <input
          type="text"
          class="form-control text-end"
          id="input1"
          placeholder="Enter Your Name"
          v-model="name"
        />
      </div>
      <div class="mb-3">
        <label for="input2" class="form-label">Email address</label>
        <input
          type="email"
          class="form-control text-end"
          id="input2"
          placeholder="name@example.com"
          v-model="email"
        />
      </div>
      <div class="mb-3">
        <label for="input3" class="form-label">Company Taxes ID</label>
        <input
          type="text"
          class="form-control text-end"
          id="input3"
          placeholder="Company Taxes ID"
          v-model="texesId"
        />
      </div>
      <div class="mb-3">
        <label for="input4" class="form-label">Company Address</label>
        <input
          type="text"
          class="form-control text-end"
          id="input4"
          placeholder="Company Address"
          v-model="address"
        />
      </div>
      <div class="mb-3">
        <label for="input5" class="form-label">Password</label>
        <input
          type="password"
          class="form-control text-end"
          id="input5"
          v-model="password"
        />
      </div>
      <button type="submit" class="btn bg-main fw-bold my-4">تسجيل</button>
      <hr />
      <router-link
        class="link text-center fw-bold"
        aria-current="page"
        :to="{ name: 'Login' }"
        >تسجيل الدخول</router-link
      >
    </form>
  </div>
</template>

<script>
import firebase from "@/firebase";
export default {
  name: "Register",
  data() {
    return {
      name: "",
      email: "",
      texesId: "",
      address: "",
      password: "",
    };
  },
  methods: {
    submit() {
      var db = firebase.firestore();
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          db.collection("Users")
            .add({
              name: this.name,
              email: this.email.toLowerCase(),
              taxesId: this.texesId,
              companyAddress: this.address,
            })
            .then((docRef) => {
              console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
              console.error("Error adding document: ", error);
            });
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          // ..
        });
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