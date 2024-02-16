import { useEffect, useState } from "react";

import LinearProgressLoading from "../LinearProgressLoading";
import UpsertScheduleDialog from "../UpsertScheduleDialog";
import TableContainer from "../TableContainer";

import { convertDateToBrazilianTime } from "../../utils/formatValues";
import { scheduleService } from "../../services/scheduleService";
import { Add, Delete, Edit } from "@mui/icons-material";
import { Box, Button, IconButton } from "@mui/material";
import { Schedule } from "../../schemas/models";
import { GridColDef } from "@mui/x-data-grid";
import { toast } from "react-toastify";


export default function ScheduleContainer() {

    const [openUpsertScheduleDialog, setOpenUpsertScheduleDialog] = useState<boolean>(false)
    const [editSchedule, setEditSchedule] = useState<Schedule>()
    const [schedules, setSchedules] = useState<Schedule[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const getAllSchedules = () => {

        setLoading(true)

        scheduleService.getAllSchedules().then(res => {
            setSchedules(res.data)
            toast.success(`Agendas carregadas com sucesso.`)
        }).catch(err => {
            toast.error(err.message)
        }).finally(() => {
            setLoading(false)
        })
    }

    const handleEditSchedule = (schedule: Schedule) => {
        setEditSchedule(schedule)
        setOpenUpsertScheduleDialog(true)
    }

    const handleDeleteSchedule = (schedule: Schedule) => {

        setLoading(true)

        scheduleService.deleteScheduleById(schedule.id).then(() => {
            toast.success(`Agenda de ID: #${schedule.id} deletada com sucesso.`)
            getAllSchedules()
        }).catch(err => {
            toast.error(err.message)
        }).finally(() => {
            setLoading(false)
        })
    }

    const handleCreateSchedule = () => {
        setEditSchedule(undefined)
        setOpenUpsertScheduleDialog(true)
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 100, editable: false, align: "center", headerAlign: 'center' },
        { field: 'data_agenda', headerName: 'Data da Agenda', width: 500, editable: false, align: "center", headerAlign: 'center', valueGetter: (params) => convertDateToBrazilianTime(params.row.data_agenda) },
        { field: 'horario', headerName: 'Horário', width: 300, editable: false, align: "center", headerAlign: 'center' },
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
                        onClick={() => handleEditSchedule(params.row)}
                    >
                        <Edit />
                    </IconButton>
                    <IconButton
                        color="error"
                        size="small"
                        onClick={() => handleDeleteSchedule(params.row)}
                    >
                        <Delete />
                    </IconButton>
                </Box>
            ),
        },
    ];

    useEffect(() => {
        getAllSchedules()
    }, [])

    return (
        <Box display='flex' justifyContent='center' flexDirection='column' alignItems='flex-start' width='100%' mt={3}>
            <Button color="secondary" variant="contained" endIcon={<Add />} sx={{ mb: 2 }} onClick={handleCreateSchedule} >
                Novo
            </Button>
            {openUpsertScheduleDialog && <UpsertScheduleDialog getAllSchedules={getAllSchedules} setOpen={setOpenUpsertScheduleDialog} schedule={editSchedule} />}
            {loading && <LinearProgressLoading />}
            <TableContainer columns={columns} rows={schedules} />
        </Box>
    )
}