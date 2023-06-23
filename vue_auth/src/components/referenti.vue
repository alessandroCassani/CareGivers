<template>
  <Side_bar> </Side_bar>
  <div :style="{ 'margin-left': sidebarWidth }"></div>

  <body>
    <div class="inputReferente" v-if="!isPatient">
      <h3>Inserire email paziente:</h3>
      <input
        type="email"
        v-model="e_mail"
        class="form-control"
        placeholder="email paziente"
      />
      <br />
      <h2>INSERISCI OTP</h2>
      <div class="otp-bx">
        <input type="text" v-model="firstOtp" maxlength="1" />
        <input type="text" v-model="secondOtp" maxlength="1" />
        <input type="text" v-model="thirdOtp" maxlength="1" class="space" />
        <input type="text" v-model="fourthOtp" maxlength="1" />
        <input type="text" v-model="fifthOtp" maxlength="1" />
      </div>
      <br />
      <input type="submit" @click="sendOtp()" value="CONFERMA" />
    </div>

    <div class="threeshold" v-if="!isPatient">
      <div><h3 style="color: red">ALERTS</h3></div>
      <label>FC:&nbsp;</label>
      <input type="number" v-model="fc" />&nbsp;&nbsp;
      <label>spO2:&nbsp;</label>&nbsp;
      <input type="number" v-model="spO2" /> &nbsp;
      <label>sistolica:&nbsp;</label>&nbsp;
      <input type="number" v-model="systolic" />&nbsp;
      <label>diastolica:&nbsp;</label>&nbsp;
      <input type="number" v-model="diastolic" />&nbsp;&nbsp;&nbsp;
      <input type="submit" @click="insertAlerts()" value="AGGIUNGI" />
    </div>

    <div class="inputPaziente" v-if="isPatient">
      <h1>Genera OTP:</h1>
      <br />
      <input type="submit" @click="createOtp()" value="GENERA" />
    </div>
  </body>
</template>

<script>
import Side_bar from "@/components/Side_bar.vue";
import sidebarWidth from "@/components/state";
import axios from "axios";

export default {
  name: "referenti",
  components: { Side_bar },

  data() {
    return {
      otp: "",
      e_mail: "",
      ruolo: sessionStorage.getItem("ruolo"),
      firstOtp: "",
      secondOtp: "",
      thirdOtp: "",
      fourthOtp: "",
      fifthOtp: "",
      sidebarWidth,
      fc: "",
      spO2: "",
      systolic: "",
      diastolic: "",
      client: null,
      topicAlert: sessionStorage.getItem("email") + "/insAlert",
    };
  },
  computed: {
    isPatient() {
      console.log(sessionStorage.getItem("ruolo") + " COMPUTED");
      return this.ruolo === "paziente";
    },
  },

  created() {
    console.log("CREATED REFERENTI");
    if (localStorage.getItem("token") === null) {
      this.$router.push("/login");
    }
  },

  mounted() {
    this.client = this.$store.state.selectedItem;

    if (this.isPatient()) {
      if (this.checkFlag()) {
        this.client.subscribe(this.topicAlert);
        this.client.on("message", (topic, message) => {
          if (topic === this.topicAlert) {
            alert("nuove soglie inserite");
            const payload = message.toString(); // Convert payload to string
            const data = JSON.parse(payload);
            localStorage.setItem("fcth", data.fcth);
            localStorage.setItem("spO2th", data.spO2th);
            localStorage.setItem("systh", data.systh);
            localStorage.setItem("diasth", data.diasth);
            console.log(localStorage);
          }
        });
      }
    }
  },

  methods: {
    setFlag() {
      sessionStorage.setItem("flagref", 1);
    },

    checkFlag() {
      return sessionStorage.getItem("flagref") == null;
    },
    createOtp() {
      const length = 5;
      let otp = "";

      for (let i = 0; i < length; i++) {
        otp += Math.floor(Math.random() * 10);
      }
      console.log(otp);

      const data = {
        otp: otp,
        email: sessionStorage.getItem("email"),
      };
      axios.post("http://localhost:5001/insertOtp", data).then(
        (res) => {
          console.log(res.data);
          if (res.status === 200) {
            alert("OTP inserito con successo " + otp);
          }
        },
        (err) => {
          alert(err + " errore generazione otp");
        }
      );
    },

    sendOtp() {
      const data = {
        otp:
          this.firstOtp +
          this.secondOtp +
          this.thirdOtp +
          this.fourthOtp +
          this.fifthOtp,
        email_paziente: this.e_mail,
        email_caregiver: sessionStorage.getItem("email"),
      };

      axios.post("http://localhost:5001/checkOtp", data).then(
        (res) => {
          console.log(res.data);
          if (res.status === 200) {
            alert("associazione confermata");
            localStorage.setItem("email_paziente", this.e_mail);
          }
        },
        (err) => {
          alert(err + " errore! prego riprovare");
        }
      );
    },

    async insertAlerts() {
      const data = {
        //email: localStorage.getItem('email_paziente'),
        email: sessionStorage.getItem("email_paziente"),
        fc: this.fc,
        spO2: this.spO2,
        systolic: this.systolic,
        diastolic: this.diastolic,
      };

      await axios.post("http://localhost:5005/insertAlerts", data).then(
        (res) => {
          if (res.status === 200) {
            alert("soglie inserite correttamente");
            localStorage.setItem("fcth", this.fc);
            localStorage.setItem("spO2th", this.spO2);
            localStorage.setItem("systh", this.systolic);
            localStorage.setItem("diasth", this.diastolic);

            const alert = {
              fcth: this.fc,
              spO2th: this.spO2,
              systh: this.systolic,
              diasth: this.diastolic,
            };
            this.client.publish(this.topicAlert, JSON.stringify(alert));
          } else {
            alert("errore in fase di inserimento");
          }
        },
        (err) => {
          alert(err + " errore! prego riprovare");
        }
      );
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: sans-serif;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
}

.otp-bx {
  display: flex;
  padding: 10px;
}

.otp-bx input {
  width: 50px;
  font-size: 32px;
  padding: 10px;
  text-align: center;
  border-radius: 5px;
  margin: 2px;
  border: 2px solid;
  font-weight: bold;
  outline: none;
  transition: all 0.1s;
}

.otp-bx.input :focus {
  border: 2px solid #27ffa9;
  box-shadow: 0 0 2px 2px #27ffd76a;
}

.space {
  margin-right: 1rem !important;
}

.inputReferente {
  text-align: center;
  background-color: lightgray;
  border-radius: 10px;
  padding: 40px;
  width: 400px;
}

.inputReferente input[type="submit"] {
  border: 0;
  background: rgba(255, 255, 255, 0.86);
  margin: 20px auto;
  text-align: center;
  border: 2px solid white;
  font-size: 18px;
  padding: 8px 40px;
  border-radius: 5px;
  transition: o.25s;
  cursor: pointer;
}

.inputReferente input[type="submit"]:hover {
  background: #c79598;
}

.inputPaziente {
  text-align: center;
  background-color: lightgrey;
  border-radius: 10px;
  padding: 40px;
}

.inputPaziente input[type="submit"] {
  border: 0;
  background: rgba(255, 255, 255, 0.86);
  margin: 20px auto;
  text-align: center;
  border: 2px solid white;
  font-size: 18px;
  padding: 8px 40px;
  border-radius: 5px;
  transition: o.25s;
  cursor: pointer;
}

.inputPaziente input[type="submit"]:hover {
  background: #c79598;
}

.threeshold {
  text-align: center;
  margin-top: 60px;
}
</style>
