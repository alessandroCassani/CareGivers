<template>
    <body>
    <div class="container">
       <h1 class="form title">Registrazione</h1> 
      <form action="#">
        <div class="main-user-info">
            <div class="user-input-box">
              <label for="nome">nome</label>  
              <input type="text" id="nome" placeholder="nome">
            </div>
            <div class="user-input-box">
              <label for="cognome">cognome</label>  
              <input type="text" id="cognome" placeholder="cognome">
            </div>
            <div class="user-input-box">
              <label for="email">email</label>  
              <input type="email" id="email" placeholder="email">
            </div> 
            <div class="user-input-box">
              <label for="data di nascita">data di nascita</label>  
              <input type="date" id="data di nascita" placeholder="data di nascita">
            </div>
            <div class="user-input-box">
              <label for="cf">codice fiscale</label>  
              <input type="text" id="cf" placeholder="codice fiscale">
            </div>
            <div class="user-input-box">
              <label for="telefono">telefono</label>  
              <input type="text" id="telefono" placeholder="telefono">
            </div>
            <div class="user-input-box">
              <label for="password">password</label>  
              <input type="password" id="psw" placeholder="password">
            </div>
            <div class="user-input-box">
              <label for="password2">ripeti password</label>  
              <input type="password" id="psw2" placeholder="ripeti password">
            </div>   
        </div>
       <div class="ruolo">
       <span class="ruolo-titolo">ruolo</span> 
    <div class="role-type">
        <input type="radio" name="role" id="paziente">
        <label for="paziente">paziente</label> 
        <input type="radio" name="role" id="caregiver">
        <label for="caregiver">caregiver</label> 
    </div> 
       </div> 
       <div class="button-submit">
           <input type="submit" value="register">  
       </div>
      </form> 
    </div>
</body>
 </template>
 
 <script>
 export default{};
 
 </script>  
 
 <style>
 
 .body,html{
    padding: 0;
    margin: 0;
    font-family: sans-serif;
    width: 100%;
    display: flex;
    min-height: 100vh;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(to bottom right,rgb(0, 115, 255), rgba(255, 255, 255, 0.86));
 }

 .container{
    max-width: 650px;
    padding: 10px;
    margin: 0px;
    border-radius: 42px;
 }

.container h1{
    color: black;
    text-transform: uppercase;
    font-style: italic;
    text-align: center;
    font-weight: 500;
}

.main-user-info{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 20px 0;
}

.user-input-box{
    display: flex;
    flex-wrap: wrap;
    width: 50%;
    padding-bottom: 15px;
}


</style>