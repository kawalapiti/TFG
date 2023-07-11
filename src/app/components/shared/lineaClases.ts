export class dataRequest{
    usuario: string;
    fechaInicial?: string;
    fechaFinal?: string;
}

export class dataResponse{
    enunciado: string;
    fecha: string;
    respuesta: string;
}

export class restultadoTest{
    fecha: Date;
    valor: number;
}

export class datos{
    valor: number[];
    dia: string;
    media?: number;
}