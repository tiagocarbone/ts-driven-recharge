import { IdClienteResult, Phone, PhoneByIdResult, PhoneClienteInsert, PhonePost, PhoneResult, QtdTelefoneResult } from "protocols"
import { db } from "../db/db"

export async function postPhoneRepository() {

    console.log("repository")
}

export async function postPhoneVerificaCpfRepository(cpf_usuario: string): Promise<boolean> {
    const result = await db.query<IdClienteResult>(`
            select id from cliente where cpf = $1;`, [cpf_usuario])

    let idCliente: number | string;
   
    if(! result.rows || result.rows.length == 0 ){
        const insertCliente = await db.query(`insert into cliente (cpf) values ($1) `, [cpf_usuario]) 
    } else{
        idCliente = result.rows[0].id
    }

    
    
    console.log("idCliente", idCliente)

    const qtdTelefoneResult = await db.query<QtdTelefoneResult[]>(` 
        select * from phone_cliente tb_meio
	    join cliente on tb_meio.cliente_id = cliente.id
	    where cliente.id = $1;  `, [idCliente])

    console.log("passou verifica telefone")
    const qtdeTelefone = qtdTelefoneResult.rowCount

    if (qtdeTelefone >= 3) return false;
    if (qtdeTelefone < 3) return true;

}


export async function postPhoneVerificaNumeroRepository(numeroTelefone: string): Promise<boolean> {
    const result = await db.query<PhoneResult>(` select * from phone where  numero = $1 ;`, [numeroTelefone])
    if (result.rows.length == 0) return false
    if (result.rows.length >= 1) return true


}

export async function postPhoneIncluiRepository(telefone: PhonePost): Promise<Phone> {

    let codigoOperadora = 0;

    try {
        codigoOperadora = pegaCodigoOperadora(telefone.nome_operadora);
        const idCliente = await pegaIdClientecpf_usuario(telefone.cpf_usuario)
        
        

        const insertPhone = await db.query<PhoneResult>(` INSERT INTO phone 
            (numero, descricao, nome, id_operadora)
            VALUES
            ($1, $2, $3, $4) RETURNING id; `, [telefone.numero, telefone.descricao, telefone.nome, codigoOperadora])

            let phoneId = insertPhone.rows[0].id
            console.log(phoneId)
            console.log(idCliente)
           

        const inserTbPhoneCliente = await db.query<PhoneClienteInsert>(` insert into phone_cliente (phone_id, cliente_id) 
            VALUES  ($1, $2) `, [phoneId, idCliente])
        
        
        const phoneInserted = await db.query<Phone>(`select * from phone where id = $1`, [phoneId]);
        return phoneInserted.rows[0]

    } catch (err) {
        console.log(err)
    }

}


export async function getPhoneByCpfRepository(cpf: string){

    const idCliente = await pegaIdClientecpf_usuario(cpf);
    
   

    const phoneById = await db.query<PhoneByIdResult>(` 
    select 
	phone.numero, 
	phone.descricao, phone.nome,
	carriers.name
	from phone_cliente
	join cliente on phone_cliente.cliente_id = cliente.id
	join phone on phone_cliente.phone_id = phone.id
	join carriers on phone.id_operadora = carriers.id
	where cliente.id = $1; `, [idCliente])
    
    return phoneById.rows
}


async function pegaIdClientecpf_usuario(cpf_usuario: string): Promise<number | string> {
    const result = await db.query<IdClienteResult>(`
        SELECT id FROM cliente WHERE cpf = $1;`, [cpf_usuario]);

    if (!result.rows || result.rows.length === 0) {
        throw { type: "not found", message: "Não há cliente com esse CPF" };
    }

    return result.rows[0].id;
}

function pegaCodigoOperadora(nome_operadora: string): number {
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
            throw { type: "unprocessable entity", mesage: "Erro no codigo da operadora" };
    }
}