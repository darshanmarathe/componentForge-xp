export namespace DateUtils{

    export const addDays = function (input:Date , num:number) {
        var value = input.valueOf();
        value += 86400000 * num;
        return new Date(value);
    }
    
    export const addSeconds = function (input:Date ,num:number) {
        var value = input.valueOf();
        value += 1000 * num;
        return new Date(value);
    }
    
    export const addMinutes = function (input:Date ,num:number) {
        var value = input.valueOf();
        value += 60000 * num;
        return new Date(value);
    }
    
    export const addHours = function (input:Date ,num:number) {
        var value = input.valueOf();
        value += 3600000 * num;
        return new Date(value);
    }

    export const ytd = function(){
        let date =`01 Jan ${new Date().getFullYear().toString()}`
        return new Date(date);
    }
    
    // export const addMonths = function (input:Date ,num:number) {
    //     var value = new Date(input.valueOf());
    
    //     var mo = input.getMonth();
    //     var yr = input.getYear();
    
    //     mo = (mo + num) % 12;
    //     if (0 > mo) {
    //         yr += (input.getMonth() + num - mo - 12) / 12;
    //         mo += 12;
    //     }
    //     else
    //         yr += ((input.getMonth() + num - mo) / 12);
    
    //     value.setMonth(mo);
    //     value.setYear(yr);
    //     return value;
    // }
}