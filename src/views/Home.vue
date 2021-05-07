<template>
  <div class="container d-flex align-items-center justify-content-center mt-5">
    <div class="card">
      <div class="form-check">
        <input
          class="form-check-input mb-4"
          type="radio"
          name="calcType"
          id="manRadio"
          value="man"
          v-model="calcType"
          @change="calcTex"
          checked
        />
        <label class="form-check-label" for="manRadio"> دخل أفراد </label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input mb-4"
          type="radio"
          name="calcType"
          id="companyRadio"
          value="company"
          v-model="calcType"
          @change="calcTex"
        />
        <label class="form-check-label" for="companyRadio">
          دخل شركات(أفراد اعتبارين)
        </label>
      </div>
      <div class="mb-3">
        <label for="totalSlide" class="form-label w-100 text-center"
          >إجمالى الدخل</label
        >
        <input
          type="number"
          class="form-control"
          id="totalSlide"
          v-model.number="totalSlide"
          min="0"
          oninput="validity.valid||(value='');"
          @input="calcTex"
        />
      </div>
    </div>
  </div>
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
        <tr v-for="data in operations" :key="data.index">
          <th scope="row">{{ data.slide }}</th>
          <td>{{ data.percentage.toFixed(2) }} %</td>
          <td>{{ data.tax.toFixed(2) }}</td>
          <td>{{ data.clear.toFixed(2) }}</td>
        </tr>
        <tr class="table-dark">
          <th scope="row" colspan="2">المبلغ</th>
          <td>إجمالى الضريبه</td>
          <td>صافى الدخل</td>
        </tr>
        <tr>
          <th scope="row" colspan="2">{{ totalSlide }}</th>
          <td>{{ totalTax.toFixed(2) }}</td>
          <td>{{ totalClear.toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>
    <button
      type="button"
      class="btn btn-outline-success m-3"
      :disabled="btnSave"
      @click="saveDB()"
    >
      حفظ فى قواعد البانات
    </button>
  </div>
</template>

<script>
import firebase from "@/firebase";
export default {
  name: "Home",
  data() {
    return {
      btnSave: true,
      calcType: "man",
      totalClear: 0,
      totalSlide: 0,
      totalTax: 0,
      operations: [],
      userId: "",
    };
  },
  methods: {
    calcTex() {
      if (this.totalSlide > 0) {
        this.btnSave = false;
      }else{
        this.btnSave = true;
      }
      this.operations = [];
      this.totalClear = 0;
      this.totalTax = 0;
      if (this.calcType == "company") {
        this.totalTax = this.totalSlide * 0.225;
        this.totalClear = this.totalSlide - this.totalTax;
        this.operations.push({
          slide: this.totalSlide,
          percentage: 22.5,
          tax: this.totalTax,
          clear: this.totalClear,
        });
      } else {
        if (this.totalSlide > 1000009) {
          var income = this.totalSlide;
          this.operations.push({
            slide: 400000,
            percentage: 22.5,
            tax: 90000,
            clear: 310000,
          });
          income = income - 400000;
          var incomeTax = income * 0.25;

          var clearIncome = income - incomeTax;
          this.operations.push({
            slide: income,
            percentage: 25,
            tax: incomeTax,
            clear: clearIncome,
          });
          this.totalTax = 90000 + incomeTax;
          this.totalClear = 310000 + clearIncome;
        } else if (this.totalSlide > 900009) {
          var income = this.totalSlide;
          this.operations.push(
            {
              slide: 200000,
              percentage: 20,
              tax: 40000,
              clear: 160000,
            },
            {
              slide: 200000,
              percentage: 22.5,
              tax: 45000,
              clear: 155000,
            }
          );
          income = income - 400000;
          var incomeTax = income * 0.25;

          var clearIncome = income - incomeTax;
          this.operations.push({
            slide: income,
            percentage: 25,
            tax: incomeTax,
            clear: clearIncome,
          });
          this.totalTax = 40000 + 45000 + incomeTax;
          this.totalClear = 160000 + 155000 + clearIncome;
        } else if (this.totalSlide > 800009) {
          var income = this.totalSlide;
          this.operations.push(
            {
              slide: 60000,
              percentage: 15,
              tax: 9000,
              clear: 51000,
            },
            {
              slide: 140000,
              percentage: 20,
              tax: 28000,
              clear: 112000,
            },
            {
              slide: 200000,
              percentage: 22.5,
              tax: 45000,
              clear: 155000,
            }
          );
          income = income - (60000 + 140000 + 200000);
          var incomeTax = income * 0.25;

          var clearIncome = income - incomeTax;
          this.operations.push({
            slide: income,
            percentage: 25,
            tax: incomeTax,
            clear: clearIncome,
          });
          this.totalTax = 9000 + 28000 + 45000 + incomeTax;
          this.totalClear = 51000 + 112000 + 155000 + clearIncome;
        } else if (this.totalSlide > 700009) {
          var income = this.totalSlide;
          this.operations.push(
            {
              slide: 45000,
              percentage: 10,
              tax: 4500,
              clear: 40500,
            },
            {
              slide: 15000,
              percentage: 15,
              tax: 2250,
              clear: 12750,
            },
            {
              slide: 140000,
              percentage: 20,
              tax: 28000,
              clear: 112000,
            },
            {
              slide: 200000,
              percentage: 22.5,
              tax: 45000,
              clear: 155000,
            }
          );
          income = income - (45000 + 15000 + 140000 + 200000);
          var incomeTax = income * 0.25;
          var clearIncome = income - incomeTax;
          this.operations.push({
            slide: income,
            percentage: 25,
            tax: incomeTax,
            clear: clearIncome,
          });
          this.totalTax = 4500 + 2250 + 28000 + 45000 + incomeTax;
          this.totalClear = 40500 + 12750 + 112000 + 155000 + clearIncome;
        } else if (this.totalSlide > 600009) {
          var income = this.totalSlide;
          this.operations.push(
            {
              slide: 30000,
              percentage: 2.5,
              tax: 750,
              clear: 29250,
            },
            {
              slide: 15000,
              percentage: 10,
              tax: 1500,
              clear: 13500,
            },
            {
              slide: 15000,
              percentage: 15,
              tax: 2250,
              clear: 12750,
            },
            {
              slide: 140000,
              percentage: 20,
              tax: 28000,
              clear: 112000,
            },
            {
              slide: 200000,
              percentage: 22.5,
              tax: 45000,
              clear: 155000,
            }
          );
          income = income - (30000 + 15000 + 15000 + 140000 + 200000);
          var incomeTax = income * 0.25;
          var clearIncome = income - incomeTax;
          this.operations.push({
            slide: income,
            percentage: 25,
            tax: incomeTax,
            clear: clearIncome,
          });
          this.totalTax = 750 + 1500 + 2250 + 28000 + 45000 + incomeTax;
          this.totalClear =
            29250 + 13500 + 12750 + 112000 + 155000 + clearIncome;
        } else {
          var income = this.totalSlide;
          if (income > 400009) {
            this.operations.push(
              {
                slide: 15000,
                percentage: 0,
                tax: 0,
                clear: 15000,
              },
              {
                slide: 15000,
                percentage: 2.5,
                tax: 375,
                clear: 14625,
              },
              {
                slide: 15000,
                percentage: 10,
                tax: 1500,
                clear: 13500,
              },
              {
                slide: 15000,
                percentage: 15,
                tax: 2250,
                clear: 12750,
              },
              {
                slide: 140000,
                percentage: 20,
                tax: 28000,
                clear: 112000,
              },
              {
                slide: 200000,
                percentage: 22.5,
                tax: 45000,
                clear: 155000,
              }
            );
            income = income - (15000 + 15000 + 15000 + 15000 + 140000 + 200000);
            var incomeTax = income * 0.25;

            var clearIncome = income - incomeTax;
            this.operations.push({
              slide: income,
              percentage: 25,
              tax: incomeTax,
              clear: clearIncome,
            });
            this.totalTax = 0 + 375 + 1500 + 2250 + 28000 + 45000 + incomeTax;
            this.totalClear =
              15000 + 14625 + 13500 + 12750 + 112000 + 155000 + clearIncome;
          } else if (income > 200009) {
            this.operations.push(
              {
                slide: 15000,
                percentage: 0,
                tax: 0,
                clear: 15000,
              },
              {
                slide: 15000,
                percentage: 2.5,
                tax: 375,
                clear: 14625,
              },
              {
                slide: 15000,
                percentage: 10,
                tax: 1500,
                clear: 13500,
              },
              {
                slide: 15000,
                percentage: 15,
                tax: 2250,
                clear: 12750,
              },
              {
                slide: 140000,
                percentage: 20,
                tax: 28000,
                clear: 112000,
              }
            );
            income = income - (15000 + 15000 + 15000 + 15000 + 140000);
            var incomeTax = income * 0.225;
            this.totalTax = 0 + 375 + 1500 + 2250 + 28000 + incomeTax;
            var clearIncome = income - incomeTax;
            this.operations.push({
              slide: income,
              percentage: 22.5,
              tax: incomeTax,
              clear: clearIncome,
            });
            this.totalClear =
              15000 + 14625 + 13500 + 12750 + 112000 + clearIncome;
          } else if (income > 60009) {
            this.operations.push(
              {
                slide: 15000,
                percentage: 0,
                tax: 0,
                clear: 15000,
              },
              {
                slide: 15000,
                percentage: 2.5,
                tax: 375,
                clear: 14625,
              },
              {
                slide: 15000,
                percentage: 10,
                tax: 1500,
                clear: 13500,
              },
              {
                slide: 15000,
                percentage: 15,
                tax: 2250,
                clear: 12750,
              }
            );
            income = income - (15000 + 15000 + 15000 + 15000);
            var incomeTax = income * 0.2;

            var clearIncome = income - incomeTax;
            this.operations.push({
              slide: income,
              percentage: 20,
              tax: incomeTax,
              clear: clearIncome,
            });
            this.totalTax = 0 + 375 + 1500 + 2250 + incomeTax;
            this.totalClear = 15000 + 14625 + 13500 + 12750 + clearIncome;
          } else if (income > 45009) {
            this.operations.push(
              {
                slide: 15000,
                percentage: 0,
                tax: 0,
                clear: 15000,
              },
              {
                slide: 15000,
                percentage: 2.5,
                tax: 375,
                clear: 14625,
              },
              {
                slide: 15000,
                percentage: 10,
                tax: 1500,
                clear: 13500,
              }
            );
            income = income - (15000 + 15000 + 15000);
            var incomeTax = income * 0.15;

            var clearIncome = income - incomeTax;
            this.operations.push({
              slide: income,
              percentage: 15,
              tax: incomeTax,
              clear: clearIncome,
            });
            this.totalTax = 0 + 375 + 1500 + incomeTax;
            this.totalClear = 15000 + 14625 + 13500 + clearIncome;
          } else if (income > 30009) {
            this.operations.push(
              {
                slide: 15000,
                percentage: 0,
                tax: 0,
                clear: 15000,
              },
              {
                slide: 15000,
                percentage: 2.5,
                tax: 375,
                clear: 14625,
              }
            );
            income = income - (15000 + 15000);
            var incomeTax = income * 0.1;

            var clearIncome = income - incomeTax;
            this.operations.push({
              slide: income,
              percentage: 10,
              tax: incomeTax,
              clear: clearIncome,
            });
            this.totalTax = 0 + 375 + incomeTax;
            this.totalClear = 15000 + 14625 + clearIncome;
          } else if (income > 15009) {
            this.operations.push({
              slide: 15000,
              percentage: 0,
              tax: 0,
              clear: 15000,
            });
            income = income - 15000;
            var incomeTax = income * 0.025;

            var clearIncome = income - incomeTax;
            this.operations.push({
              slide: income,
              percentage: 10,
              tax: incomeTax,
              clear: clearIncome,
            });
            this.totalTax = 0 + incomeTax;
            this.totalClear = 15000 + clearIncome;
          } else {
            var incomeTax = 0;
            var clearIncome = income - incomeTax;
            this.operations.push({
              slide: income,
              percentage: 0,
              tax: incomeTax,
              clear: clearIncome,
            });
            this.totalTax = incomeTax;
            this.totalClear = clearIncome;
          }
        }
      }
    },
    saveDB() {
      var db = firebase.firestore();
      db.collection("Taxes")
        .add({
          date: this.todaysDate,
          operations: this.operations,
          timeStamp: firebase.firestore.Timestamp.fromDate(new Date()),
          totalClear: this.totalClear,
          totalSlide: this.totalSlide,
          totalTax: this.totalTax,
          userId: this.userId,
          clacType: this.calcType,
        })
        .then((docRef) => {
          this.totalClear = 0;
          this.totalSlide = 0;
          this.totalTax = 0;
          this.operations = [];
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    },
  },
  computed: {
    todaysDate() {
      var today =
        new Date().getFullYear() +
        "-" +
        ("0" + (new Date().getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + new Date().getDate()).slice(-2);
      return today;
    },
  },
  beforeCreate() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.$router.push("Login");
      } else {
        this.userId = user.uid;
      }
    });
  },
};
</script>
<style scoped>
.card {
  width: 500px;
  text-align: left;
  padding: 50px 50px 30px;
}
@media print {
  .btn {
    display: none;
  }
}
</style>