/*
import { NextFunction, Request, Response } from "express";
import {postPhoneIncluiRepository, postPhoneVerificaCpfRepository,  postPhoneVerificaNumeroRepository } from "../repository/phone-repository";
import { PhonePost } from "protocols";



export async function postPhoneService(req: Request, res: Response, next: NextFunction) {

    const numeroTelefone = req.body.numero
    const cpf = req.body.cpf_usuario

    

    try{
        const temTelefone = await postPhoneVerificaNumeroRepository(numeroTelefone);
        if (temTelefone) {
            //console.log("tem")
            throw { type: "validation", message: "ja existe um telefone com esse numero cadastrado" }; 
        }
        const verificaQtdeCpf = await postPhoneVerificaCpfRepository(cpf);
        if(!verificaQtdeCpf)  throw { type: "validation", message: "esse cliente ja tem 3 numeros cadastrado" };

        postPhoneIncluiRepository(req.body)

        res.send("ffc")
    }catch(err){
        next(err)

    }
    
    

   
}
    */

import { PhonePost } from "protocols";
import { getPhoneByCpfRepository, postPhoneIncluiRepository, postPhoneVerificaCpfRepository, postPhoneVerificaNumeroRepository, postRechargeRepository } from "../repository/phone-repository";

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
       
        
    } catch (err) {
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

export async function postRechargeService(idPhone: string, valorRecarga: number){

    try {
        const result = await  postRechargeRepository(idPhone, valorRecarga)
        return result
    } catch (err) {
        throw err;
    }
    
   
}