import { useEffect, useState } from "react"

import { Autocomplete, Box, Button, Dialog, DialogContent, DialogTitle, Divider, Grid, IconButton, Stack, TextField } from "@mui/material"
import { convertDateToBrazilianTime } from "../../utils/formatValues"
import { scheduleService } from "../../services/scheduleService"
import { doctorService } from "../../services/doctorService"
import { Doctor, Schedule } from "../../schemas/models"
import { DoctorDTO } from "../../schemas/dtos"
import { Close } from "@mui/icons-material"
import { toast } from "react-toastify"
import CircularProgressLoading from "../CircularProgressLoading"

interface IUpsertDoctorDialogProps {
    doctor?: Doctor,
    setOpen(state: boolean): void,
    getAllDoctors(): void
}

export default function UpsertDoctorDialog({ setOpen, doctor, getAllDoctors }: IUpsertDoctorDialogProps) {

    const [loadingSchedules, setLoadingSchedules] = useState<boolean>(false)
    const [schedules, setSchedules] = useState<Schedule[]>([])
    const [loading, setLoading] = useState<boolean>(false)


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

    const postDoctor = (doctor: DoctorDTO) => {

        setLoading(true)

        doctorService.postDoctor(doctor).then(() => {
            toast.success('Médico adicionado com sucesso!')
            getAllDoctors()
            setOpen(false)
        }).catch(err => {
            toast.error(err.message)
        }).finally(() => {
            setLoading(false)
        })
    }

    const putDoctorById = (id: number, doctor: DoctorDTO) => {

        setLoading(true)

        doctorService.putDoctorById(id, doctor).then(() => {
            toast.success(`Médico de ID: #${id} atualizado com sucesso!`)
            getAllDoctors()
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

        const especialidade = String(data.get('especialidade'))
        const nome = String(data.get('nome'))

        const agenda_id = schedules.find((schedule) => `${convertDateToBrazilianTime(schedule.data_agenda)} ${schedule.horario}` === String(data.get('agenda_id')))?.id || 0


        if (doctor) {
            putDoctorById(doctor.id, { especialidade, agenda_id, nome })
        } else {
            postDoctor({ especialidade, agenda_id, nome })
        }
    }

    useEffect(() => {
        getAllSchedules()
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
                        <Grid item>{doctor ? `Atualizar Agenda ID: #${doctor.id}` : `Criar Agenda`}</Grid>
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
                        <Grid item xs={6}>
                            <TextField fullWidth type="text" name="nome" id="nome" label="Nome" required defaultValue={doctor?.nome} InputLabelProps={{ shrink: true }} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField fullWidth type="text" name="especialidade" id="especialidade" label="Especialidade" required defaultValue={doctor?.especialidade} InputLabelProps={{ shrink: true }} />
                        </Grid>
                        <Grid item xs={12}>
                            {loadingSchedules ? <CircularProgressLoading /> :
                                <Autocomplete
                                    disablePortal
                                    id="agenda_id"
                                    options={schedules}
                                    defaultValue={schedules.find((schedule) => schedule.id === doctor?.agenda_id)}
                                    fullWidth
                                    getOptionLabel={(option) => `${convertDateToBrazilianTime(option.data_agenda)} ${option.horario}`}
                                    renderInput={(params) => <TextField {...params} id="agenda_id" fullWidth name="agenda_id" required label="Agenda" />}
                                />}
                        </Grid>
                    </Grid>
                </DialogContent>

                <Divider />
                <Box sx={{ width: "100%" }}>
                    <Stack spacing={2} sx={{ alignItems: "center", justifyContent: 'space-between', margin: '2vh' }} direction="row">
                        <Button variant="contained" component="label" color="error" onClick={() => setOpen(false)} >Fechar</Button>
                        <Button disabled={loading} variant="contained" color="primary" type='submit' >{doctor ? "Atualizar" : "Cadastrar"}</Button>
                    </Stack>
                </Box>
            </Box>
        </Dialog >
    )
}