import { api } from "../providers";
import { Query } from "../schemas/models";
import { QueryDTO } from "../schemas/dtos";

const getAllQueries = () => api.get<Query[]>(`/consulta`)
const postQuery = (query: QueryDTO) => api.post<Query>(`/consulta`, query)
const putQueryById = (id: number, query: QueryDTO) => api.put<Query>(`/consulta/${id}`, query)
const deleteQueryById = (id: number) => api.delete<Query>(`/consulta/${id}`)

export const queryService = {
    getAllQueries,
    postQuery,
    putQueryById,
    deleteQueryById
}