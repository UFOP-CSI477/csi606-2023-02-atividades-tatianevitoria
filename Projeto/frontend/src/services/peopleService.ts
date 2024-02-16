import { api } from "../providers";
import { People } from "../schemas/models";
import { PeopleDTO } from "../schemas/dtos";

const getAllPeoples = () => api.get<People[]>(`/paciente`)
const postPeople = (people: PeopleDTO) => api.post<People>(`/paciente`, people)
const putPeopleById = (id: number, people: PeopleDTO) => api.put<People>(`/paciente/${id}`, people)
const deletePeopleById = (id: number) => api.delete<People>(`/paciente/${id}`)

export const peopleService = {
    getAllPeoples,
    postPeople,
    putPeopleById,
    deletePeopleById
}