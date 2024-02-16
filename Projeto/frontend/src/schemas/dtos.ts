export interface DoctorDTO {
    nome: string;
    especialidade: string;
    agenda_id: number;
}

export interface PeopleDTO {
    nome: string;
    cpf: string;
}

export interface QueryDTO {
    agenda_id: number;
    paciente_id: number;
    medico_id: number;
    status: string;
}

export interface ScheduleDTO {
    data_agenda: string;
    horario: string;
}