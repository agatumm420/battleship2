
import {  Computer } from "../js/player";
const newPlayer=PlayerFactory()
test('returns a player oject', ()=>{
 expect(newPlayer.player).toEqual({ turn:false, });
});
test('cpu can make a first move', ()=>{
    //Computer.moves_made=[];
    Computer.MakeMoves();
 expect(Computer.moves_made[0].x).toBeGreaterThanOrEqual(4);
 
});
// test('is moves made empty', ()=>{
//     expect(Computer.moves_made[0]).toEqual({x:2,y:1, hitSomething:true, SunkedSomething:false});
// })
test('cpu follows up when it hit something', ()=>{
    Computer.ClearMoves();
    let move=Computer.GenerateMoves(2,1,true,false);
    Computer.moves_made.push(move);
    let mover=Computer.MakeMoves();
    let possible_moves=[];
    possible_moves.push(Computer.GenerateMoves(2,2,false,false));
    possible_moves.push(Computer.GenerateMoves(1,1, false,false));
    possible_moves.push(Computer.GenerateMoves(3,1, false,false));
    
    let verdict=possible_moves.some((e)=>e.x==mover.x || e.y==mover.y);
    expect(verdict).toEqual(true);
});

test( 'moves made works as intended', ()=>{
 Computer.ClearMoves();
 let move1=Computer.GenerateMoves(3,2,true, false);
  Computer.moves_made.push(move1);
  let move2=Computer.GenerateMoves(3,1,true,false);
  Computer.moves_made.push(move2);
  expect(Computer.moves_made[Computer.moves_made.length-1]).toEqual({x:3,y:1, hitSomething: true, SunkedSomething:false});
 
});
// test('options for target kill are not empty', ()=>{

// })
test('cpu targets to kill', ()=>{
    
  let move1=Computer.GenerateMoves(3,2,true, false);
  Computer.moves_made.push(move1);
  let move2=Computer.GenerateMoves(3,1,true,false);
  Computer.moves_made.push(move2);
  
  let mover=Computer.MakeMoves();
  expect(mover).toEqual({x:3,y:3, hitSomething:false, SunkedSomething:false})
});
test('cpu places its moves', ()=>{
 Computer.PlaceShipz();
 expect(Computer.gameboard.map.ships.length).toEqual(15);
});

