import { PhonePost } from "protocols";
import { getPhoneByCpfRepository, postPhoneIncluiRepository, 
    postPhoneVerificaCpfRepository, postPhoneVerificaNumeroRepository } from "../repository/phone-repository";

export async function postPhoneService(phoneData: PhonePost) { 
    try {
        const temTelefone = await postPhoneVerificaNumeroRepository(phoneData.numero);
        if (temTelefone) {
            throw { type: "validation", message: "Já existe um telefone com esse número cadastrado" };
        }

        const verificaQtdeCpf = await postPhoneVerificaCpfRepository(phoneData.cpf_usuario);
        if (!verificaQtdeCpf) {
            throw { type: "validation", message: "Esse cliente já tem 3 números cadastrados" };
        }

        const result = await postPhoneIncluiRepository(phoneData); 
        return result
       
        
    } catch (err) {
        console.log(err)
        throw err; 
    }
}

export async function getPhoneService(cpf: string){
    try{
        const result = getPhoneByCpfRepository(cpf);
        return result
    }catch(err){
        throw err; 
    }
}

