import { TestWatcher } from "@jest/core";
import GameboardFactory from "../js/gameboard";
const Game=GameboardFactory()
test(' returns a gameboard object', ()=>{
   expect(Game.map).toEqual({ ships:[],missed:[] });
});
test('place ship works', ()=>{
    Game.PlaceShips(2,[2,1,2,2])
   expect(Game.map.ships[0].info).toEqual({length:2, positions:[{x:2,y:1,isHit:false},{x:2,y:2,isHit:false}]});
});
test('recive attack works if missed', ()=>{
    Game.PlaceShips(2,[2,1,2,2])
    Game.ReciveAttack(1,1)
   expect(Game.map.missed[0]).toEqual({x:1,y:1});
});
test('recive attack works if hit', ()=>{
    Game.PlaceShips(2,[2,1,2,2]);
    Game.ReciveAttack(2,1);
    expect(Game.map.ships[0].info).toEqual({length:2, positions:[{x:2,y:1,isHit:true},{x:2,y:2,isHit:false}]});
});
test('all sinked works if not sinked', ()=>{
  expect(Game.AllSunk()).toEqual(false);
});
test("clear gameboard works", ()=>{
    Game.PlaceShips(2,[2,1,2,2]);
    Game.ClearGameboard();

    expect(Game.map).toEqual({ ships:[],missed:[] });
});
 test('all sinked works if all sinked', ()=>{
    Game.ClearGameboard();
    Game.PlaceShips(2,[2,1,2,2]);
    Game.ReciveAttack(2,1);
    Game.ReciveAttack(2,2);
  expect(Game.AllSunk()).toEqual(true);
});