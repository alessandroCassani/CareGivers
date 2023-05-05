<template>
    <div class="wrapper">
      <Side_bar></Side_bar>
      <div class="container">
        <!-- INSERIRE HEADING -->
        <!-- input -->
        <div>
          <input type="text" v-model="task" placeholder="Aggiungi promemoria..." />
          <input type="date" v-model="reminderDate" />
          <input type="time" v-model="reminderTime" />
          <button class="add-btn" @click="SubmitTask">ADD</button>
        </div>
        <!-- table -->
        <div class="table-container">
          <table border={3}>
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
              <tr v-for="(task,index) in tasks" :key="index" :class="{ 'blue-bg': task.reminderDate === today }">
                <td>{{task.name}}</td>
                <td> {{task.reminderDate}}</td>
                <td> {{task.reminderTime}}</td>
                <td>
                  <button class="del-btn" @click="deleteTask(index)">Delete</button>
                </td>
                <td>
                  <button class="edit-btn" @click="EditTask(index)">Edit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
    
    <script>
    import Side_bar from './Side_bar.vue';

    export default {
    props: {
        msg: String,
    },
    data() {
        return {
            today: new Date().toISOString().slice(0, 10),
            task: "",
            reminderTime: this.memo ? this.memo.reminderTime : '',
            reminderDate: this.memo ? this.memo.reminderDate: '',
            editTask: null,
            tasks: [{
                    name: "visita GM",
                    reminderTime: Date.now(),
                    reminderDate: Date.now()
                }
            ]
        };
    },
    methods: {
        // delete task
        deleteTask(index) {
            this.tasks.splice(index, 1);
        },
        // edit task
        EditTask(index) {
            this.task = this.tasks[index].name,
                this.editTask = index;
        },
        // Add Task
        SubmitTask() {
            if (this.task.length === 0) {
                return;
            }
            if (this.editTask != null) {
                this.tasks[this.editTask].name = this.task;
                this.editTask = null;
            }
            else {
                this.tasks.push({
                    name: this.task,
                    reminderDate: this.reminderDate,
                    reminderTime: this.reminderTime,
                });
            }
        }
    },
    components: { Side_bar }
}
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
    }
    
    .table-container {
      max-height: 600px;
      overflow-y: scroll;
    }
    
    table {
      font-family: arial, sans-serif;
      border-collapse: collapse;
      width: 100%;
      margin-top: 20px;
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
      background-color: #3d2022;
      color: white;
      margin-bottom: 20px;
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