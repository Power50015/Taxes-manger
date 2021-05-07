<template>
  <div class="container main d-flex align-items-center justify-content-center">
    <div class="card text-start">
      <div class="mb-3">
        <h6>الأسم : {{ name }}</h6>
      </div>
      <div class="mb-3">
        <h6>البريد الإلكترونى : {{ email }}</h6>
      </div>
      <div class="mb-3">
        <h6>رقم الضريبى : {{ texesId }}</h6>
      </div>
      <div class="mb-3">
        <h6>عنوان الشركه : {{ address }}</h6>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "@/firebase";
export default {
  name: "Profile",
  data() {
    return {
      name: "",
      email: "",
      texesId: "",
      address: "",
    };
  },
  methods: {},
  beforeCreate() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.$router.push("Login");
      } else {
        var db = firebase.firestore();
        db.collection("Users")
          .where("email", "==", user.email)
          .get()
          .then((querySnapshot) => {
            console.log(querySnapshot);
            querySnapshot.forEach((doc) => {
              this.name = doc.data().name;
              this.email = doc.data().email;
              this.texesId = doc.data().taxesId;
              this.address = doc.data().companyAddress;
            });
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
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