import { api } from "../providers";
import { Doctor } from "../schemas/models";
import { DoctorDTO } from "../schemas/dtos";

const getAllDoctors = () => api.get<Doctor[]>(`/medico`)
const postDoctor = (doctor: DoctorDTO) => api.post<Doctor>(`/medico`, doctor)
const putDoctorById = (id: number, doctor: DoctorDTO) => api.put<Doctor>(`/medico/${id}`, doctor)
const deleteDoctorById = (id: number) => api.delete<Doctor>(`/medico/${id}`)

export const doctorService = {
    getAllDoctors,
    postDoctor,
    putDoctorById,
    deleteDoctorById
}