import { PlayerFactory, Computer } from "./player";
import { ClearBoards,DisplayCpuMoves,ClickShips,ClickShipsSignals,CreateGameboards, PlaceShips, PlacingWindow, AttackComputer,  } from "./display";
import { reject } from "lodash";
import {DisplayCpuShips, GameOver} from "./cpu-display";


CreateGameboards();
const player=PlayerFactory();
const GameLoop=()=>{
  let btn=document.querySelector(".btn-1");
  let isGameWon=false;
  let promises_done=false;
  const event= new Event('done');

  const newSave2=()=>{
    for (let i = 0, p = Promise.resolve(); i < 5; i++) {
      p = p.then(() => Create2().then((coor4)=>{
        if(i==0){
          PlacingWindow(5);
        }
        console.log(coor4);
        player.PlaceShips(2, coor4);
        console.log(player.map.ships[player.map.ships.length-1]);
        if(i==4){
          promises_done=true;
          PlacingWindow(6);
          btn.dispatchEvent(event);
        }
       
      
      }))
           .then(() => console.log(i));
    }
  };
  const newSave3=()=>{
   
      for (let i = 0, p = Promise.resolve(); i < 7; i++) {
        p = p.then(() => Create3().then((coor4)=>{
          if(i==2){
            PlacingWindow(4);
          }
          console.log(coor4);
          player.PlaceShips(3, coor4);
          console.log(player.map.ships[player.map.ships.length-1]);
          if(i==6){
            PlacingWindow(5);
            newSave2();
         
            return Promise.resolve();
          }
     
        
        }))
             .then(() => console.log(i));
      }
      

    if(promises_done==true){
      return Promise.resolve()
    }
 
  }

  const Create2=()=>{   
   const Promise2=ClickShips(2);
    return Promise2;         
  
    }
  const Create3=()=>{
    const Promise4=ClickShips(3);
    return Promise4;
  };




  let window=document.querySelector(".window");
   if(window){
    PlacingWindow(1);
   }
   else{
     PlacingWindow(0);
   }
  const Promise1=ClickShips(5);
  Promise1.then((coor1)=>{
    console.log(coor1);
    player.PlaceShips(5, coor1);
    console.log(player.map.ships[0]);
   PlacingWindow(2);
   
   
  });

  Promise1.then(()=>{ 
    
    const Promise2=ClickShips(4);
    Promise2.then((coor2)=>{
      console.log(coor2);
      player.PlaceShips(4, coor2);
      console.log(player.map.ships[player.map.ships.length-1]);
      return Promise.resolve
      //  return Promise.resolve()
    }).then(()=>{
      const Promise3=ClickShips(4);
      Promise3.then((coor3)=>{
        console.log(coor3);
        player.PlaceShips(4, coor3);
        console.log(player.map.ships[player.map.ships.length-1]);
        PlacingWindow(3);
        return Promise.resolve();  //do tąd działa
      }).then(newSave3)

      
    })
    

  });
  // const isGameOver=()=>{
  //   if(player.AllSunk()==true || Computer.gameboard.AllSunk()==true){
  //     return true;
  //   }
  //   else{
  //     return false;
  //   }
  // }
  let game_over=new Event('over');
    const AttackPromises=(x)=>{
         
         
         for (let i = 0, p = Promise.resolve(); i < x; i++) {
          p = p.then(() => AttackComputer().then((coor)=>{

            console.log(coor);
           
            let coor2=DisplayCpuMoves();
            console.log(coor2);
            console.log(Computer.gameboard.AllSunk());
            if(player.AllSunk()==true || Computer.gameboard.AllSunk()==true){
              GameOver();
              btn.dispatchEvent('over');
              x=1;
            }

       
          
          }))
               .then(() => console.log(i));
        }
      
   };
   const controller=new AbortController;
  btn.addEventListener('done',()=>{
    
    PlacingWindow(7);
    Computer.PlaceShipz();
    console.log(Computer.gameboard.map.ships);
    DisplayCpuShips();

    
    const DiferentPromise=AttackComputer();
    DiferentPromise.then((coor)=>{
      console.log(coor);
      
      let coor2=DisplayCpuMoves();
      console.log(coor2);
      
      return Promise.resolve()
      
    }).then(AttackPromises(100));
    btn.addEventListener('over',()=>{
      console.log("confetti");
      GameOver();
      controller.abort();
      //animations here
      
  })

  },{ signal: controller.signal });

  
}

let btn=document.querySelector(".btn-1");
let window=document.querySelector(".window");
if(!window){
  btn.addEventListener('click', ()=>{
    player.ClearGameboard();
    Computer.gameboard.ClearGameboard();
    ClearBoards();
    GameLoop();
   
 
  });
 
}  

export {player};