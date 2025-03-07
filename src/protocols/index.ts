export type Phone = {
  id: number
  numero: string,
  descricao: string,
  nome: string,
  nome_operadora: string,
  cpf_usuario: string
}


export type IdClienteResult = {
  id: number | string
}

export type QtdTelefoneResult = {
  id : number| string,
  phone_id : number | string,
  cliente_id : number | string,
  id_cliente : number | string,
  cpf : string

}

export type PhoneResult = {
  id : number| string,
  numero: number | string,
  descricao: number | string,
  nome: number | string,
  id_operadora: number | string

}

export type PhoneClienteInsert = {
  phoneId : number | string,
  clienteId : number | string

}

export type PhoneByIdResult = {
  numero: string | number;
  descricao: string | number;
  nome: string | number;
  nomeOperdora:  string | number; 
};

export type ClienteQuery = {
  id : number | string,
  cpf : string
}


export type PhonePost = Omit<Phone, "id">;

export type DocumentSchema = {
  document: string | number
}

export type ValorRecargaSchema = {
  valor_recarga: string | number
}

export type ErrorType = {
  type: string;
  message: string;
}


export type Recarga = {
  id: number | string,
  valor_recarga: string,
  telefone_id: string
}

export type RecargaQuery = {
  id : number| string,
  valor_recarga: string ,
  telefone_id:  string,
  registro_recargas: Date | string 
}

export type RecargaGet = {
  id: number | string,
  valor_recarga: string | number,
  telefone_id: string | number,
  registro_recarga: string | Date
}



export type Recharge = {
  valor_recarga: string | number,
  registro_recargas: Date | string
}

export type Carrier = {
  name: string,
  code: number | string
}

export type PhoneSummary = {
  numero: string,
  descricao: string,
  nome: string,
  carrier: Carrier,
  recharges: Recharge[]
}


export type Summary = {
  document: string,
  phones: PhoneSummary[]
}


export type bigQuery = {
  id: string | number,
  phone_id : string | number,
  cliente_id : string | number,
  id_phone: string | number,
  numero : string,
  descricao: string,
  nome : string,
  id_operadora : number | string,
  id_cliente: string | number,
  cpf: string,
  operadora_id: string | number,
  name: string,
  code : string | number,
  recarga_id: string | number,
  valor_recarga: string | number,
  id_phone_recarga: string | number,
  registro_recargas : Date | string

}




