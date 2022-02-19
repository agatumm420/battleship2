import { last } from "lodash";
import GameboardFactory from "./gameboard.js"
import { CheckifShipWasSunk } from "./cpu-display.js";
import { player } from ".";

 const PlayerFactory=()=>{
 
 let turn=false;
 const gameboard= GameboardFactory();
 return Object.assign({},
    {player:{                
        turn
    }}, gameboard
    );
};
 

const Computer=(()=>{
    const cpu=PlayerFactory("computer");
    let moves_made=[];
    let kill_pending=false;
    let targetGrid=new Array(10);
    const MakeGrid=()=>{
        for(let i=0; i<10;i++){
            targetGrid[i]=new Array(10);
        }

      for(let i=0; i<targetGrid.length;i++){
          for(let j=0; j<targetGrid[i].length; j++){
              if(i%2==0){ //parz
                 if(j%2==0){
                    targetGrid[i][j]="b";
                 }
                 else{
                     targetGrid[i][j]="w";
                 }
              }
              else{ //nieparz
                 if(j%2==0){
                    targetGrid[i][j]="b";
                 }
                 else{
                     targetGrid[i][j]="w";
                 } 
              }
          }
      }
    };
    const CheckWithGrid=(x,y)=>{
       
       let found=targetGrid[y][x];
       if(found=="b"){
           return true;
       }
       else{
           return false;
       }
    };
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    const CheckIfMoveWasMade=(choices)=>{
        let which_one=getRandomInt(Number(choices.length));
        let chosen=choices[which_one];
        while(moves_made.some((e)=>{ e.x==chosen.x&& e.y==chosen.y})){
            which_one=getRandomInt(Number(choices.length));
            chosen=choices[which_one];
        }
        return chosen;
    }

    const GenerateRandomMoves=()=>{

     let x= Number(getRandomInt(9)+1);
     let y=Number(getRandomInt(9)+1);
     let hitSomething=false;
     let SunkedSomething=false;
     let isStuck=false;
     return {x,y, hitSomething, SunkedSomething, isStuck};
    };
    const GenerateMoves=(x1,y1, hitSomething, SunkedSomething, )=>{
        let x=Number(x1);
        let y=Number(y1);
        let isStuck=false;
        
     return {x,y, hitSomething, SunkedSomething, isStuck};
    };
    const CheckEverything=(options, which_one, )=>{
         
    };
    const isStuck=(x,y)=>{
        let result=moves_made.find(move=>move.x==x && move.y==y);
        let count=0;
        let options_num=0;
        if(result.x!=10){
            options_num++;
          let found= moves_made.find(move=>move.x==result.x+1 && move.y==result.y);
          if(found==undefined){
              return false;
          }
          else{
              count++;
              
          }
        }       
        
        if(result.x!=1){
            options_num++;
            let found= moves_made.find(move=>move.x==result.x-1 && move.y==result.y);
            if(found==undefined){
                return false;
            }
            else{
                count++;
                
            }
        }
        if(result.y!=10){
            options_num++;
            let found= moves_made.find(move=>move.x==result.x && move.y==result.y+1);
            if(found==undefined){
                return false;
            }
            else{
                count++;
                
            }
        }
      
        if(result.y!=1){
            options_num++;
            let found= moves_made.find(move=>move.x==result.x && move.y==result.y-1);
            if(found==undefined){
                return false;
            }
            else{
                count++;
                
            }
        }
        if(count==options_num){
            moves_made.forEach((move)=>{
                if(move.x==x&&move.y==y){
                    move.isStuck=true;
                }
            })
            return true;
        }
        
    }
    const WhenHit=()=>{
        let prev_x=moves_made[moves_made.length-1].x;
        let prev_y=moves_made[moves_made.length-1].y;
        let choices=[];
         let count=0;
        if(prev_x!=10){
            let move1=GenerateMoves(prev_x+1, prev_y,false,false );
            choices.push(move1);
            count++;
        }       
        
        if(prev_x!=1){
            let move2=GenerateMoves(prev_x-1, prev_y, false,false);
            choices.push(move2);
            count++;
        }
        if(prev_y!=10){
            let move3=GenerateMoves(prev_x, prev_y+1, false,false);
            choices.push(move3);
            count++;
        }
      
        if(prev_y!=1){
            let move4=GenerateMoves(prev_x, prev_y-1, false, false);
            choices.push(move4);
            count++; 
        }
        
        
        let which_one=getRandomInt(count);
        let chosen=choices[which_one];
        let attempts=0;
        while(moves_made.some(e=> e.x==chosen.x && e.y==chosen.y)){
            isStuck(prev_x, prev_y);

            
            which_one++;//czemu nie szuka więcej opcji
            if(which_one>=count){
                which_one=0;
            }
            chosen=choices[which_one];
            attempts++;
            if(attempts>4){
                chosen=MakeARandomMove();
            }
        }

     
      return chosen;

    };
    // const KillTargetControll=()=>{
    //     let options=[];
    //     let count=0;
    //     let first_prev_x=Number(moves_made[moves_made.length-1].x);
    //     let first_prev_y=Number(moves_made[moves_made.length-1].y);
    //     let second_prev_x=Number(moves_made[moves_made.length-2].x);
    //     let second_prev_y=Number(moves_made[moves_made.length-2].y);
    //     const ShootAlongY=()=>{
 
    //         if(second_prev_x<10){
    //             let option1=GenerateMoves(second_prev_x+1,second_prev_y , false, false);
    //             options.push(option1);
    //               count++;
    //         }
    //           if(second_prev_x>1){
    //             let option2=GenerateMoves(second_prev_x-1, second_prev_y, false, false);
    //             options.push(option2);
    //                 count++;
    //           }
    //           if(first_prev_x<10){
    //             let option3=GenerateMoves(first_prev_x+1,first_prev_y, false, false);
    //             options.push(option3);
    //               count++;
    //           }
    //           if(first_prev_x>1){
    //             let option4=GenerateMoves(first_prev_x-1, first_prev_y, false, false);
    //             options.push(option4);
    //                 count++;
    //           }
    //           let num=Number(getRandomInt(count));
    //           let chosen=options[num];
    //           let attempts=0;
    //           while(moves_made.some(e=> e.x==chosen.x&& e.y==chosen.y)){
    //             num=Number(getRandomInt(count));
    //             chosen=options[num];
    //             attempts++;
    //             if(attempts>=options.length){
    //                 console.log("I'M TRYING TO FIND A SPOT");
    //                 chosen=WhenHit();
    //                 console.log("THIS IS WHAT I FOUND "+chosen.x+" <-x" );
    //                 return chosen;
    //               }
    //           }
    //         return chosen; 
    //     }
    //     const ShootAlongX=()=>{
    //         if(second_prev_y<10){
    //             let option1=GenerateMoves(second_prev_x,second_prev_y+1 , false, false);
    //             options.push(option1);
    //             count++;
    //         }
    //         if(second_prev_y>1){
    //             let option2=GenerateMoves(second_prev_x, second_prev_y-1, false, false);
    //             options.push(option2);
    //             count++;
    //         }
    //         if(first_prev_y<10){
    //             let option3=GenerateMoves(first_prev_x,first_prev_y+1, false, false);
    //             options.push(option3);
    //                 count++;
    //         }

    //         if(first_prev_y>1){
    //             let option4=GenerateMoves(first_prev_x, first_prev_y-1, false, false);
    //             options.push(option4);
    //             count++;
    //         }
    //         let number=getRandomInt(count) ;
    //         let num=number-1;
    //         let chosen=options[num];
    //         let attempts=0;
            
    //         while((moves_made.some((e)=>{ e.x==chosen.x && e.y==chosen.y}))==true){
    //           num=getRandomInt(count);
    //           attempts++;
    //           if(attempts>=options.length){
    //               console.log("I'M TRYING TO FIND A SPOT");
    //               chosen=WhenHit();
    //               console.log("THIS IS WHAT I FOUND "+chosen.y+ "<-y");
    //               return chosen;
    //           }
              
              
    //         }
    //       return chosen; 
            
    //     }
    //   let chosen={};
    //   //shoot along the same x or y
    //   let optionsfinish=[];
    //   const FinishEmX=()=>{
    //     let option1=GenerateMoves(last_one.x, last_one.y+1,false, false);
    //     optionsfinish.push(option1);
    //     let option2=GenerateMoves(last_one.x, last_one.y-1, false, false);
    //     optionsfinish.push(option2);
    //     let number=getRandomInt(count) ;
    //     let num=number-1;
    //     let chosen=options[num];
    //     while((moves_made.some((e)=>{ e.x==chosen.x && e.y==chosen.y}))==true){
    //         let number=getRandomInt(count) ;
    //         let num=number-1;
    //         let chosen=options[num];
    //     }
    //     return chosen;

    //   }
    //   const FinishEmY=()=>{

    //   }
    //   const Controller=()=>{
    //       if(moves_made[moves_made.length-1].x==10){
              
    //         }
    //     }
    //         if(prefered_axis=="none"){
    //             if(second_prev_y==first_prev_y){
    //                 chosen=ShootAlongY();
    //             }
    //             else{
    //                 chosen=ShootAlongX();
    //             }
    //         }
    //         if(prefered_axis=="x"){
    //             chosen=ShootAlongX();
    //         }
    //         if(prefered_axis=="y"){
    //             chosen=ShootAlongY();
    //         }

    //     return chosen;
        
    // }
    const AimforCenter=()=>{
        let x=[4,5,6,7,8];
        let y=[4,5,6,7,8];
        let z=getRandomInt(4);
        let w=getRandomInt(4);
        let chosen=GenerateMoves( x[z], y[w], false, false);
        while((moves_made.some((e)=>{ e.x==chosen.x && e.y==chosen.y}))==true){
            let z=getRandomInt(4);
            let w=getRandomInt(4);
            chosen=GenerateMoves( x[z], y[w], false, false);
        }
        return chosen;
    };
    const MakeARandomMove=()=>{
        let x=getRandomInt(10);
        let y=getRandomInt(10);
        let chosen=GenerateMoves( x, y, false, false);
        while(moves_made.some(e=> e.x==chosen.x && e.y==chosen.y)){
             x=getRandomInt(10);
             y=getRandomInt(10);
            chosen=GenerateMoves( x, y, false, false);
        }
        return chosen; 
    }
    const TargetKill=()=>{
        let dontfit=false;
        let options=[];
        let count=0;
        let first_prev_x=Number(moves_made[moves_made.length-1].x);
        let first_prev_y=Number(moves_made[moves_made.length-1].y);
        let second_prev_x=Number(moves_made[moves_made.length-2].x);
        let second_prev_y=Number(moves_made[moves_made.length-2].y);
        if(second_prev_y==first_prev_y){
              //shoot along y axis
            if(second_prev_x<10){
                let option1=GenerateMoves(second_prev_x+1,second_prev_y , false, false);
                options.push(option1);
                  count++;
            }
              if(second_prev_x>1){
                let option2=GenerateMoves(second_prev_x-1, second_prev_y, false, false);
                options.push(option2);
                    count++;
              }
              if(first_prev_x<10){
                let option3=GenerateMoves(first_prev_x+1,first_prev_y, false, false);
                options.push(option3);
                  count++;
              }
              if(first_prev_x>1){
                let option4=GenerateMoves(first_prev_x-1, first_prev_y, false, false);
                options.push(option4);
                    count++;
              }
              let num=Number(getRandomInt(count));
              let chosen=options[num];
              let attempts=0;
              let special_attempts=0;
              while(moves_made.some(e=> e.x==chosen.x&& e.y==chosen.y)){
                num++;
                if(num>=count){
                    num=0;
                }
                chosen=options[num];
                attempts++;
                
                if(attempts>=options.length){
                    console.log("I'M TRYING TO FIND A SPOT");
                    chosen=WhenHit();
                    special_attempts++;
                    console.log("THIS IS WHAT I FOUND "+chosen.x+" <-x" );
                    if(special_attempts>=4){
                        dontfit=true;
                        break;
                    }
                   
                  }
              }
              
            return chosen; 
            };

        if(second_prev_x==first_prev_x){
            if(second_prev_y<10){
                let option1=GenerateMoves(second_prev_x,second_prev_y+1 , false, false);
                options.push(option1);
                count++;
            }
            if(second_prev_y>1){
                let option2=GenerateMoves(second_prev_x, second_prev_y-1, false, false);
                options.push(option2);
                count++;
            }
            if(first_prev_y<10){
                let option3=GenerateMoves(first_prev_x,first_prev_y+1, false, false);
                options.push(option3);
                    count++;
            }

            if(first_prev_y>1){
                let option4=GenerateMoves(first_prev_x, first_prev_y-1, false, false);
                options.push(option4);
                count++;
            }
            let number=getRandomInt(count) ;
           
            let chosen=options[number];
            let attempts=0;
            let special_attempts=0;
            while(moves_made.some(e=> e.x==chosen.x && e.y==chosen.y)){
                number++;
                if(number>=count){
                    number=0;
                }
                chosen=options[number];
                attempts++;
              
              if(attempts>=options.length){
                  
                  console.log("I'M TRYING TO FIND A SPOT");
                  chosen=WhenHit();
                  special_attempts++;
                  console.log("THIS IS WHAT I FOUND "+chosen.y+ "<-y");
                  if(special_attempts>=4){
                      dontfit=true;
                      break;
                  }
                 
              }
        
              
            }
            if(dontfit==true){
               let chosen=MakeARandomMove();
               return chosen;
            }
          return chosen; 
            
      }
      else{
         let chosen=WhenHit();
          return chosen;
      }
    };
    const KillThePending=(result)=>{
      let a_move=GenerateMoves(Number(result.x), Number(result.y), true, false);
       moves_made.push(a_move);
       let the_move=WhenHit();
       moves_made.pop();
       return the_move;
    }
    const CheckifKillisPending=()=>{
        //check the last hit
        // const isGood=(move)=>{
        //   return move
        // }
        let result=moves_made.find(move=>( move.hitSomething==true&&CheckifShipWasSunk(move.x, move.y)==false &&move.isStuck==false));
         
         if(result==undefined){
             return false;
         }
         else{
                   

             return result;
         }
         
    
     
    }

    const ClearMoves=()=>{
       for(let move in moves_made){
           moves_made.pop();
       }
    };
    const CheckAndMarkAsSunk=()=>{
        if(CheckifShipWasSunk(moves_made[moves_made.length-1].x, moves_made[moves_made.length-1].y)==true){
            moves_made[moves_made.length-1].SunkedSomething=true;
        }
    }
    const MakeMoves=()=>{
        let the_move={};
        

        if(moves_made.length==0){
            the_move=AimforCenter();
            console.log("I'm AIMING FOR CENTER");
            moves_made.push(the_move);
            
            return the_move;
        }
    
        else{
            CheckAndMarkAsSunk();
            if(moves_made[moves_made.length-1].SunkedSomething==true){
                let a_move=MakeARandomMove();
                while(moves_made.some(e=> e.x==a_move.x && e.y==a_move.y)){
                    a_move=MakeARandomMove(); 
                }
                moves_made.push(a_move);
                return a_move;
            }
           
            if(moves_made[moves_made.length-1].hitSomething==true &&moves_made[moves_made.length-1].SunkedSomething==false){
                if(moves_made.length>=2&&moves_made[moves_made.length-2].hitSomething==true&&moves_made[moves_made.length-1].hitSomething==true){
                    console.log("I'VE IDENTIFIED SITIUATION CORRECTLY");
                    the_move=TargetKill();
                    // player.ReciveAttack(the_move.x, the_move.y);
                    console.log("I WAS HERE TARGET KILL");
                    console.log(the_move);
                    moves_made.push(the_move);
                    return the_move;
                }
                else{
                    the_move=WhenHit();
                    console.log("I'M HITTING THE SAME SHIP AGAIN");
               
                    moves_made.push(the_move);
                    // player.ReciveAttack(the_move.x, the_move.y);
                    return the_move;
                }          
               
            }
            else{
                //let result=CheckifKillisPending();
                // console.log(" THERE's RESULT "+result);
                // if(result!=false){
                //     console.log("There is a KILL PENDING");
                //     console.log(result);
                //     return result;
                // }
            //    else{
                let result=CheckifKillisPending();
                console.log("I'M CHECKING AND THIS IS THE RESULT ");
                console.log(result);
                if(result!= false){
                    the_move=KillThePending(result);
                    console.log(the_move);
                    moves_made.push(the_move);
                    return the_move;
                }
                else{
                    MakeGrid();
                    console.log("i'm walking here");
                    let a_move=GenerateRandomMoves();
                    console.log("I'M MAKING A RANDOM MOVE");

                    let vibe_check=CheckWithGrid(Number(a_move.x), Number(a_move.y));
                    let attempts=0;
                    while(vibe_check==false ||moves_made.some(e=> e.x==a_move.x && e.y==a_move.y)){
                        attempts++;
                        a_move=GenerateRandomMoves();
                        vibe_check=CheckWithGrid(Number(a_move.x), Number(a_move.y));
                        if(attempts>4){
                            vibe_check=true;
                        }
                    }
                    moves_made.push(a_move);
                    // player.ReciveAttack(the_move.x, the_move.y);
                    return a_move;
                }
                }
                
               
            //}
        }      

        
        
 
        
    };
    let cpu_grid=[];


    const CreateCoor=(len)=>{
        let choice=0;
        let coor=[];
            choice=Number(getRandomInt(2));
      const GeneratePosition=()=>{
                const x=getRandomInt(9)+1;
                const y=getRandomInt(9)+1;
                 const position=GenerateMoves(x,y,false, false);
                 return position;
        }
 
        const CreateFirst=()=>{
            let pos=GeneratePosition();
            while(cpu_grid.some(e=> e.x==pos.x&& e.y==pos.y)){
                 pos=GeneratePosition();
            }
            cpu_grid.push(pos);
            coor.push(pos.x);
            coor.push(pos.y);
        }
        const CheckifExists=(x,y)=>{
            let found=cpu_grid.some(el=> el.x==x&& el.y==y);
            if(!found){ 
                return false;
            }
            else{
                return true;
            }
        }

        const ShootAlongX=(i)=>{

            if(i==1){
                let last_one=cpu_grid[cpu_grid.length-1];
                let options=[];
                let attempts_count=0;
                if(last_one.y<10){
                    let option1=GenerateMoves(last_one.x,last_one.y+1, false,false);
                    options.push(option1);
                }
              
               if(last_one.y>1){
                let option2=GenerateMoves(last_one.x, last_one.y-1, false, false);
                options.push(option2);
               }

               let choicer=getRandomInt(options.length)
               let chosen=options[choicer];                          /// co jeśli nigdy nie trafi

                 while(CheckifExists(chosen.x, chosen.y)==true){
                    let choicer=getRandomInt(options.length);
                    chosen=options[choicer];
                    
                    attempts_count++;   
                    if(attempts_count==options.length){
                        return false;
                        
                      } 
                }
          
               cpu_grid.push(chosen);
               coor.push(chosen.x);
               coor.push(chosen.y);
            
            }
            if(i>1){
                const last_one=cpu_grid[cpu_grid.length-1];
                const second_last=cpu_grid[cpu_grid.length-2];
                let options=[];
                let attempts_count=0;
                if(last_one.y<10){
                    let option1=GenerateMoves(last_one.x,last_one.y+1, false,false);
                    options.push(option1);
                }
                if(last_one.y>1){
                    let option2=GenerateMoves(last_one.x, last_one.y-1, false, false);
                    options.push(option2);
                }
                if(second_last.y<10){
                    let option3=GenerateMoves(second_last.x,second_last.y+1, false,false);
                    options.push(option3);
                }
                if(second_last.y>1){
                    let option4=GenerateMoves(second_last.x, second_last.y-1, false, false);
                    options.push(option4);
                }
                let choicer=getRandomInt(options.length);
                let chosen=options[choicer];                          /// co jeśli nigdy nie trafi

                while(CheckifExists(chosen.x, chosen.y)==true){
                     choicer=getRandomInt(options.length);
                     chosen=options[choicer];
                     attempts_count++;  
                     if(attempts_count==options.length){
                       return false;
                    }  
                }
                cpu_grid.push(chosen);
                coor.push(chosen.x);
                coor.push(chosen.y);
                return true;


            }
            

            
        
        }
        const ShootAlongY=(i)=>{
            if(i==1){
                let last_one=cpu_grid[cpu_grid.length-1];
                let options=[];
                let attempts_count=0;
                let option1=GenerateMoves(last_one.x+1,last_one.y, false,false);
                options.push(option1);
                if(last_one.x>1){
                 let option2=GenerateMoves(last_one.x-1, last_one.y, false, false);
                 options.push(option2);
                }
                let choicer=getRandomInt(options.length)
                let chosen=options[choicer];
                while(CheckifExists(chosen.x, chosen.y)==true){
                    let choicer=getRandomInt(options.length);
                    chosen=options[choicer];
                    
                    attempts_count++;   
                    if(attempts_count==options.length){
                        return false;
                        
                      } 
                }
                cpu_grid.push(chosen);
                coor.push(chosen.x);
                coor.push(chosen.y);  
                return true;
            }
            if(i>1){
                const last_one=cpu_grid[cpu_grid.length-1];
                const second_last=cpu_grid[cpu_grid.length-2];
                let options=[];
                let attempts_count=0;
                if(last_one.x<10){
                    let option1=GenerateMoves(last_one.x+1,last_one.y, false,false);
                    options.push(option1);
                }
                if(last_one.x>1){
                    let option2=GenerateMoves(last_one.x-1, last_one.y, false, false);
                    options.push(option2);
                }
                if(second_last.x<10){
                    let option3=GenerateMoves(second_last.x+1,last_one.y, false,false);
                    options.push(option3);
                }
                if(second_last.x>1){
                    let option4=GenerateMoves(second_last.x-1, second_last.y, false, false);
                    options.push(option4);
                }
                let choicer=getRandomInt(options.length);
                let chosen=options[choicer];                          /// co jeśli nigdy nie trafi

                while(CheckifExists(chosen.x, chosen.y)==true){
                     choicer=getRandomInt(options.length);
                     chosen=options[choicer];
                     attempts_count++;  
                     if(attempts_count==options.length){
                        //doesn't fit here and it never will
                       return false;
                    }  
                }
                cpu_grid.push(chosen);
                coor.push(chosen.x);
                coor.push(chosen.y);
                return true;


            }
            
        
        }
        const AxisController=(i)=>{
               if(choice%2==0){
                   let result=ShootAlongX(i);
                    if(result==false){
                        let result2=ShootAlongY(i);
                        if(result2==false){
                            ShootAlongX(i);
                        }
                    }
               }
               else{
                   let result=ShootAlongY(i);
                   if(result==false){
                       let result2=ShootAlongX(i);
                       if(result2==false){
                           ShootAlongX(i)
                       }
                   }
               }
        }
       
        for(let i=0;i<len;i++){
            if(i==0){
                CreateFirst();
            }
             AxisController(i);

        }
       
        return coor;
    }
    const gameboard=GameboardFactory();
    const PlaceShipz=()=>{
        
        let coor1=CreateCoor(5);
        console.log(coor1);
        gameboard.PlaceShips(5, coor1);
        let coor2=CreateCoor(4);
        console.log(coor2);
        gameboard.PlaceShips(4, coor2);
        let coor3=CreateCoor(4);
        console.log(coor3);
        gameboard.PlaceShips(4, coor3);
        for(let i=0;i<7; i++){
            let coor4=CreateCoor(3);
            console.log(coor4);
            gameboard.PlaceShips(3, coor4);
            
        }
        for(let i=0;i<5; i++){
            let coor=CreateCoor(2);
            console.log(coor);
            gameboard.PlaceShips(2, coor);
            
        }


    //     const Create2=()=>{
    //         for (let i = 0, p = Promise.resolve(); i < 5; i++) {
    //             p = p.then(() => GenerateCoor(2).then((coor)=>{
    //                 console.log(coor);
    //                 gameboard.PlaceShips(2,coor);   

    
             
                
    //             }))
    //                  .then(() => console.log(i));
    //           }
    //     }
    //     const Create3=()=>{
    //         for (let i = 0, p = Promise.resolve(); i < 7; i++) {
    //             p = p.then(() => GenerateCoor(3).then((coor)=>{
    //                 console.log(coor);
    //                 gameboard.PlaceShips(3,coor);   
    //                 if(i==7){
    //                     Create2();
    //                 }
    
             
                
    //             }))
    //                  .then(() => console.log(i));
    //           }
    //     }

      
    //   GenerateCoor(5).then((coor1)=>{
    //     console.log(coor1);
    //     gameboard.PlaceShips(5, coor1);
    //     return Promise.resolve()
    //   }).then(GenerateCoor(4)).then((coor2)=>{
    //     console.log(coor2);
        // gameboard.PlaceShips(4, coor2);
        // return Promise.resolve()
     //})//.then(GenerateCoor(4)).then((coor3)=>{
    //     console.log(coor3);
    //     gameboard.PlaceShips(4, coor3);
    //     return Promise.resolve();
    //   }).then(Create3)



    };
  return{ cpu_grid, gameboard, moves_made, MakeMoves, GenerateMoves, ClearMoves, PlaceShipz, };
})();
export {PlayerFactory, Computer}