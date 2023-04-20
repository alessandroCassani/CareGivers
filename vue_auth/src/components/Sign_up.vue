<template>
    <form class ="box">
        <h1> Sign Up</h1>
        <div class="form group">
            <label>nome:</label>
           <input type="text" v-model="nome"  class="form-control" placeholder="nome"> 
        </div>

        <div class="form group">
            <label>cognome:</label>
           <input type="text" v-model="cognome"  class="form-control" placeholder="cognome"> 
        </div>

        <div class="form group">
            <label>Data di nascita:</label>
           <input type="date" v-model="dataDiNascita" class="form-control" placeholder="data di nascita"> 
        </div>

        <div class="form group">
            <label>email:</label>
           <input type="email" v-model="email" class="form-control" placeholder="email"> 
        </div>

        <div class="form group">
            <label>password:</label>
           <input type="password" v-model="password" class="form-control" placeholder="password" autocomplete="on"> 
        </div>

        <div class="form group">
            <label>conferma password:</label>
           <input type="password" v-model="ripetiPassword" class="form-control" placeholder="conferma password" autocomplete="on"> 
        </div>

        <div class="form group">
            <span class="ruolo-title" style="color: white;">ruolo:</span> 
            <div class="role">
            <input type="radio" v-model="ruolo" name="ruolo" value="paziente" id="paziente">
           <label>&nbsp;paziente&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label> 
           <input type="radio" v-model="ruolo" name="ruolo" value="caregiver" id="caregiver">
           <label>&nbsp;caregiver</label> 
        </div>
        </div>

        <input type="submit" @click="signUp()" name="" value="REGISTER">
        <p id="text">hai un account?  <RouterLink to="/login">login</RouterLink></p>
        {{ error }}
    </form>
 </template>
 
 <script>
  import axios from 'axios';
  
  export default{
   name:'Sign_up',

   data(){
      return{
         nome:'',
         cognome:'',
         dataDiNascita: '',
         email:'',
         password:'',
         ripetiPassword:'',
         ruolo:'',

         error: ''
      }
   },

   methods:{
       signUp (){
         
        
          let newUser = {
                nome: this.nome,
                cognome: this.cognome,
                dataDiNascita: this.dataDiNascita,
                email: this.email,
                password:this.password,
                ripetiPassword: this.ripetiPassword,
                ruolo: this.ruolo
             }
             
            axios.post('http://localhost:5000/signup',newUser)
           .then(res => {
            console.log(res)
            this.error = ''
            this.$router.push('/login')
           }, err => {
            console.log(err.response)
            this.error = err.response.data.error
           })
       }
   } 
}
 
 </script>  
 
 <style>
 .body,html{
    margin: 0;
    padding: 0;
    min-height: 100vh;
    width: 100%;
    font-family: sans-serif;
    background-image: linear-gradient(to bottom right,rgb(0, 115, 255), rgba(255, 255, 255, 0.86));
 }

 .box{
    width: 400px;
    padding: 20px;
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

 .box h1{
    color: white;
    text-transform: uppercase;
    font-style: italic;
    font-weight: 500;
   }

   .box label{
    color: white;
   }

   .box input[type="email"],.box input[type="password"],.box input[type="text"],.box input[type="date"]{
    border:0;
    background:  rgba(255, 255, 255, 0.86);
    display: block;
    margin: 5px auto;
    text-align: center;
    font-size: 20px;
    border: 2px solid white;
    padding: 14px 10px;
    width: 200px;   
    outline: none;
    color: black;
    border-radius: 5px;
    transition: o.25s;
   }

   .box input[type="email"]:focus,.box input[type="password"]:focus,.box input[type="text"]:focus{
    width: 280px;
  }

  .box input[type="submit"]{
    border: 0;
    background:  rgba(255, 255, 255, 0.86);
    display: block;
    margin: 15px auto;
    text-align: center;
    border: 2px solid white;
    font-size: 18px;
    padding: 14px 40px;
    outline: none;
    color: black;
    border-radius: 20px;
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