
<script>
import Side_bar from '@/components/Side_bar.vue';
import { sidebarWidth } from '@/components/state';
export default {
  name: 'referenti',
  components: {Side_bar},
  setup(){
    return {sidebarWidth}
  }
}; 
</script>

<template>
 <Side_bar>
  <div :style="{ 'margin-left': sidebarWidth}"></div>
 </Side_bar>
  
  <body>
  <div class="container">
    <div class="inputfield">
      <input type="number" maxlength="1" class="input" disabled>
      <input type="number" maxlength="1" class="input" disabled>
      <input type="number" maxlength="1" class="input" disabled>
      <input type="number" maxlength="1" class="input" disabled>
    </div>
    <button class="hide" id="submit" onclick="validateOTP()">Submit</button>
  </div>
</body>


</template>



<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.body,html {
  height: 100vh;
  background: rgb(28, 134, 255)
}

.container {
  width: 28em;
  background-color: #ffffff;
  padding: 4em 2em;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  border-radius: 0.8em;
  box-shadow: 0 45px 60px rgba(30, 22, 1, 0.3);
}

.inputfield {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.input {
  height: 3em;
  width: 3em;
  border: 2px solid #dad9df;
  outline: none;
  text-align: center;
  font-size: 1.5em;
  border-radius: 0.3em;
  background-color: #ffffff;
  outline: none;
  /*Hide number field arrows*/
}

.input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.input:disabled {
  color: #89888b;
}
.input:focus {
  border: 3px solid #ffb800;
}

.submit {
  background-color: #044ecf;
  border: none;
  outline: none;
  font-size: 1.2em;
  padding: 0.8em 2em;
  color: #ffffff;
  border-radius: 0.1em;
  margin: 1em auto 0 auto;
  cursor: pointer;
}
</style>

