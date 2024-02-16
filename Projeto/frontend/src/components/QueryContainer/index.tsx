import { useEffect, useState } from "react";
import { convertDateToBrazilianTime } from "../../utils/formatValues"

import LinearProgressLoading from "../LinearProgressLoading";
import UpsertQueryDialog from "../UpsertQueryDialog";
import TableContainer from "../TableContainer";

import { scheduleService } from "../../services/scheduleService"; 
import { doctorService } from "../../services/doctorService";
import { peopleService } from "../../services/peopleService";

import { queryService } from "../../services/queryService";
import { Add, Delete, Edit } from "@mui/icons-material";
import { Box, Button, IconButton } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { Query } from "../../schemas/models";
import { toast } from "react-toastify";
import { Schedule } from "../../schemas/models"
import { Doctor } from "../../schemas/models";
import { People } from "../../schemas/models";

export default function QueryContainer() {

    const [openUpsertQueryDialog, setOpenUpsertQueryDialog] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [editQuery, setEditQuery] = useState<Query>()
    const [queries, setQueries] = useState<Query[]>([])
    const [schedules, setSchedules] = useState<Schedule[]>([])
    const [doctors, setDoctors] = useState<Doctor[]>([])
    const [peoples, setPeoples] = useState<People[]>([])

    const getAllQueries = () => {

        setLoading(true)

        queryService.getAllQueries().then(res => {
            setQueries(res.data)
            toast.success(`Consultas carregadas com sucesso.`)
        }).catch(err => {
            toast.error(err.message)
        }).finally(() => {
            setLoading(false)
        })
    }

    const handleEditQuery = (query: Query) => {
        setEditQuery(query)
        setOpenUpsertQueryDialog(true)
    }

    const handleDeleteQuery = (query: Query) => {

        setLoading(true)

        queryService.deleteQueryById(query.id).then(() => {
            toast.success(`Consulta de ID: #${query.id} deletada com sucesso.`)
            getAllQueries()
        }).catch(err => {
            toast.error(err.message)
        }).finally(() => {
            setLoading(false)
        })
    }

    const handleCreateQuery = () => {
        setEditQuery(undefined)
        setOpenUpsertQueryDialog(true)
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 100, editable: false, align: "center", headerAlign: 'center' },
        { field: 'status', headerName: 'Status', width: 350, editable: false, align: "center", headerAlign: 'center' },
        { field: 'agenda_id', headerName: 'Agenda', width: 200, editable: false, align: "center", headerAlign: 'center', 
        valueGetter: (params) => {
            const doctor = doctors.find(doctor => doctor.id === params.row.medico_id);
            if (!doctor) return '';
            
            const agenda = schedules.find((schedule) => schedule.id === doctor.agenda_id);
            return agenda ? `${convertDateToBrazilianTime(agenda.data_agenda)} - ${agenda.horario}` : '';
        }
    },
    { 
        field: 'medico_id', 
        headerName: 'Médico', 
        width: 200, 
        editable: false, 
        align: "center", 
        headerAlign: 'center', 
        valueGetter: (params) => {
            const doctor = doctors.find(doctor => doctor.id === params.row.medico_id);
            return doctor ? doctor.nome : '';
        }
    },
    { 
        field: 'paciente_id', 
        headerName: 'Paciente', 
        width: 200, 
        editable: false, 
        align: "center", 
        headerAlign: 'center', 
        valueGetter: (params) => {
            const patient = peoples.find(patient => patient.id === params.row.paciente_id);
            return patient ? patient.nome : '';
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
                        onClick={() => handleEditQuery(params.row)}
                    >
                        <Edit />
                    </IconButton>
                    <IconButton
                        color="error"
                        size="small"
                        onClick={() => handleDeleteQuery(params.row)}
                    >
                        <Delete />
                    </IconButton>
                </Box>
            ),
        },
    ];

    useEffect(() => {
        getAllQueries(),
        scheduleService.getAllSchedules().then(res => { 
                setSchedules(res.data);
        }).catch(err => {
            toast.error(err.message);
        });
        doctorService.getAllDoctors().then(res => { 
            setDoctors(res.data);
        }).catch(err => {
            toast.error(err.message);
        });
        peopleService.getAllPeoples().then(res => { 
            setPeoples(res.data);
        }).catch(err => {
            toast.error(err.message);
        });
    }, []);
    
    

    return (
        <Box display='flex' justifyContent='center' flexDirection='column' alignItems='flex-start' width='100%' mt={3}>
            <Button color="secondary" variant="contained" endIcon={<Add />} sx={{ mb: 2 }} onClick={handleCreateQuery} >
                Novo
            </Button>
            {openUpsertQueryDialog && <UpsertQueryDialog getAllQueries={getAllQueries} setOpen={setOpenUpsertQueryDialog} query={editQuery} />}
            {loading && <LinearProgressLoading />}
            <TableContainer columns={columns} rows={queries} />
        </Box>
    )
}