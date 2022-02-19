export default function ShipFactory (length, coordinates, ){
   
    let positions=[];
       const methods={
           hit(pos) {
               if ( pos < this.info.length) {
                 this.info.positions[pos]['isHit'] = true;//spróbuj zmienić cały obiekt

               }
               return this;
             },
            isSunk() {
               return this.info.positions.every((square) => square.isHit == true);//array of objects?
             },
             FindPosition(x, y){
               //return true if this condition is passed
             
               let proper_x=Number(x);
               let proper_y=Number(y);
               let result=  this.info.positions.find(pos=>pos.x==proper_x&& pos.y==proper_y);
               if(result == undefined){
                 return false;
               }
               else{
                 return true;
               }
             }
       };
   
   //    const hit=(position)=>{
   //       position.isHit=true;
   //     }
       // function hit(pos){
       //     this.positions[pos].isHit=true;
      // }
       const PositionFactory=(x,y)=>{
            let isHit=false;
           return {x, y, isHit};
   
       };
      // const CoorsToPositions=()=>{
      //   for(let i=0;i<coordinates.length; i++){

      //   }
      // }
       for(let i=0; i<length*2; i++){
         let position=PositionFactory(coordinates[i], coordinates[i+1]);
         i++;
    
   
         positions.push(position);
   
       };

      return Object.assign(
       {},
       {info:{
           length,
        positions}
       }
      ,
       methods
     );
   };
