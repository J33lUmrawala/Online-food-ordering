const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    SIZE:   Symbol("size"),
    TOPPINGS:   Symbol("toppings"),
    RICEBOWL: Symbol("ricebowl"),
    RICEBOWL_SIZE: Symbol("ricebowl_size"),
    FALAFAL: Symbol("falafal"),
    FALAFAL_SIZE: Symbol("Falafal_size"),
    ICECREAM: Symbol("icecream"),
    ICECREAM_SIZE: Symbol("icecream_vanilla"),
    DRINKS:  Symbol("drinks")


});

module.exports = class ShwarmaOrder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.WELCOMING;
        this.sSize = "";
        this.sToppings = "";
        this.sDrinks = "";
        this.sItem = "shawarama";
        this.sItem1 = "Ricebowl";
        this.sItem2 = "Falafal";
        this.sItem3 = "Icecream"
        this.sItem1_where = "";
        this.sItem2_where = "";
        this.sItem3_where = "";
        this.sItem1_size = "";
        this.sItem2_size = "";
        this.sItem3_size = "";

        this.sCost = 0;
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.SIZE;
                aReturn.push("Welcome to Richard's Shawarma.");
                aReturn.push("What size would you like?");
                break;
            case OrderState.SIZE:
                this.stateCur = OrderState.TOPPINGS
                this.sSize = sInput;
                if (sInput.toLowerCase()=== "small")
                {                     this.sCost += 2;             
                }            
                 if (sInput.toLowerCase() === "medium")   
                {                     this.sCost += 4;          
                 }            
                 if (sInput.toLowerCase() === "large")          
                {                     
                this.sCost += 6;         
                }           
                aReturn.push("What toppings would you like?");
                break;
            case OrderState.TOPPINGS:
                this.stateCur = OrderState.RICEBOWL
                this.sToppings = sInput;
                this.scost += 2;
                aReturn.push("Would you like Ricebowl with that?");
                break;

        
            case OrderState.RICEBOWL:
                if(sInput.toLowerCase() != "no"){
                    this.stateCur = OrderState.RICEBOWL_SIZE
                    this.sItem1_where = sInput;
                    aReturn.push("What size would you like for Ricebowl?");
                    break;

                }
                
                this.stateCur = OrderState.FALAFAL;  
                aReturn.push("Would you also like falafal with it?");
                  
                break;
            case OrderState.RICEBOWL_SIZE:
                
                if (sInput.toLowerCase() === "small")
                {
                    this.stateCur = OrderState.FALAFAL
                    this.sItem1_size = sInput;
                    this.sCost += 2;
                }
                if (sInput.toLowerCase() === "medium")
                {
                    this.stateCur = OrderState.FALAFAL
                    this.sItem1_size = sInput;
                    this.sCost += 4;
                }
                if (sInput.toLowerCase() === "large")
                {
                    this.stateCur = OrderState.FALAFAL
                    this.sItem1_size = sInput;
                    this.sCost += 6;
                }
                this.stateCur = OrderState.FALAFAL
                aReturn.push("Would you also like falafal with it?");
                break;


            case OrderState.FALAFAL:
                    if(sInput.toLowerCase() != "no"){
                    this.stateCur = OrderState.FALAFAL_SIZE
                    this.sItem2_where = sInput;
                    
                    aReturn.push("What size of falafal?");
                    break;

                }
                this.stateCur = OrderState.ICECREAM    
                aReturn.push("Would you also like ice cream along with your order?");
                break;

            case OrderState.FALAFAL_SIZE:
                
                this.sSize = sInput;
                if (sInput.toLowerCase() === "small")
                {
                    this.stateCur = OrderState.ICECREAM
                    this.sItem2_size = sInput;
                    this.sCost += 2;
                }
                if (sInput.toLowerCase() === "medium")
                {
                    this.stateCur = OrderState.ICECREAM
                    this.sItem2_size = sInput;
                    this.sCost += 4;
                }
                if (sInput.toLowerCase() === "large")
                {
                    this.stateCur = OrderState.ICECREAM
                    this.sItem2_size = sInput;
                    this.sCost += 6;
                }
                this.stateCur = OrderState.ICECREAM
                aReturn.push("Would you also like Icecream along with your order?");
            break;
            case OrderState.ICECREAM:
                    if(sInput.toLowerCase() != "no"){
                        this.stateCur = OrderState.DRINKS
                        this.sItem3_where = sInput;
                        this.sCost += 2;
                    aReturn.push("Would you drinks with it?");
                    break;
                    }
                    
                    this.stateCur = OrderState.DRINKS     
                    aReturn.push("Would you drinks with it?");   
                    break;            
            case OrderState.DRINKS:
                this.isDone(true);
                if(sInput.toLowerCase() != "no"){
                    this.sDrinks = sInput;
                }
                aReturn.push("Thank-you for your order of");
                aReturn.push(`${this.sSize} ${this.sItem} with ${this.sToppings}`);
                if(this.sDrinks){
                    aReturn.push(`with drinks`);
                }
                if(this.sItem1_where){
                    aReturn.push(`${this.sItem1} size ${this.sItem1_size}`);
                }
                if(this.sItem2_where){
                    aReturn.push(`${this.sItem2} size ${this.sItem2_size}`);
                }
                if(this.sItem3_where){
                    aReturn.push(this.sItem3);
                }
                aReturn.push(`The total cost of your order is ${this.sCost}$`);
                
                let d = new Date(); 
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                break;
        }
        return aReturn;
    }
}


               