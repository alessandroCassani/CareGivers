
<script>
import Side_bar from '@/components/Side_bar.vue';
import sidebarWidth from '@/components/state';
import axios from 'axios';




export default{
  name: 'referenti',
  components: {Side_bar},

  data(){
    return{
      otp: '',
      e_mail: '',
      ruolo: localStorage.getItem('ruolo'),
      firstOtp: '',
      secondOtp: '',
      thirdOtp: '',
      fourthOtp: '',
      fifthOtp: '',
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
  console.log('MOUNTED ' + localStorage.getItem('ruolo'))
 
 },

 methods:{
    
    createOtp(){
      const length = 5;
      let otp = '';

      for(let i = 0; i < length; i++) {
        otp += Math.floor(Math.random() * 10)
      }
      console.log(otp)

      const data = {
        otp: otp,
        email: localStorage.getItem('email')
      }
      axios.post('http://localhost:5001/insertOtp', data)
      .then(res =>{
        console.log(res.data)
      },err =>{alert(err)})
    },

    sendOtp(){
     const data = {
      otp: this.firstOtp + this.secondOtp + this.thirdOtp + this.fourthOtp + this.fifthOtp,
      email_paziente: this.e_mail
     }

     axios.post('http://localhost:5001/checkOtp', data)
      .then(res =>{
        console.log(res.data)
      },err =>{alert(err)})
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
      <input type="email" v-model="e_mail" v-if="!isPatient" class="form-control"  placeholder="email paziente"> 
    </div>
    <br>  
  <h1 v-if="!isPatient">INSERISCI OTP</h1>
 <div v-if="!isPatient" class="otp-bx">
  <input type="text" v-model="firstOtp" maxlength="1">  
  <input type="text" v-model="secondOtp" maxlength="1"> 
  <input type="text" v-model="thirdOtp" maxlength="1" class="space"> 
  <input type="text" v-model="fourthOtp" maxlength="1"> 
  <input type="text" v-model="fifthOtp" maxlength="1"> 
 </div> 

 <input type="submit" @click="createOtp()" value="GENERA" v-if="isPatient">
<br>   
 <input type="submit" @click="sendOtp()" value="CONFERMA" v-if="!isPatient">
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

