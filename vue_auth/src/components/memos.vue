<template>
  <body>
    <div class="wrapper">
      <Side_bar></Side_bar>
      <div class="container">
        <!-- INSERIRE HEADING -->
        <!-- input -->
        <div class="insert">
          <input
            type="text"
            v-model="farmaco"
            placeholder="Aggiungi farmaco..."
          />&nbsp; <input type="number" v-model="dosaggio" />&nbsp;
          <input type="time" v-model="farmacOrario" />
          <button @click="SubmitDrug" class="add-btn">ADD</button>
        </div>
        <!-- table -->
        <div class="table-container">
          <table border="{3}">
            <thead>
              <tr>
                <th>Farmaco</th>
                <th>Dosaggio (mg)</th>
                <th>Orario</th>
                <th>Elimina</th>
                <th>Modifica</th>
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
                <td>
                  <button class="del-btn" @click="deleteDrug(index)">
                    Delete
                  </button>
                </td>
                <td>
                  <button class="edit-btn" @click="EditTask(index)">
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="container">
        <!-- INSERIRE HEADING -->
        <!-- input -->
        <div class="insert">
          <input
            type="text"
            v-model="task"
            placeholder="Aggiungi promemoria..."
          />&nbsp; <input type="date" v-model="reminderDate" />&nbsp;
          <input type="time" v-model="reminderTime" />
          <button @click="SubmitTask" class="add-btn">ADD</button>
        </div>
        <!-- table -->
        <div class="table-container">
          <table border="{3}">
            <thead>
              <tr>
                <th>Evento</th>
                <th>Data</th>
                <th>Orario</th>
                <th>Elimina</th>
                <th>Modifica</th>
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
                <td>
                  <button class="del-btn" @click="deleteTask(index)">
                    Delete
                  </button>
                </td>
                <td>
                  <button class="edit-btn" @click="EditTask(index)">
                    Edit
                  </button>
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

export default {
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
    };
  },

  computed: {
    isPatient() {
      //console.log(sessionStorage.getItem('ruolo'))
      return this.ruolo === "paziente";
    },
  },

  async mounted() {
    await this.getMemos();
    await this.getFarmaci();
    this.setAlertsFarmaci();
    this.setAlertsTasks();
  },

  methods: {
    setAlertsFarmaci() {
      if (sessionStorage.getItem("flagAlertFarmaci") === null) {
        console.log("DENTRO INSERIMENTO ALERT");
        sessionStorage.setItem("flagAlertFarmaci", false);

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
              console.log("ALERT INVIATO " + nomeFarmaco);
              alert(nomeFarmaco);
            }, timeDiff);
          }
        }
      }
    },

    setAlertsTasks() {
      if (sessionStorage.getItem("flagAlertEventi") === null) {
        sessionStorage.setItem("flagAlertEventi", false);

        console.log("dentor inserisci tasl");

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
                console.log("ALERT INVIATO  PER EVENTO " + evento);
                alert(evento + " alle ore " + orario);
              }, timeDiff);
            }
          } else {
            console.log("non ci sono eventi programmati per oggi");
          }
        }
      }
    },

    // delete task
    async deleteTask(index) {
      await axios
        .post("http://localhost:5002/deleteTask", {
          email: "cassa@gmail.com",
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

    // edit task
    EditTask(index) {
      (this.task = this.tasks[index].name), (this.editTask = index);
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
          email_paziente: localStorage.getItem("email_paziente"),
        };
        console.log(memo);

        await axios.post("http://localhost:5002/insertMemo", memo).then(
          (res) => {
            console.log(res.data);
            if (res.status === 200) {
              this.tasks.push(memo);
              alert("promemoria inserito correttamente");
            }
          },
          (err) => {
            console.log(err);
            alert("Errore in fase di inserimento del promemoria");
          }
        );
      }
    },

    async SubmitDrug() {
      if (this.farmaco.length === 0) {
        return;
      }
      if (this.editTask != null) {
        //modificare in farmaci tabella
        this.tasks[this.editTask].name = this.task;
        this.editTask = null;
      } else {
        const medicinale = {
          farmaco: this.farmaco,
          orario: this.farmacOrario,
          dosaggio: this.dosaggio,
          email_paziente: "cassa@gmail.com", //modificare email
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
      }
    },

    async deleteDrug(index) {
      await axios
        .post("http://localhost:5002/deleteDrug", {
          email: "cassa@gmail.com", //modificare
          farmaco: this.terapia[index].farmaco,
        })
        .then(
          //modificare
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
      const email = { email: "cassa@gmail.com" }; //modificare
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
      const email = { email: "cassa@gmail.com" }; //modificare email

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
  components: { Side_bar },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -220px;
}

.container {
  width: 1300px;
  margin-left: 250px;
  text-align: center;
  margin-top: 150px;
}

.table-container {
  max-height: 200px;
  overflow-y: scroll;
}

table {
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

.blue-bg {
  background-color: blue;
}

.add-btn {
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

.del-btn {
  border: none;
  background-color: red;
  color: white;
}

.edit-btn {
  border: none;
  background-color: #77b631;
  color: white;
}
</style>
