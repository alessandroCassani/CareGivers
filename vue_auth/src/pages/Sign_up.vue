<template>
    <form class ="box">
        <h1> Sign Up</h1>
        <div class="form group">
            <label>nome:</label>
           <input type="text" class="form-control" placeholder="nome"> 
        </div>

        <div class="form group">
            <label>cognome:</label>
           <input type="text" class="form-control" placeholder="cognome"> 
        </div>

        <div class="form group">
            <label>Email:</label>
           <input type="email" class="form-control" placeholder="Email"> 
        </div>

        <div class="form group">
            <label>password:</label>
           <input type="password" class="form-control" placeholder="password"> 
        </div>

        <div class="form group">
            <label>conferma password:</label>
           <input type="password" class="form-control" placeholder="conferma password"> 
        </div>

        <div class="form group">
            <span class="ruolo-title" style="color: white;">ruolo:</span> 
            <div class="role">
            <input type="radio" name="ruolo" id="paziente">
           <label>&nbsp;paziente&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label> 
           <input type="radio" name="ruolo" id="caregiver">
           <label>&nbsp;caregiver</label> 
        </div>
        </div>

        <input type="submit" name="" value="REGISTER">
        <p id="text">hai un account?  <RouterLink to="/login">login</RouterLink></p>
    </form>
 </template>
 
 <script>
 export default{};
 
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

   .box input[type="email"],.box input[type="password"],.box input[type="text"]{
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