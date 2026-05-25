const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const rodX = [250, 500, 750];
const baseY = 450;

let towers = [[], [], []];
let moves = [];

function initDisks(n){

    towers = [[], [], []];

    for(let i=n; i>=1; i--){
        towers[0].push(i);
    }

    draw();
}

function draw(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    // rods
    ctx.fillStyle = "#e3b7c2";

    for(let i=0;i<3;i++){

        ctx.fillRect(rodX[i], 180, 10, 280);
    }

    // base
    ctx.fillRect(150,460,700,10);

    // disks
    for(let t=0;t<3;t++){

        for(let i=0;i<towers[t].length;i++){

            const disk = towers[t][i];

            const width = disk * 30 + 30;
            const x = rodX[t] - width/2 + 5;
            const y = baseY - i*25;

            ctx.fillStyle = "green";
            ctx.fillRect(x,y,width,20);

            ctx.fillStyle = "black";
            ctx.font = "12px Arial";
            ctx.fillText(disk, x + width/2 - 3, y + 14);
        }
    }
}

function hanoi(n, from, to, aux){

    if(n===1){
        moves.push([from,to]);
        return;
    }

    hanoi(n-1, from, aux, to);

    moves.push([from,to]);

    hanoi(n-1, aux, to, from);
}

function animateMoves(index=0){

    if(index >= moves.length){

        alert("Tower is Finished");
        return;
    }

    const move = moves[index];

    const disk = towers[move[0]].pop();

    towers[move[1]].push(disk);

    draw();

    setTimeout(()=>{
        animateMoves(index+1);
    },700);
}

function startGame(){

    let n = parseInt(document.getElementById("numDisk").value);

    if(isNaN(n) || n<1){

        alert("Enter valid number");
        return;
    }

    moves = [];

    initDisks(n);

    hanoi(n,0,2,1);

    setTimeout(()=>{
        animateMoves();
    },800);
}

initDisks(3);
