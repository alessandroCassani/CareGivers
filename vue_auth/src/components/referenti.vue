
<script>
import Side_bar from '@/components/Side_bar.vue';
import sidebarWidth from '@/components/state';
//import axios from 'axios';



export default{
  name: 'referenti',
  components: {Side_bar},

  data(){
    return{
      otp: '',
      email: localStorage.getItem('email'),
      ruolo: localStorage.getItem('ruolo'),
      sidebarWidth
    }
  },
  computed:{
    isPatient(){
      return this.ruolo ==='paziente'
    }
  },

 created(){
  console.log('CREATED REFERENTI')
  if(localStorage.getItem('token') === null){
    this.$router.push('/login')
  }
 },

 mounted(){
  console.log('MOUNTED' + localStorage.getItem('ruolo'))
  this.getInfo
 
 },

 methods:{
      getInfo(){
     //   let info = {email}
     //   axios.post('http://localhost:5000/user', info)
    //   .then((result) => {
    ////     console.log('THEN MOUNTED')
   //      console.log(result.data)
  //     })
      }
}
 
}; 
</script>

<template>
  
 <Side_bar>
</Side_bar>
  <div :style="{ 'margin-left': sidebarWidth}"></div>

 
  
  <body>
    <div class="inputReferente">
      <h3 v-if="!isPatient"> inserire email paziente:</h3>
      <h1 v-if="isPatient"> genera OTP:</h1>
      <input type="email" v-if="!isPatient" v-model="email" class="form-control" placeholder="email paziente"> 
    </div>
  <h1 v-if="!isPatient">INSERISCI OTP</h1>
 <div v-if="!isPatient" class="otp-bx">
  <input type="text" maxlength="1">  
  <input type="text" maxlength="1"> 
  <input type="text" maxlength="1" class="space"> 
  <input type="text" maxlength="1"> 
  <input type="text" maxlength="1"> 
 </div> 

 <input type="submit" value="GENERA" v-if="isPatient">
</body>


</template>



<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: sans-serif;
}

body{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
}

.otp-bx{
  display: flex;
}

.otp-bx input{
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

.otp-bx.input :focus{
  border: 2px solid #27ffa9;
  box-shadow: 0 0 2px 2px #27ffd76a;
}

.space{
  margin-right: 1rem !important;
}
</style>

