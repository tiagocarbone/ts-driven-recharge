export type Phone = {
    id: number
    numero : string,
    descricao: string,
    nome: string,
    nome_operadora: string,
    cpf_usuario: string
}

export type PhonePost = Omit<Phone, "id">;


export type ErrorType = {
  type: string;
  message: string;
}
  

export type Recarga ={
  id: number,
  valor_recarga: string, 
  telefone_id: string
}

export type RecargaGet = {
  id: number,
  valor_recarga: string, 
  telefone_id: string,
  registro_recarga : string | Date
}



export type Recharge = {
  valor_recarga: string,
  registro_recargas: Date  | string
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





