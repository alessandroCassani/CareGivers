<template>
  <body>
    <div class="wrapper">
      <Side_bar></Side_bar>

      <div class="container-farmaci">
        <div class="heading-farmaci">
          <h3>FARMACI</h3>
          <hr style="width: 100%" color="black" />
        </div>
        <!-- input -->
        <div class="insert" v-if="!isPatient()">
          <input
            type="text"
            v-model="farmaco"
            placeholder="Aggiungi farmaco..."
          />&nbsp; <input type="number" v-model="dosaggio" />&nbsp;
          <input type="time" v-model="farmacOrario" />
          <button @click="SubmitDrug" class="add-btn-farmaci">AGGIUNGI</button>
        </div>
        <!-- table -->
        <div class="table-container-farmaci">
          <table border="{3}" class="table-farmaci">
            <thead>
              <tr>
                <th>Farmaco</th>
                <th>Dosaggio (mg)</th>
                <th>Orario</th>
                <th v-if="!isPatient">Elimina</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(task, index) in terapia"
                :key="index"
                :class="{ 'blue-bg': task.reminderDate === today }"
              >
                <td>{{ task.farmaco }}</td>
                <td>{{ task.dosaggio }}</td>
                <td>{{ task.orario }}</td>
                <td v-if="!isPatient">
                  <href
                    class="del-btn"
                    style="border-radius: 4px"
                    @click="deleteDrug(index)"
                    s
                  >
                    Elimina
                  </href>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="container-task">
        <div class="heading-task">
          <h3>PROMEMORIA</h3>
          <hr style="width: 100%" color="black" />
        </div>
        <!-- input -->
        <div class="insert" v-if="!isPatient()">
          <input
            type="text"
            v-model="task"
            placeholder="Aggiungi promemoria..."
          />&nbsp; <input type="date" v-model="reminderDate" />&nbsp;
          <input type="time" v-model="reminderTime" />
          <button @click="SubmitTask" class="add-btn-task">AGGIUNGI</button>
        </div>
        <!-- table -->
        <div class="table-container-task">
          <table border="{3}" class="table-task">
            <thead>
              <tr>
                <th>Evento</th>
                <th>Data</th>
                <th>Orario</th>
                <th v-if="!isPatient">Elimina</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(task, index) in tasks"
                :key="index"
                :class="{ 'blue-bg': task.reminderDate === today }"
              >
                <td>{{ task.evento }}</td>
                <td>{{ task.data }}</td>
                <td>{{ task.orario }}</td>
                <td v-if="!isPatient">
                  <href
                    class="del-btn"
                    style="border-radius: 4px"
                    @click="deleteTask(index)"
                  >
                    Elimina
                  </href>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
import axios from "axios";
import Side_bar from "./Side_bar.vue";
import mqtt from "mqtt";
import store from "./mqtt";

export default {
  name: "memos",
  components: { Side_bar },
  store,
  data() {
    return {
      ruolo: sessionStorage.getItem("ruolo"),
      today: new Date().toISOString().slice(0, 10),
      task: "",
      farmaco: "",
      farmacOrario: "",
      dosaggio: "",
      reminderTime: this.memo ? this.memo.reminderTime : "",
      reminderDate: this.memo ? this.memo.reminderDate : "",
      editTask: null,
      tasks: [],
      terapia: [],
      email_paziente: localStorage.getItem("email_paziente"),
      topicDrug: "cassa@gmail.com/drug", //modificare
      topicTask: "cassa@gmail.com/task", //modificare
      topicDeleteDrug: "cassa@gmail.com/deleteDrug", //modificare
      topicDeleteTask: "cassa@gmail.com/deleteTask", //modificare
      client: null,
    };
  },

  mounted() {
    this.setup();
  },

  methods: {
    setFlag() {
      sessionStorage.setItem("flag", 1);
    },

    checkFlag() {
      return sessionStorage.getItem("flag") == null;
    },

    isPatient() {
      //console.log(sessionStorage.getItem('ruolo'))
      return this.ruolo === "paziente";
    },

    setAlertsFarmaci() {
      for (let i = 0; i < this.terapia.length; i++) {
        const nomeFarmaco = this.terapia[i].farmaco;
        //console.log("nome farmaco: " + nomeFarmaco);
        //console.log(this.terapia[i].orario + " orario terapia");
        const [hours, minutes] = this.terapia[i].orario.split(":");
        const dateObj = new Date();
        dateObj.setHours(hours);
        dateObj.setMinutes(minutes);

        console.log("DATA OGGETTO FARMACO " + dateObj.getTime());

        let currentTime = new Date();
        //console.log(currentTime.getTime() + " CURRENTIME");
        let timeDiff = dateObj.getTime() - currentTime.getTime();
        //console.log(timeDiff);
        if (timeDiff > 0) {
          setTimeout(function () {
            if (this.terapia[i].farmaco === nomeFarmaco) {
              //controlla se il farmaco è stato eliminato prima di mandare alert
              console.log("ALERT INVIATO " + nomeFarmaco);
              alert(nomeFarmaco);
            }
          }, timeDiff);
        }
      }
    },

    setAlertsTasks() {
      const currentDate = new Date();
      for (let i = 0; i < this.tasks.length; i++) {
        const evento = this.tasks[i].evento;
        const data = new Date(this.tasks[i].data);
        const orario = this.tasks[i].orario;

        if (
          data.getDate() === currentDate.getDate() &&
          data.getMonth() === currentDate.getMonth() &&
          data.getFullYear() === currentDate.getFullYear()
        ) {
          const [hours, minutes] = orario.split(":");
          const dateObj = new Date();
          dateObj.setHours(hours);
          dateObj.setMinutes(minutes);

          let currentTime = new Date();
          let timeDiff = dateObj.getTime() - currentTime.getTime();

          if (timeDiff > 0) {
            setTimeout(function () {
              if (this.tasks[i].evento === evento) {
                //controlla se l'evento è stato eliminato e quindi ancora uguale a quello salvato prima
                console.log("ALERT INVIATO PER EVENTO " + evento);
                alert(evento + " alle ore " + orario);
              }
            }, timeDiff);
          }
        }
      }
    },

    // delete task
    async deleteTask(index) {
      await axios
        .post("http://localhost:5002/deleteTask", {
          email: this.email_paziente,
          evento: this.tasks[index].evento,
        })
        .then(
          //modificare
          (res) => {
            console.log(res.data);
            if (res.status === 200) {
              this.tasks.splice(index, 1);
              alert("promemoria eliminato correttamente");
            }
          },
          (err) => {
            console.log(err);
            alert("Errore in fase di cancellazione del promemoria");
          }
        );
    },

    // Add Task
    async SubmitTask() {
      if (this.task.length === 0) {
        return;
      }
      if (this.editTask != null) {
        this.tasks[this.editTask].name = this.task;
        this.editTask = null;
      } else {
        const memo = {
          evento: this.task,
          data: this.reminderDate,
          orario: this.reminderTime,
          email_paziente: this.email_paziente,
        };
        console.log(memo);

        await axios.post("http://localhost:5002/insertMemo", memo).then(
          (res) => {
            console.log(res.data);
            if (res.status === 200) {
              this.tasks.push(memo);
              alert("promemoria inserito correttamente");
              console.log(this.client);
              this.client.publish(this.topicTask, JSON.stringify(memo));
              console.log("spedito");
            }
          },
          (err) => {
            console.log(err);
            alert("Errore in fase di inserimento del promemoria");
          }
        );
      }
    },

    setup() {
      //console.log(sessionStorage.getItem("flag"));
      //const topic = sessionStorage.getItem("email") + "/memo";
      //console.log(this.isPatient());
      //console.log(this.checkFlag());
      this.getMemos();
      this.getFarmaci();

      if (this.isPatient()) {
        if (this.checkFlag()) {
          // checkFlag() permette di far eseguire la parte dell'if solo una volta all'inizio
          this.setAlertsFarmaci();
          this.setAlertsTasks();
          this.client = mqtt.connect("mqtt://localhost:1234");

          this.$;

          this.client.on("connect", () => {
            console.log("connessione: " + this.client.connected);
            console.log("connesso paziente");
            this.client.subscribe(this.topicDrug);
            console.log("iscritto a " + this.topicDrug);
            this.client.subscribe(this.topicDeleteTask);
            console.log("iscritto a " + this.topicDeleteTask);
            this.client.subscribe(this.topicDeleteDrug);
            console.log("iscritto a " + this.topicDeleteDrug);
            this.client.subscribe(this.topicDeleteTask);
            console.log("iscritto a " + this.topicDeleteTask);
            this.client.subscribe(this.topicTask);
            console.log("iscritto a " + this.topicTask);
          });

          this.client.on("message", (topic, message) => {
            console.log("message triggered");
            if (topic === this.topicDrug) this.setAlertDrugFromMqtt(message);
            else this.setAlertTaskFromMqtt(message);
          });
        }

        this.setFlag();
      } else {
        if (this.isPatient() === false) {
          if (this.checkFlag()) {
            this.setAlertsFarmaci();
            this.setAlertsTasks();

            this.client = mqtt.connect("mqtt://localhost:1234");

            this.client.on("connect", () => {
              console.log("connesso caregiver");
            });

            this.setFlag();
          }
        }
      }
    },

    setAlertTaskFromMqtt(message) {
      const payload = message.toString(); // Convert payload to string
      const data = JSON.parse(payload);
      console.log(data); // Parse JSON message into an object
      const evento = data.evento;
      const orario = data.orario;
      const giorno = data.giorno;
      console.log(data.orario);
      console.log(giorno);

      const attivita = {
        evento: data.evento,
        orario: data.orario,
        data: data.giorno,
      };
      const currentDate = new Date();

      if (
        giorno.getDate() === currentDate.getDate() &&
        giorno.getMonth() === currentDate.getMonth() &&
        giorno.getFullYear() === currentDate.getFullYear()
      ) {
        const [hours, minutes] = orario.split(":");
        const dateObj = new Date();
        dateObj.setHours(hours);
        dateObj.setMinutes(minutes);

        let currentTime = new Date();
        let timeDiff = dateObj.getTime() - currentTime.getTime();

        if (timeDiff > 0) {
          setTimeout(function () {
            console.log("ALERT INVIATO PER EVENTO " + evento);
            alert(evento + " alle ore " + orario);
          }, timeDiff);
        }

        this.tasks.push(attivita);
        alert("nuovo evento inserito!");
      }
    },

    setAlertDrugFromMqtt(message) {
      //console.log(topicMemo + " " + message);
      console.log("drug mqtt triggered");
      const payload = message.toString(); // Convert payload to string
      const data = JSON.parse(payload);
      console.log(data); // Parse JSON message into an object

      const nome = data.farmaco;
      const orario = data.orario;
      const dosaggio = data.dosaggio;
      console.log(data.orario);

      const medicinale = {
        farmaco: nome,
        orario: orario,
        dosaggio: dosaggio,
      };
      //console.log(medicinale + "OOOOOOOO");

      const [hours, minutes] = data.orario.split(":");
      const dateObj = new Date();
      dateObj.setHours(hours);
      dateObj.setMinutes(minutes);
      let currentTime = new Date();
      //console.log(currentTime.getTime() + " CURRENTIME");
      let timeDiff = dateObj.getTime() - currentTime.getTime();
      //console.log(timeDiff);

      this.terapia.push(medicinale);
      alert("terapia aggiornata!");

      if (timeDiff > 0) {
        setTimeout(function () {
          //controlla se il farmaco è stato eliminato prima di mandare alert
          console.log("ALERT INVIATO " + nome);
          alert("assumere " + nome + " " + dosaggio + "mg");
        }, timeDiff);
      }
    },

    async SubmitDrug() {
      if (this.farmaco.length === 0) {
        return;
      }
      if (this.editTask != null) {
        this.tasks[this.editTask].name = this.task;
        this.editTask = null;
      } else {
        const medicinale = {
          farmaco: this.farmaco,
          orario: this.farmacOrario,
          dosaggio: this.dosaggio,
          email_paziente: this.email_paziente,
        };

        await axios
          .post("http://localhost:5002/insertTherapy", medicinale)
          .then(
            (res) => {
              console.log(res.data);
              if (res.status === 200) {
                this.terapia.push(medicinale);
                alert("terapia inserito correttamente");
              }
            },
            (err) => {
              console.log(err);
              alert("Errore in fase di inserimento della terapia");
            }
          );

        this.client.publish(this.topicDrug, JSON.stringify(medicinale));
        console.log("spedito");
      }
    },

    async deleteDrug(index) {
      await axios
        .post("http://localhost:5002/deleteDrug", {
          email: this.email_paziente,
          farmaco: this.terapia[index].farmaco,
        })
        .then(
          (res) => {
            console.log(res.data);
            if (res.status === 200) {
              this.terapia.splice(index, 1);
              alert("farmaco eliminato correttamente");
            }
          },
          (err) => {
            console.log(err);
            alert("Errore in fase di cancellazione del farmaco");
          }
        );
    },

    async getMemos() {
      const email = { email: this.email_paziente };
      await axios
        .get("http://localhost:5002/getMemos", email)
        .then((response) => {
          const documents = response.data;

          for (let i = 0; i < documents.length; i++) {
            const promemoria = {
              evento: documents[i].evento,
              orario: documents[i].orario,
              data: documents[i].data.substr(0, 10), //substr aggiusta data
            };
            this.tasks.push(promemoria);
          }
        });
    },

    async getFarmaci() {
      const email = { email: this.email_paziente };

      await axios
        .get("http://localhost:5002/getTherapy", email)
        .then((response) => {
          const documents = response.data;

          for (let i = 0; i < documents.length; i++) {
            const farmaco = {
              farmaco: documents[i].farmaco,
              orario: documents[i].orario,
              dosaggio: documents[i].dosaggio,
            };
            this.terapia.push(farmaco);
          }
          console.log("getfarmaci");
        });
    },
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -220px;
}

.heading-farmaci {
  font-weight: bold;
  margin-bottom: 30px;
  color: #c79598;
}

.heading-task {
  font-weight: bold;
  margin-bottom: 30px;
  color: darkgoldenrod;
}

.del-btn {
  background-color: #88474c;
  color: white;
}

.container-farmaci {
  width: 1300px;
  margin-left: 250px;
  text-align: center;
  margin-top: 150px;
}

.container-task {
  width: 1300px;
  margin-left: 250px;
  text-align: center;
  margin-top: 150px;
}

.table-container-farmaci {
  max-height: 200px;
  overflow-y: scroll;
}

.table-container-task {
  max-height: 200px;
  overflow-y: scroll;
}

.table-farmaci {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  margin-top: 20px;
  background-color: #c79598;
}

.table-task {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  margin-top: 20px;
  background-color: palegoldenrod;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}

button:hover {
  background-color: green;
}

.blue-bg {
  background-color: blue;
}

.add-btn-farmaci {
  border: none;
  width: 100px;
  height: 30px;
  padding: 2px;
  background-color: grey;
  color: white;
  margin-left: 50px;
  margin-bottom: 20px;
  border-radius: 5px;
  transition: o.25s;
  cursor: pointer;
}

.add-btn-task {
  border: none;
  width: 100px;
  height: 30px;
  padding: 2px;
  background-color: grey;
  color: white;
  margin-left: 50px;
  margin-bottom: 20px;
  border-radius: 5px;
  transition: o.25s;
  cursor: pointer;
}

.edit-btn {
  border: none;
  background-color: #77b631;
  color: white;
}
</style>
