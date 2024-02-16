import { useEffect, useState } from "react"

import CircularProgressLoading from "../CircularProgressLoading"

import { Autocomplete, Box, Button, Dialog, DialogContent, DialogTitle, Divider, Grid, IconButton, Stack, TextField } from "@mui/material"
import { Doctor, People, Query, Schedule } from "../../schemas/models"
import { convertDateToBrazilianTime } from "../../utils/formatValues"
import { scheduleService } from "../../services/scheduleService"
import { peopleService } from "../../services/peopleService"
import { doctorService } from "../../services/doctorService"
import { queryService } from "../../services/queryService"
import { QueryDTO } from "../../schemas/dtos"
import { Close } from "@mui/icons-material"
import { toast } from "react-toastify"


interface IUpsertQueryDialogProps {
    query?: Query,
    setOpen(state: boolean): void,
    getAllQueries(): void
}

export default function UpsertQueryDialog({ setOpen, query, getAllQueries }: IUpsertQueryDialogProps) {

    const [loadingSchedules, setLoadingSchedules] = useState<boolean>(false)
    const [loadingDoctors, setLoadingDoctors] = useState<boolean>(false)
    const [loadingPeoples, setLoadingPeoples] = useState<boolean>(false)
    const [schedules, setSchedules] = useState<Schedule[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [doctors, setDoctors] = useState<Doctor[]>([])
    const [peoples, setPeoples] = useState<People[]>([])


    const getAllSchedules = () => {

        setLoadingSchedules(true)

        scheduleService.getAllSchedules().then(res => {
            setSchedules(res.data)
        }).catch(err => {
            toast.error(err.message)
        }).finally(() => {
            setLoadingSchedules(false)
        })
    }

    const getAllPeoples = () => {

        setLoadingPeoples(true)

        peopleService.getAllPeoples().then(res => {
            setPeoples(res.data)
        }).catch(err => {
            toast.error(err.message)
        }).finally(() => {
            setLoadingPeoples(false)
        })
    }

    const getAllDoctors = () => {

        setLoadingDoctors(true)

        doctorService.getAllDoctors().then(res => {
            setDoctors(res.data)
        }).catch(err => {
            toast.error(err.message)
        }).finally(() => {
            setLoadingDoctors(false)
        })
    }

    const postQuery = (query: QueryDTO) => {

        setLoading(true)

        queryService.postQuery(query).then(() => {
            toast.success('Consulta adicionada com sucesso!')
            getAllQueries()
            setOpen(false)
        }).catch(err => {
            toast.error(err.message)
        }).finally(() => {
            setLoading(false)
        })
    }

    const putQueryById = (id: number, query: QueryDTO) => {

        setLoading(true)

        queryService.putQueryById(id, query).then(() => {
            toast.success(`Consulta de ID: #${id} atualizado com sucesso!`)
            getAllQueries()
            setOpen(false)
        }).catch(err => {
            toast.error(err.message)
        }).finally(() => {
            setLoading(false)
        })
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const status = String(data.get('status'))

        const agenda_id = schedules.find((schedule) => `${convertDateToBrazilianTime(schedule.data_agenda)} ${schedule.horario}` === String(data.get('agenda_id')))?.id || 0
        const medico_id = doctors.find((doctor) => `${doctor.nome} - ${doctor.especialidade}` === String(data.get('medico_id')))?.id || 0
        const paciente_id = peoples.find((people) => `${people.nome} - ${people.cpf}` === String(data.get('paciente_id')))?.id || 0

        if (query) {
            putQueryById(query.id, { agenda_id, status, medico_id, paciente_id })
        } else {
            postQuery({ agenda_id, status, medico_id, paciente_id })
        }
    }

    useEffect(() => {
        getAllSchedules()
        getAllDoctors()
        getAllPeoples()
    }, [])

    return (
        <Dialog
            TransitionProps={{ unmountOnExit: true }}
            open
            scroll="body"
            maxWidth='md'
            fullWidth
        >
            <Box
                component='form'
                onSubmit={handleSubmit}
            >
                <DialogTitle>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>{query ? `Atualizar Consulta ID: #${query.id}` : `Criar Consulta`}</Grid>
                        <Grid item>
                            <IconButton sx={{ size: 'small' }} onClick={() => setOpen(false)}>
                                <Close />
                            </IconButton>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <Divider />

                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField fullWidth type="text" name="status" id="status" label="Status" required defaultValue={query?.status} InputLabelProps={{ shrink: true }} />
                        </Grid>
                        <Grid item xs={12}>
                            {loadingSchedules ? <CircularProgressLoading /> :
                                <Autocomplete
                                    disablePortal
                                    id="agenda_id"
                                    options={schedules}
                                    defaultValue={schedules.find((schedule) => schedule.id === query?.agenda_id)}
                                    fullWidth
                                    getOptionLabel={(option) => `${convertDateToBrazilianTime(option.data_agenda)} ${option.horario}`}
                                    renderInput={(params) => <TextField {...params} id="agenda_id" fullWidth name="agenda_id" required label="Agenda" />}
                                />}
                        </Grid>
                        <Grid item xs={12}>
                            {loadingDoctors ? <CircularProgressLoading /> :
                                <Autocomplete
                                    disablePortal
                                    id="medico_id"
                                    options={doctors}
                                    defaultValue={doctors.find((doctor) => doctor.id === query?.medico_id)}
                                    fullWidth
                                    getOptionLabel={(option) => `${option.nome} - ${option.especialidade}`}
                                    renderInput={(params) => <TextField {...params} id="medico_id" fullWidth name="medico_id" required label="Médico" />}
                                />}
                        </Grid>
                        <Grid item xs={12}>
                            {loadingPeoples ? <CircularProgressLoading /> :
                                <Autocomplete
                                    disablePortal
                                    id="paciente_id"
                                    options={peoples}
                                    defaultValue={peoples.find((people) => people.id === query?.paciente_id)}
                                    fullWidth
                                    getOptionLabel={(option) => `${option.nome} - ${option.cpf}`}
                                    renderInput={(params) => <TextField {...params} id="paciente_id" fullWidth name="paciente_id" required label="Paciente" />}
                                />}
                        </Grid>
                    </Grid>
                </DialogContent>

                <Divider />
                <Box sx={{ width: "100%" }}>
                    <Stack spacing={2} sx={{ alignItems: "center", justifyContent: 'space-between', margin: '2vh' }} direction="row">
                        <Button variant="contained" component="label" color="error" onClick={() => setOpen(false)} >Fechar</Button>
                        <Button disabled={loading} variant="contained" color="primary" type='submit' >{query ? "Atualizar" : "Cadastrar"}</Button>
                    </Stack>
                </Box>
            </Box>
        </Dialog >
    )
}