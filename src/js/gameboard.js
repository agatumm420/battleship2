import  ShipFactory  from "./ships.js"  
export default function GameboardFactory(){
 let ships=[];
 let missed=[];
 const MissedFactory=(x,y)=>{
    return{ x,y};
}
 const methods={
    PlaceShips(length, coor){
        let ship=ShipFactory(length,coor);
        ships.push(ship);
    },
    ReciveAttack(x,y){
        let isSomethingHit=false;
        let ships=this.map.ships;
        for (let ship in ships){
        for( let i=0; i<ships[ship].info.positions.length ; i++){
            if(ships[ship].info.positions[i].x==x && ships[ship].info.positions[i].y==y){
                ships[ship].hit(i);
                isSomethingHit=true;
             }
            
         };  
        };
        if(isSomethingHit==false){
            let single_miss=MissedFactory(x,y);
            missed.push(single_miss);
        };
    },
    AllSunk(){

        let ships= this.map.ships;
        let dead_ships=0;
        for(let ship in ships){
            if(ships[ship].isSunk()==true){
                dead_ships++;
            }
        }
        if(dead_ships==ships.length){
            return true;
        }
        else{
            return false;
        }

    },
    ClearGameboard(){
        while(ships.length > 0) {
            ships.pop();
        };
        while(missed.length > 0) {
            missed.pop();
        };
    },
    


 };


    return Object.assign({},
        {map:{
            ships,
            missed
        }}, methods
        );
};