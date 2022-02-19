import { Computer } from "./player";
import { player } from ".";
import ConfettiGenerator from "confetti-js";

const DisplayCpuShips=()=>{
    const cells=document.querySelectorAll(".cpu-cell");
    
    const ships= Computer.gameboard.map.ships;
    cells.forEach((cell)=>ships.forEach((ship)=>{
        if(ship.FindPosition(cell.getAttribute("x"),cell.getAttribute("y"))==true){
             cell.classList.add("cell-ship");

        }}))
};
const GameOver=()=>{
    const body=document.querySelector('body');
    const big_box=document.querySelector(".big-box");
    big_box.classList.add("big-box-end");
    const window=document.querySelector(".window");
    const end_box=document.createElement("div");
    const container=document.querySelector('.container');
    const p=document.querySelector(".error");
    let btn=document.querySelector(".btn-1");
    const pop_up=document.createElement('div');
    pop_up.classList.add("pop-up");
    pop_up.setAttribute("id", "pop-up");
    pop_up.setAttribute("name", "fun");
    const caption=document.createElement('p');
    caption.classList.add("cap");

    const con=document.querySelector("#confetti");
    end_box.classList.add("end-box");
    con.classList.add("confetti-active");
    window.classList.add("window-over");
    p.classList.add("error-over");
    container.classList.add('container-over');
    btn.classList.add('btn-1-over');
    
    var confettiSettings = { target: 'confetti' };
    var confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();
    if(player.AllSunk()==true ){
        caption.innerHTML=" COMPUTER WINS!";
    }
    if(Computer.gameboard.AllSunk()==true){
        caption.innerHTML=" YOU WIN!";
    }
    btn.addEventListener('click', ()=>{
        document.location.reload(true);
    })
    pop_up.appendChild(caption);
    pop_up.appendChild(btn);
    big_box.appendChild(con);
    big_box.appendChild(window);
    body.appendChild(pop_up);
    big_box.appendChild(end_box);


  
   
   
}
const CheckifShipWasSunk=(x, y)=>{
    let proper_x=Number(x);
    let proper_y=Number(y);
    let found=false;
    player.map.ships.forEach((ship)=>{
        if(ship.FindPosition(proper_x, proper_y)==true){
            if(ship.isSunk()==true){
                ShipWasSunk( ship,"player");
                
                found= true;
            }
           
        }

    })
    return found;
}
const ShipWasSunk=(ship, player)=>{
    console.log("i'm here");
    let position=ship.info.positions;
    let window=document.querySelector(".window");
    if(player=="cpu"){
        const cells=document.querySelectorAll(".cpu-cell");
        cells.forEach((cell)=>{
             let result=ship.FindPosition(Number(cell.getAttribute("x")), Number(cell.getAttribute("y")))
             if(result==true){
                 cell.classList.add("sunk");
                 window.innerHTML=" You've have succesfully sunk a ship!";

             }
    })
    }
    if(player=="player"){
        const cells= document.querySelectorAll(".p-cell");
        cells.forEach((cell)=>{
            let result=ship.FindPosition(Number(cell.getAttribute("x")), Number(cell.getAttribute("y")))
            if(result==true){
                cell.classList.add("sunk");
                window.innerHTML=" Your ship sunk!";
            }
        })
    }
  
   
}

export {DisplayCpuShips, GameOver,ShipWasSunk, CheckifShipWasSunk};