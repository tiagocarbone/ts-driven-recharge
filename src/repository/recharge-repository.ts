import { PhoneResult, Recarga, RecargaGet, RecargaQuery,  } from "protocols";
import { db } from "../db/db"
import dayjs from "dayjs";


export async function postRechargeRepository(idPhone: string, valorRecarga:number): Promise<Recarga>{
    try{
        const result = await db.query<PhoneResult>(` select * from phone where id = $1 `, [idPhone])
        if(result.rowCount == 0)  throw { type: "not found", message: "Esse numero nao consta no sistema!" };
    
  
        const dataAtual = dayjs().format('YYYY-MM-DD HH:mm:ss');
        console.log(dataAtual)

        const inserOperation = await db.query<RecargaQuery>(` insert into recargas 
            (valor_recarga, telefone_id, registro_recargas)
            values($1, $2, $3)
            RETURNING *
             `, [valorRecarga, idPhone, dataAtual])
        
        return inserOperation.rows[0]
        


    }catch(err){
        throw err
       console.log(err)
    }
   
}


export async function getRechargeRepository(number: string): Promise<RecargaGet[] | void > {
    try{
        const resultPhone = await db.query<PhoneResult>(` select * from phone where numero = $1 `, [number])
        if(resultPhone.rowCount == 0) throw { type: "not found", message: "Esse numero nao consta no sistema!" }; 
        const phoneId = resultPhone.rows[0].id
    
        const result = await db.query(`select * from recargas where telefone_id = $1;`, [phoneId])
 
        return result.rows

    }catch(err){
        throw err
       console.log(err)
    }
   
}

