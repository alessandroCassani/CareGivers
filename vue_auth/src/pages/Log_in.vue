<template>

  <body class="body">
      <form class="box">
          <h1>Login</h1> 
          <input type="email" name="" v-model="email" placeholder="email">
          <input type="password" name="" v-model="password" placeholder="password">
          <input type="submit" @click="login()" name="" value="LOGIN">
          <p id="text">Non hai un account?  <RouterLink to="/signup">Registrati</RouterLink></p>
      </form>
  </body>

  
</template>


<script>
import axios from 'axios';


   export default {
    name: "Log_in",

    data(){
      return {
        email: '',
        password: ''
      }
    },
    methods:{
       login(){

        let loggedUser = {
          email: this.email,
          password: this.password
        }

        try{
          const response =  axios.post('http://localhost:5000/login', loggedUser)
          alert('accesso avvenuto correttamente')
          this.$router.push('/referenti')
        }catch(error){
          alert(error)
        }
      }
    }
  }
   
</script>

<style scoped>
   .body,html{
    margin: 0;
    padding: 0;
    min-height: 100vh;
    width: 100%;
    font-family: sans-serif;
    background-image: linear-gradient(to bottom right,rgb(0, 115, 255), rgba(255, 255, 255, 0.86));
   }

   .box h1{
    color: white;
    text-transform: uppercase;
    font-style: italic;
    font-weight: 500;
   }

   .box{
    width: 400px;
    padding: 40px;
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: black;
    text-align: center;
    border-radius: 10px;
    opacity: .5;
    border-color: white;
   }

   .box input[type="email"],.box input[type="password"]{
    border:0;
    background:  rgba(255, 255, 255, 0.86);
    display: block;
    margin: 20px auto;
    text-align: center;
    font-size: 20px;
    border: 2px solid white;
    padding: 10px 10px;
    width: 200px;   
    outline: none;
    color: black;
    border-radius: 5px;
    transition: o.25s;
   }

  .box input[type="email"]:focus,.box input[type="password"]:focus{
    width: 280px;
  }

  .box input[type="submit"]{
    border: 0;
    background:  rgba(255, 255, 255, 0.86);
    display: block;
    margin: 20px auto;
    text-align: center;
    border: 2px solid white;
    font-size: 18px;
    padding: 14px 40px;
    outline: none;
    color: black;
    border-radius: 24px;
    transition: o.25s;
    cursor: pointer;
  }

  .box input[type="submit"]:hover{
    background: #3498db;
  }

  #text{
    color: white;
  }
</style>