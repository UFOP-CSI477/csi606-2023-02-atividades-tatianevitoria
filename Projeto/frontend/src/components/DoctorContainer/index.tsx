import { useEffect, useState } from "react";
import { convertDateToBrazilianTime } from "../../utils/formatValues"

import LinearProgressLoading from "../LinearProgressLoading";
import UpsertDoctorDialog from "../UpsertDoctorDialog";
import TableContainer from "../TableContainer";

import { scheduleService } from "../../services/scheduleService"; 

import { doctorService } from "../../services/doctorService";
import { Add, Delete, Edit } from "@mui/icons-material";
import { Box, Button, IconButton } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { Doctor } from "../../schemas/models";
import { toast } from "react-toastify";
import { Schedule } from "../../schemas/models"


export default function DoctorContainer() {

    const [openUpsertDoctorDialog, setOpenUpsertDoctorDialog] = useState<boolean>(false)
    const [editDoctor, setEditDoctor] = useState<Doctor>()
    const [doctors, setDoctors] = useState<Doctor[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [schedules, setSchedules] = useState<Schedule[]>([])

    const getAllDoctors = () => {

        setLoading(true)

        doctorService.getAllDoctors().then(res => {
            setDoctors(res.data)
            toast.success(`Médicos carregados com sucesso.`)
        }).catch(err => {
            toast.error(err.message)
        }).finally(() => {
            setLoading(false)
        })
    }

    const handleEditDoctor = (doctor: Doctor) => {
        setEditDoctor(doctor)
        setOpenUpsertDoctorDialog(true)
    }

    const handleDeleteDoctor = (doctor: Doctor) => {

        setLoading(true)

        doctorService.deleteDoctorById(doctor.id).then(() => {
            toast.success(`Médico de ID: #${doctor.id} deletado com sucesso.`)
            getAllDoctors()
        }).catch(err => {
            toast.error(err.message)
        }).finally(() => {
            setLoading(false)
        })
    }

    const handleCreateDoctor = () => {
        setEditDoctor(undefined)
        setOpenUpsertDoctorDialog(true)
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 100, editable: false, align: "center", headerAlign: 'center' },
        { field: 'nome', headerName: 'Nome', width: 400, editable: false, align: "center", headerAlign: 'center' },
        { field: 'especialidade', headerName: 'Especialidade', width: 200, editable: false, align: "center", headerAlign: 'center' },
        { field: 'agenda', headerName: 'Agenda', width: 200, editable: false, align: "center", headerAlign: 'center', 
        valueGetter: (params) => {
            const doctor = params.row;
            const agenda = schedules.find((schedule) => schedule.id === doctor.agenda_id);
            return agenda ? `${convertDateToBrazilianTime(agenda.data_agenda)} - ${agenda.horario}` : '';
        }
        },
        {
            field: 'action',
            headerName: 'Ações',
            headerAlign: 'center',
            width: 100,
            sortable: false,
            filterable: false,
            align: "center",
            disableColumnMenu: true,
            renderCell: (params) => (
                <Box display='flex' justifyContent='center' alignItems='center'>
                    <IconButton
                        color="default"
                        size="small"
                        onClick={() => handleEditDoctor(params.row)}
                    >
                        <Edit />
                    </IconButton>
                    <IconButton
                        color="error"
                        size="small"
                        onClick={() => handleDeleteDoctor(params.row)}
                    >
                        <Delete />
                    </IconButton>
                </Box>
            ),
        },
    ];
    
    useEffect(() => {
        getAllDoctors();
        scheduleService.getAllSchedules().then(res => { 
            setSchedules(res.data);
        }).catch(err => {
            toast.error(err.message);
        });
    }, []);
    

    return (
        <Box display='flex' justifyContent='center' flexDirection='column' alignItems='flex-start' width='100%' mt={3}>
            <Button color="secondary" variant="contained" endIcon={<Add />} sx={{ mb: 2 }} onClick={handleCreateDoctor} >
                Novo
            </Button>
            {openUpsertDoctorDialog && <UpsertDoctorDialog getAllDoctors={getAllDoctors} setOpen={setOpenUpsertDoctorDialog} doctor={editDoctor} />}
            {loading && <LinearProgressLoading />}
            <TableContainer columns={columns} rows={doctors} />
        </Box>
    )
}