<template>
  <div class="container mt-5 pb-5">
    <table class="table table-bordered">
      <thead>
        <tr class="table-dark">
          <th scope="col">رقم العمليه</th>
          <th scope="col">تاريخ العمليه</th>
          <th scope="col">المبلغ</th>
          <th scope="col">الضريبة</th>
          <th scope="col">الصافى</th>
          <th scope="col">نوع العمليه</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="data in TableData" :key="data.index">
          <th scope="row">
            <router-link
              class="nav-link"
              :to="{
                name: 'SingleCalc',
                params: { timeStamp: data.timeStamp.nanoseconds },
              }"
              >{{ data.timeStamp.nanoseconds }}</router-link
            >
          </th>
          <th scope="row">
            {{ data.date }}
          </th>
          <td>{{ data.totalSlide }}</td>
          <td>{{ data.totalTax }}</td>
          <td>{{ data.totalClear }}</td>
          <td>{{ data.clacType == "man" ? "شخص" : "شركه (فرد أعتبارى)" }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import firebase from "@/firebase";
export default {
  name: "SavedCalc",
  data() {
    return {
      TableData: [],
    };
  },
  beforeCreate() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.$router.push("Login");
      } else {
        var db = firebase.firestore();
        db.collection("Taxes")
          .where("userId", "==", user.uid)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              this.TableData.push(doc.data());
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

<style>
</style>