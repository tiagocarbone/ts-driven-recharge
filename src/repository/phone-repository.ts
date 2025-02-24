

import { PhonePost, Recarga } from "protocols"
import { db } from "../db/db"

export async function postPhoneRepository() {

    console.log("repository")
}

export async function postPhoneVerificaCpfRepository(cpf_usuario: string): Promise<boolean> {
    const result = await db.query(`
            select id from cliente where cpf = $1;`, [cpf_usuario])

    const idCliente = result.rows[0].id
    console.log("idCliente", idCliente)

    const qtdTelefoneResult = await db.query(` 
        select * from phone_cliente tb_meio
	    join cliente on tb_meio.cliente_id = cliente.id
	    where cliente.id = $1;  `, [idCliente])


    const qtdeTelefone = qtdTelefoneResult.rowCount

    if (qtdeTelefone >= 3) return false;
    if (qtdeTelefone < 3) return true;


}


export async function postPhoneVerificaNumeroRepository(numeroTelefone: string): Promise<boolean> {
    const result = await db.query(` select * from phone where  numero = $1 ;`, [numeroTelefone])
    //console.log(result.rows)
    if (result.rows.length == 0) return false
    if (result.rows.length >= 1) return true


}


export async function postPhoneIncluiRepository(telefone: PhonePost): Promise<void> {

    let codigoOperadora = 0;

    try {
        codigoOperadora = pegaCodigoOperadora(telefone.nome_operadora);
        const idCliente = await pegaIdClientecpf_usuario(telefone.cpf_usuario)
        
        

        const insertPhone = await db.query(` INSERT INTO phone 
            (numero, descricao, nome, id_operadora)
            VALUES
            ($1, $2, $3, $4) RETURNING id; `, [telefone.numero, telefone.descricao, telefone.nome, codigoOperadora])

            let phoneId = insertPhone.rows[0].id
            console.log(phoneId)
            console.log(idCliente)


        const inserTbPhoneCliente = await db.query(` insert into phone_cliente (phone_id, cliente_id) 
            VALUES  ($1, $2) `, [phoneId, idCliente])
        


    } catch (err) {
        console.log(err)
    }

}


export async function getPhoneByCpfRepository(cpf: string){

    const idCliente = await pegaIdClientecpf_usuario(cpf);
    
    const phoneById = await db.query(` 
    select 
	cliente.nome as nome_cliente, phone.numero, 
	phone.descricao, phone.nome,
	carriers.name
	from phone_cliente
	join cliente on phone_cliente.cliente_id = cliente.id
	join phone on phone_cliente.phone_id = phone.id
	join carriers on phone.id_operadora = carriers.id
	where cliente.id = $1; `, [idCliente])
    
    return phoneById.rows
}

export async function postRechargeRepository(idPhone: string, valorRecarga:number): Promise<Recarga>{
    try{
        const result = await db.query(` select * from phone where id = $1 `, [idPhone])
        if(result.rowCount == 0)  throw { type: "not found", message: "Esse numero nao consta no sistema!" };

  
        const inserOperation = await db.query(` insert into recargas 
            (valor_recarga, telefone_id)
            values($1, $2)
            RETURNING *
             `, [valorRecarga, idPhone])
        
        return inserOperation.rows[0]
        


    }catch(err){
        throw err
       console.log(err)
    }
   
}


async function pegaIdClientecpf_usuario(cpf_usuario: string){
    const result = await db.query(`
        select id from cliente where cpf = $1;`, [cpf_usuario])
        const idCliente = result.rows[0].id
        return idCliente
}

function pegaCodigoOperadora(nome_operadora: string) {
    switch (nome_operadora) {
        case 'Vivo':
            return 1


        case 'Tim':
            return 2;

        case 'Oi':
            return 3

        case 'Claro':
            return 4

        default:
            throw { error: "unprocessable entity", mesage: "Erro no codigo da operadora" };
    }
}