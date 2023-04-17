
<script>
import Side_bar from '@/components/Side_bar.vue';
import { sidebarWidth } from '@/components/state';

export default {
  name: 'referenti',
  components: {Side_bar},
  setup(){
    return {sidebarWidth}
  },
  mounted(){
      let use = localStorage.getItem('user-info');
      if(use){
        this.$router.push({path: '/signUp'});
      }
    }
}; 
</script>

<template>
 <Side_bar>
  
 </Side_bar><div :style="{ 'margin-left': sidebarWidth}"></div>
  
  <body>
    <div class="inputReferente">
      <h3> inserire email referente:</h3>
      <input type="email" v-model="email" class="form-control" placeholder="email referente"> 
    </div>
  <h1>INSERISCI OTP</h1>
 <div class="otp-bx">
  <input type="text" maxlength="1">  
  <input type="text" maxlength="1"> 
  <input type="text" maxlength="1" class="space"> 
  <input type="text" maxlength="1"> 
  <input type="text" maxlength="1"> 
 </div> 
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

