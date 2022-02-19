import  ShipFactory  from "../js/ships";
const NewShip=ShipFactory(2,[2,1,2,2])
test("returns the right object no methods", ()=>{
    expect(NewShip.info).toEqual({length:2, positions:[{x:2, y:1, isHit:false, }, {x:2, y:2, isHit:false}]});
 });
 test("hits at the right positions", ()=>{
    NewShip.hit(0);
    expect(NewShip.info.positions[0]).toEqual({x:2, y:1, isHit:true});

 });
test(" sunk works with no sinking", ()=>{
    expect(NewShip.isSunk()).toEqual(false);
});
test(" hit works with multiple hits", ()=>{
    NewShip.hit(0);
    NewShip.hit(1);

   expect(NewShip.info.positions).toEqual([{x:2, y:1, isHit:true},{x:2, y:2, isHit:true}])
});

test("Sunk works when sunk", ()=>{
   NewShip.hit(0);
   NewShip.hit(1);
   expect(NewShip.isSunk()).toEqual(true);
});
test("FindShips returns false", ()=>{
   let result=NewShip.FindPosition(3, 1);
   expect(result).toEqual(false);
})
test("FindShips returns true", ()=>{
   let result=NewShip.FindPosition(2, 1);
   expect(result).toEqual(true);
})