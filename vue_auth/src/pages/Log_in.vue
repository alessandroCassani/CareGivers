<template>
<div id="app">
<div class="container">
    <div class="row">
        <div class="col-lg-4 col-md-7 col-sm-8 mx-auto">
            <h1>Sign In</h1>
               <form class="form-group">
                  <input id="inputMail" type="email" class="form-control" placeholder="Email" required>
                  <input id="inputPsw" type="password" class="form-control" placeholder="Password" required>
                  <button id="btn" type="button" class="btn btn-outline-success">Success</button>
                  <p>Don't have an account?>Sign up here</p>
                  <p>Forgot your password?</p>
               </form>
        </div>
    </div>
</div>
</div>
</template>


<script>
   export default {
       name: 'Log_in',
       data() {
           return {
               input: {
                   username: "",
                   password: ""
               }
           }
       },
       methods: {
           login() {
               if(this.input.username != "" && this.input.password != "") {
                   if(this.input.username == this.$parent.mockAccount.username && this.input.password == this.$parent.mockAccount.password) {
                       this.$emit("authenticated", true);
                       this.$router.replace({ name: "secure" });
                   } else {
                       console.log("The username and / or password is incorrect");
                   }
               } else {
                   console.log("A username and password must be present");
               }
           }
       }
   }
</script>

<style scoped>

    #app{
    display: flex;
    align-items: center;
    height: 90vh;
    }

 

   #inputMail{
    margin-top: 20px;
   }

   #inputPsw{
    margin-top: 20px;
   }

   #btn{
    margin-top: 20px;
   }

  
   
</style>