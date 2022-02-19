import { isNumber, reject } from "lodash";
import { Computer } from "./player";
import { player } from ".";
import { CheckifShipWasSunk, ShipWasSunk } from "./cpu-display";


const CreateGameboards=()=>{
  
    
    const gameboards=document.querySelectorAll(".gameboard");
    const board=document.querySelector("#playerboard");
    const attackboard=document.querySelector("#atackboard");
    const container=document.querySelector(".container");
    console.log(board); 
   
        for(let i =1; i<=10; i++){
            for (let j=1; j<=10; j++){
                const cell=document.createElement('div');
                cell.classList.add("cell");
                cell.setAttribute("x", i);
                cell.setAttribute("y", j);
                cell.setAttribute("taken", "no");
                cell.innerHTML=" ";
                cell.classList.add("p-cell");
                board.appendChild(cell);
            }
        }
        

   
        for(let i =1; i<=10; i++){
            for (let j=1; j<=10; j++){
                const cell=document.createElement('div');
                cell.classList.add("cell");
                cell.setAttribute("x", i);
                cell.setAttribute("y", j);
                cell.setAttribute("taken", "no");
                cell.innerHTML=" ";
                cell.classList.add("cpu-cell")
                attackboard.appendChild(cell);
            }
        }
     
    //  gameboards.forEach((gameboard)=>{
    //     for(let i =1; i<=10; i++){
    //         for (let j=1; j<=10; j++){
               
    //             const cell=document.createElement('div');
    //             cell.classList.add("cell");
    //             cell.setAttribute("x", i);
    //             cell.setAttribute("y", j);
    //             cell.innerHTML=" ";
    //            if(gameboard.getAttribute("id")=="playerboard");{
    //                 cell.setAttribute("whose","player")

    //             }
    //            if(gameboard.getAttribute("id")=="atackboard");{
    //                 cell.setAttribute("whose","cpu")
                    
    //             }
    //             gameboard.appendChild(cell);
                
                
    //           };
    //      };
    //  })

         
        
};
const LoadGameboards=(gameboard, player)=>{
  if(player!="cpu"){
      const board=document.querySelector("#playersboard");
      const cellz=document.querySelector(".p-cell");
      const cells=[...cellz];
      cells.forEach(cell => {
          //if matches any ship place mark it 
          let result=gameboard.map.ships.some((e)=>{ e.x==cell.x && e.y==cell.y});
          if(result==true){
            cell.classList.add("cell-ship");
          }
          
      });

  }
 if(player=="cpu"){
    const board=document.querySelector("#atackboard");
    const cellz=document.querySelector(".cpu-cell");
    const cells=[...cellz];
    cells.forEach(cell => {
        //if matches any ship place mark it 
        let result=Computer.cpu_grid.some((e)=>{ e.x==cell.x && e.y==cell.y});
        if(result==true){
          cell.classList.add("cell-ship");
        }
        
    });

 }
};
// const Prompt=()=>{
//     const div=document.createElement("div");
//     div.classList.add("form");
//     const big_box=document.querySelector(".big-box");
//     const p=document.createElement("div");
//     const btn=document.createElement("button");

//     btn.classList.add("btn-1");
//     btn.setAttribute("id","name-btn");
//     p.classList.add("prompt");
//     p.setAttribute("placeholder", "name");
//     p.setAttribute("type", "input");
//     btn.setAttribute("type", "submit");
//     div.appendChild(btn);
//     div.appendChild(p);
//     big_box.appendChild(div);
   
 
 
// };
const PlacingWindow=(num)=>{
 const div=document.querySelector(".window");

  
  let new_num=Number(num);
  console.log(isNumber(new_num));

  const big_box=document.querySelector(".big-box");
 
  switch(new_num){
      case 0:
          
            const window=document.createElement("div");
            window.classList.add("window");
            window.innerHTML=" > Place one Carrier (5)";
            big_box.appendChild(window); 
          
            break;
      case 1:
          div.innerHTML=" > Place one Carrier (5)";
          break;
      case 2:
        div.innerHTML=" > Place two Battleships (4)";
        break;
     case 3:
        div.innerHTML=" > Place three Destroyers (3)";
        break;
     case 4:
        div.innerHTML=" > Place four Submarines (3)";
        break;
     case 5:
        div.innerHTML=" > Place five Patrol Boats (2)";
        break;
     case 6:
         div.innerHTML=" > You've Placed All Ships! Let's start!";
         break;
     case 7:
         div.innerHTML=" > Attack your oponent!";
         break;
     default:
        div.innerHTML=" > Place ships!";
        break;
         
  }
  
   

  
};
const DisplayTurn=(player)=>{
   const window=document.querySelector(".window");
   window.innerHTML="it's "+player+"'s turn";
};
const ErrorHandler=(message)=>{
    const existing_div=document.querySelector(".error-box");
    if(!existing_div){
        const div=document.createElement('div');
        div.classList.add("error-box");
        const p= document.createElement("p");
        p.innerHTML=message;
        const big_box=document.querySelector(".big-box");
        p.classList.add("error");
        p.classList.add("active");
        div.appendChild(p);
        big_box.appendChild(div);
        window.setTimeout(() => {
            p.classList.remove("active");
            p.classList.add("inactive");
        }, 800);
        window.setTimeout(()=>{
            p.classList.remove("inactive");
          },1000);
    }
    else{
        const p=document.querySelector(".error");
        p.innerHTML=message;
        p.classList.add("active");
        window.setTimeout(() => {
            p.classList.remove("active");
            p.classList.add("inactive");
        }, 800);
        window.setTimeout(()=>{
          p.classList.remove("inactive");
        },1000);
    }

  

};


const ClickShips=(len)=>{
    let len2=Number(len);
    let coordinates=[];
    let click_count=0;
    let was_clicked=false;
    let done=false;
    const AreRight=(x,y)=>{
        let prev_x=Number(coordinates[coordinates.length-2]);        
        let prev_y=Number(coordinates[coordinates.length-1]);
    
      
        if(coordinates.length==0){
            return true;
        }
        if(x==prev_x){
              //shoot along x        
               if(coordinates.length<=2){
                    if(y==prev_y+1||x==prev_y-1){                 
                
                        return true;
                     }
                     else{
                         return false;
                     }
                }
               else{
                    let second_last_x=Number(coordinates[coordinates.length-3]);
                    let second_last_y=Number(coordinates[coordinates.length-4]);
                    if(second_last_y==y+1|| second_last_y==y-1|| prev_y==y-1|| prev_y==y+1){
                        return true;
                    }
            //         let does_it_stick=false;
            //         coordinates.forEach((coor, index)=>{
            //             if(index%2==0){
            //                 if(coor==y+1|| coor==y-1){
            //                     does_it_stick=true;
            //                 }
            //             }
            //         })
            //            return does_it_stick;
     
                }
        }
        if(y==prev_y){
            if(coordinates.length<=2){
                if(x==prev_x+1||x==prev_x-1){                 
            
                    return true;
                 }
                 else{
                     return false;
                 }
            }
           else{
                let second_last_x=Number(coordinates[coordinates.length-3]);
                let second_last_y=Number(coordinates[coordinates.length-4]);
                if(second_last_x==x+1|| second_last_x==x-1|| prev_x==x-1|| prev_x==x+1){
                    return true;
                }
                // let does_it_stick=false;
                // coordinates.forEach((coor, index)=>{
                //     if(index%2!=0){
                //         if(coor==y+1|| coor==y-1){
                //             does_it_stick=true;
                //         }
                //     }
                // })
                //    return does_it_stick;
 
           }
         
        }
        else{
            return false;
        }
    }
    const cells= document.querySelectorAll(".p-cell");
    const PlayerShips= async(ev)=>{
        try{

            was_clicked=true;
        
            if(ev.target.getAttribute("taken")!="yes"){
                if(AreRight(Number(ev.target.getAttribute("x")),Number(ev.target.getAttribute("y")))==false){
                    ErrorHandler("Place ship parts so they stick!");
                }//może to?
                if(AreRight(Number(ev.target.getAttribute("x")),Number(ev.target.getAttribute("y")))==true){
                    console.log(ev.target);
                    let target_y=ev.target.getAttribute("y");
                    let target_x=ev.target.getAttribute("x");
                    ev.target.setAttribute("taken", "yes");
                    ev.target.classList.add("cell-ship");
            
                    coordinates.push(Number(target_x));
                    coordinates.push(Number(target_y));
                    console.log(isNumber(target_y));
                    console.log(isNumber(target_x));
                    console.log(click_count);
                    click_count++; 
                    return click_count;
                }
                
                }
          
         else{
            ErrorHandler("This spot is already taken! Pick a different one!");
            }
        }
          catch{
            ErrorHandler("Something went wrong!");
          }
       
    };



    const controller = new AbortController();
    return new Promise((resolve, reject)=>{
         cells.forEach((cell)=>{cell.addEventListener('click', async function HandleEvent(ev){
             try{
                let clicks= await PlayerShips(ev);
                if(clicks==len2){
                    controller.abort();
                    resolve(coordinates);
                }
                }
             catch{
                ErrorHandler("Something went wrong");
             }

        },{ signal: controller.signal })})
    });

}
const AttackComputer=()=>{
    const cells=document.querySelectorAll(".cpu-cell");
    const controller=new AbortController;
    const hit_something=false;
    const done=false;
    let coors=[];
    let tried=0;

    const AttackShips=async(ev)=>{
        try{
           
            if(ev.target.getAttribute("taken")!="yes"){
                //check if it hits something
                
                let x=Number(ev.target.getAttribute("x"));
                let y=Number(ev.target.getAttribute("y"));
                async function Check(){
                    try{
                        
                        //let response= Computer.gameboard.map.ships.forEach((ship)=>{ return ship.FindPosition(x,y)});
                        //return Computer.gameboard.map.ships.forEach((ship)=>{ return ship.FindPosition(x,y)})
                        let ready=false;
                        Computer.gameboard.map.ships.forEach((ship)=>{
                            if(ship.FindPosition(x, y)==true){
                                ready=true;
                                Computer.gameboard.ReciveAttack(x, y);
                                if(ship.isSunk()==true){
                                    console.log("Ship sunk");
                                    ShipWasSunk( ship,"cpu");
                                }
        
                            }
                   
                        })
                        return ready;
                    }
                   
                    catch{
                        ErrorHandler("Something is wrong 3");
                    }

                }
                let response= await Check();
                console.log(response);
                if(response==true){
                    ev.target.classList.add("hit");
                    ev.target.setAttribute("taken", "yes");
                    ev.target.innerHTML="X";
                    coors.push(x);
                    coors.push(y);
                    return true;
                }
                else{
                    console.log("i've made it");
                    ev.target.classList.add("missed");
                    console.log("after-class");
                    ev.target.setAttribute("taken", "yes");
                    ev.target.innerHTML=" . ";
                    coors.push(x);
                    coors.push(y);
                    return true;
                }
                 
                //return done;

            }
            else{
               ErrorHandler("Pick a spot you haven't tried before");
            }
  
    
            }
      catch{
            console.log(ev.target);
            ErrorHandler("Something went wrong! 1");
        }
    }
    return new Promise((resolve, reject)=>{
        cells.forEach((cell)=>{cell.addEventListener('click', async function HandleEvent(ev){
           try{
             let response= await AttackShips(ev);
             if(response==true){
                controller.abort();
                resolve(coors);
             }    
           }
           catch{
             ErrorHandler("Something went wrong! 2");
           }
        },{ signal: controller.signal })})
    })
}
const DisplayCpuMoves=()=>{
    const cells= document.querySelectorAll(".p-cell");
    let move=Computer.MakeMoves();
    let found_something=false;
    
    let x=Number(move.x);
    let y=Number(move.y);
    let coor=[x,y];
    console.log("here");
    // player.map.ships.forEach((ship)=>{ let position=ship.info.positions.find((pos)=>{Number(pos.x)==x &&Number(pos.y)==y});
    //  if(position == undefined){
    //     console.log("undef part 2");
    //  }
    //  else{
    //      console.log("made it");
    //      found_something=true;
    //  }
    // });
    // if(found_something==true){
        cells.forEach((cell)=>{
            if(Number(cell.getAttribute("x"))==x && Number(cell.getAttribute("y"))==y){
                if(cell.classList.contains("cell-ship")==true){
                    cell.classList.add("hit");
                    cell.innerHTML="X";
                    Computer.moves_made[Computer.moves_made.length-1].hitSomething=true;
                    player.ReciveAttack(move.x, move.y);
                    if(CheckifShipWasSunk(move.x, move.y)==true){
                        Computer.moves_made[Computer.moves_made.length-1].SunkedSomething=true;  
                    }
                    
                    
                }
                else{
                    cell.classList.add("missed");
                    cell.innerHTML=" . ";
            
                    
                }
            }
        })
     
     //}
     return coor;
};
const ClearBoards=()=>{
    
    const p_cells=document.querySelectorAll(".p-cell");
    const cpu_cells=document.querySelectorAll(".cpu-cell");
    p_cells.forEach((cell)=>{ cell.classList.remove("cell-ship");
        cell.setAttribute("taken", "no");
        cell.classList.remove("missed");
        cell.classList.remove("hit");
 });
    cpu_cells.forEach((cell)=>{ cell.classList.remove("cell-ship");
        cell.setAttribute("taken", "no");
        cell.classList.remove("missed");
        cell.classList.remove("hit");
    });
   
}



export {ClearBoards ,DisplayCpuMoves ,AttackComputer, ClickShips,CreateGameboards, LoadGameboards,  PlacingWindow};