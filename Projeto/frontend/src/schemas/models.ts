export interface Doctor {
    id: number;
    nome: string;
    especialidade: string;
    agenda_id: number;
}

export interface People {
    id: number;
    nome: string;
    cpf: string;
}

export interface Query {
    id: number;
    agenda_id: number;
    paciente_id: number;
    medico_id: number;
    status: string;
}

export interface Schedule {
    id: number;
    data_agenda: string;
    horario: string;
}