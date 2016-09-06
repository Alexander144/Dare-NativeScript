class item{

   name: string;
   id: number;
    
    constructor(name:string){
       this.name = name;
       this.id = new Date().getTime();
    }
} 

export default item;