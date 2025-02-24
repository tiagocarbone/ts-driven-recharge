import joi from "joi";
import { PhonePost } from "protocols";

export const phoneSchema = joi.object<PhonePost>({
    numero : joi.string().min(10).max(11).required(),
    descricao: joi.string().required(),
    nome:  joi.string().required(),
    nome_operadora: joi.string().valid('Vivo', 'Claro', 'Tim', 'Oi').required(),
    cpf_usuario: joi.string().length(11).required()

})

export const cpfSchema = joi.object({
    document: joi.string().length(11).required()
});

export const valorSchema = joi.object({
    valor_recarga: joi.number().min(10).max(1000).required()
})


