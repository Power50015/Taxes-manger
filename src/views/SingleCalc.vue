<template>
  <div>
    <div class="container mt-5 pb-5" id="printMe">
      <table class="table table-bordered">
        <thead>
          <tr class="table-dark">
            <th scope="col">الشريحة</th>
            <th scope="col">النسبة</th>
            <th scope="col">الضريبة</th>
            <th scope="col">الصافى</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="data in operations[0]" :key="data.index">
            <th scope="row">{{ data.slide }}</th>
            <td>{{ data.percentage.toFixed(2) }} %</td>
            <td>{{ data.tax.toFixed(2) }}</td>
            <td>{{ data.clear.toFixed(2) }}</td>
          </tr>
          <tr class="table-dark">
            <th>نوع العمليه</th>
            <th>المبلغ</th>
            <td>إجمالى الضريبه</td>
            <td>صافى الدخل</td>
          </tr>
          <tr>
            <td>{{ clacType == "man" ? "شخص" : "شركه (فرد أعتبارى)" }}</td>
            <th>{{ totalSlide }}</th>
            <td>{{ totalTax.toFixed(2) }}</td>
            <td>{{ totalClear.toFixed(2) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import firebase from "@/firebase";
export default {
  name: "SingleCalc",
  data() {
    return {
      totalSlide: 0,
      totalTax: 0,
      totalClear: 0,
      clacType: "",
      operations: [],
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
              if (
                doc.data().timeStamp.nanoseconds == this.$route.params.timeStamp
              ) {
                this.operations.push(doc.data().operations);
                this.totalSlide = doc.data().totalSlide;
                this.totalTax = doc.data().totalTax;
                this.totalClear = doc.data().totalClear;
                this.clacType = doc.data().clacType;
              }
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