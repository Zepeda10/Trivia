<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trivia</title>
    <link rel="icon" type="image/png" href="img/question.ico">
    <link rel="stylesheet" href="css/login.css" />
</head>
<body>
    <div class="login">
        <form action="#" method="get">
            <div class="img-login">
                <img src="img/user.png" alt="Avatar" class="avatar">
            </div>
            <label for="usuario">Usuario</label>
            <input type="text" class="input" id="usuario" value="Prueba" placeholder="Usuario">
            <label for="pass">Contraseña</label>
            <input type="password" class="input" id="pass" value="12345" placeholder="**********">
            <button type="button" onclick="login()">Iniciar Sesión</button>
        </form>
    </div>

    <script>

        function login(){
            var usuario = document.getElementsByClassName("input")[0].value;
            var pass = document.getElementsByClassName("input")[1].value;

            if(usuario === "Prueba" && pass ==="12345"){
                sessionStorage.setItem('usuario', usuario);
                sessionStorage.setItem('pass', pass);
                window.location.href = "inicio.html";
            }else{
                alert("Usuario y/o contraseña incorrectos");
            }
        }
        
    </script>
</body>
</html>