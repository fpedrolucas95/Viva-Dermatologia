var users = {
    "fabiana": {
        password: "fabi1234",
        name: "Fabiana Carvalho Mendes"
    },
    "evangela": {
        password: "senhaEvangela",
        name: "Evangela Evangelista da Silva"
    },
    "alice": {
        password: "janaina27",
        name: "Alice de Jesus Gonçalves"
    },
    "mabya": {
        password: "senhaMabya",
        name: "Mabya Campos"
    }
}

function login() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Verifique se o usuário e a senha correspondem a algum dos usuários e senhas definidos acima
    if(users[username] && users[username].password === password) {
        // Se o usuário estiver autenticado, oculte o formulário de login e mostre a aplicação.
        document.getElementById('divLogin').style.display = "none";
        document.getElementById('principal').style.display = "block";
        document.getElementById('resultado').style.display = "block";
        
        // Armazena o nome completo do usuário na variável 'userLogado' de 'main.js'
        userLogado = users[username].name;
    } else {
        alert('Usuário ou senha incorretos. Por favor, tente novamente.');
    }
}
