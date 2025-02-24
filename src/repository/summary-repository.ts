import { Summary } from "protocols";
import { db } from "../db/db";

export async function getSummaryRepository(document: string): Promise<Summary> {
    try {

        const resultCliente = await db.query(` select * from cliente where cpf = $1 `, [document])

        if (resultCliente.rowCount == 0) throw { type: "not found", message: "Esse cpf nao consta no sistema!" };

        const idCliente = resultCliente.rows[0].id

        const bigQuery = await db.query(`select * from phone_cliente
	    join phone on phone_cliente.phone_id = phone.id
	    join cliente on phone_cliente.cliente_id = cliente.id
	    join carriers on phone.id_operadora = carriers.id
	    left join recargas on phone_cliente.phone_id = recargas.telefone_id
	    where cliente_id = $1
        ; `, [idCliente])

        const resultArray = bigQuery.rows

        let cpf: string;
        if (resultArray[0].cpf) {
            cpf = resultArray[0].cpf
        } else {
            throw { type: "not found", message: "Erro na busca do cpf" };
        }



        const summary: Summary = {
            document: cpf,
            phones: [],
        };

        console.log(resultArray)

        resultArray.forEach(result => {

            let phone = summary.phones.find(phone => phone.numero === result.numero);

            console.log("phone", phone)

            if (!phone) {
                phone = {
                    numero: result.numero,
                    descricao: result.descricao,
                    nome: result.nome,
                    carrier: {
                        name: result.name,
                        code: result.code,
                    },
                    recharges: [],
                }
                summary.phones.push(phone);
            }

            if (result.valor_recarga) {
                phone.recharges.push({
                    valor_recarga: result.valor_recarga,
                    registro_recargas: result.registro_recargas,
                })
            }
        });

        return summary;

    } catch (err) {
        console.log(err)
        throw err

    }

}
