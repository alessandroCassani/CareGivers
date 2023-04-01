<template>
    <body class="body">
        <form class="box">
            <h1>Login</h1>
            <input type="email" name="" placeholder="email">
            <input type="password" name="" placeholder="password">
            <input type="submit" name="" value="login">
        </form>
    </body>

    
</template>


<script>
   export default {
       name: 'Log_in',
        data() {
           return {
            password: "",
            passwordFieldType: "password",
            showPassword: false,
            passwordImgVisible: 'data:image/png;base64,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',
            passwordImgNotVisible: 'data:image/png;base64,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'
           };
        },
        computed: {
    buttonLabel() {
      return (this.showPassword) ? "Hide" : "Show";
    }
  },
     methods: {
           login(){
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
           },
        
            switchVisibility() {
                 this.passwordFieldType = this.passwordFieldType === "password" ? "text" : "password";
    },
    toggleShow() {
      this.showPassword = !this.showPassword;
    }
}
};
   
</script>

<style scoped>
   .body,html{
    margin: 0;
    padding: 0;
    min-height: 100vh;
    width: 100%;
    font-family: sans-serif;
    background: aqua;
   }

   .box h1{
    color: white;
    text-transform: uppercase;
    font-weight: 500;

   }

   .box{
    width: 300px;
    padding: 40px;
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: #191919;
    text-align: center;
   }

   .box input[type="email"],.box input[type="password"]{
    border:0;
    background: none;
    display: block;
    margin: 20px auto;
    text-align: center;
    border: 2px solid #3498db;
    padding: 14px 10px;
    width: 200px;
    outline: none;
    color: antiquewhite;
    border-radius: 24px;
    transition: o.25s;
   }

  .box input[type="email"]:focus,.box input[type="password"]:focus{
    width: 100px;
    border-color: brown;
  }

  .box input[type="submit"]{
    border: 0;
    background: none;
    display: block;
    margin: 20px auto;
    text-align: center;
    border: 2px solid #3498db;
    padding: 14px 40px;
    outline: none;
    color: antiquewhite;
    border-radius: 24px;
    transition: o.25s;
    cursor: pointer;


  }

  .box input[type="submit"]:hover{
    background: greenyellow;
    

  }
</style>