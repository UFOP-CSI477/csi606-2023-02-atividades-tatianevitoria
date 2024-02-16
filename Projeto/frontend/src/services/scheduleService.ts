import { api } from "../providers";
import { Schedule } from "../schemas/models";
import { ScheduleDTO } from "../schemas/dtos";

const getAllSchedules = () => api.get<Schedule[]>(`/agenda`)
const postSchedule = (schedule: ScheduleDTO) => api.post<Schedule>(`/agenda`, schedule)
const putScheduleById = (id: number, schedule: ScheduleDTO) => api.put<Schedule>(`/agenda/${id}`, schedule)
const deleteScheduleById = (id: number) => api.delete<Schedule>(`/agenda/${id}`)

export const scheduleService = {
    getAllSchedules,
    postSchedule,
    putScheduleById,
    deleteScheduleById
}