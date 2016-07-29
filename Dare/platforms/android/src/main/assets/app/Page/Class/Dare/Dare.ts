class Dare{
    Id: string;
    OutputDare: string;
    From: string;
    Date: Date;
    
    constructor(Id:string, OutputDare:string, From:string){
       this.Id = Id;
       this.OutputDare = OutputDare;
       this.From = From;
    }
    SetDate(Date:Date){
        this.Date = Date;
    }
} 

export default Dare;