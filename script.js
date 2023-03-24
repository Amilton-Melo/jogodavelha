// Referência do jogador (h2 no html)
const currentPlayer = document.querySelector(".currentPlayer");

// Duas variaveis uma para seleção e a outra para o player, iniciando pelo X
let selected;
let player = "X";

// Variavel para as posições possiveis de um ganhador
let positions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
];

// Função para niciar o jogo
function init(){

    // Inicia com a área vazia
    selected = [];

    // Armazena o player
    currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;

    // Usado para o forEach em todos os botões, para começar com o HTML vazio, sem nenhum botão preenchido
    document.querySelectorAll(".game button").forEach((item) => {
        item.innerHTML = "";
        item.addEventListener("click", newMove);
    });

}

// Ao abrir ele inicia
init();

// Evento referente ao botão
function newMove(e){

    // Pega o botão através do atributo
    const index = e.target.getAttribute("data-i");
    e.target.innerHTML = player;

    // Faz com que não seja possível alterar o botão trocando de X para O ou vice-versa
    e.target.removeEventListener("click", newMove);

    // Armazena no index do botão o jogador que clicou
    selected[index] = player;

    setTimeout(() => {
        check();
    }, [100]);

    // Troca de player
    player = player === "X" ? "O" : "X";
    currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;
}

// Função para pegar o jogador
function check() {
    let playerLastMove = player === "X" ? "O" : "X";

    // Verificação para mapeamento do player nos botões
    const items = selected
    .map((item, i) => [item, i])
    .filter((item) => item[0] === playerLastMove)
    .map((item) => item[1]);

    // Verifica se tem ganhador através do every
    for (pos of positions){
        if(pos.every((item) => items.includes(item))) {
            alert("O JOGADOR " + playerLastMove + " GANHOU!!!");

            //Reinicia o jogo
            init();
        }
    }

    // Verifica se deu empate
    if(selected.filter((item) => item).length === 9){
        alert("DEU EMPATE!");

        //Reinicia o jogo
        init();
    }
}