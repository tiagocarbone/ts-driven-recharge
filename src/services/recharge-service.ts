import { postRechargeRepository, getRechargeRepository } from "../repository/recharge-repository";

export async function postRechargeService(idPhone: string, valorRecarga: number){

    try {
        const result = await  postRechargeRepository(idPhone, valorRecarga)
        return result
    } catch (err) {
        console.log(err)
        throw err;
    }
    
   
}


export async function getRechargeService(number: string){
    
    try {
        const result = await  getRechargeRepository(number)
        return result
    } catch (err) {
        console.log(err)
        throw err;
    }
   
}