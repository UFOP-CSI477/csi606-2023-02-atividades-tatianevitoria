import { useState } from "react"

import { Box, Button, Dialog, DialogContent, DialogTitle, Divider, Grid, IconButton, Stack, TextField } from "@mui/material"
import { scheduleService } from "../../services/scheduleService"
import { ScheduleDTO } from "../../schemas/dtos"
import { Schedule } from "../../schemas/models"
import { Close } from "@mui/icons-material"
import { toast } from "react-toastify"
import { formatDateForInput } from "../../utils/formatValues"

interface IUpsertScheduleDialogProps {
    schedule?: Schedule,
    setOpen(state: boolean): void,
    getAllSchedules(): void
}

export default function UpsertScheduleDialog({ setOpen, schedule, getAllSchedules }: IUpsertScheduleDialogProps) {

    const [loading, setLoading] = useState<boolean>(false)

    const postSchedule = (schedule: ScheduleDTO) => {

        setLoading(true)

        scheduleService.postSchedule(schedule).then(() => {
            toast.success('Agenda criada com sucesso!')
            getAllSchedules()
            setOpen(false)
        }).catch(err => {
            toast.error(err.message)
        }).finally(() => {
            setLoading(false)
        })
    }

    const putScheduleById = (id: number, schedule: ScheduleDTO) => {

        setLoading(true)

        scheduleService.putScheduleById(id, schedule).then(() => {
            toast.success(`Agenda de ID: #${id} atualizada com sucesso!`)
            getAllSchedules()
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

        const data_agenda = String(data.get('data_agenda'))
        const horario = String(data.get('horario'))

        if (schedule) {
            putScheduleById(schedule.id, { data_agenda, horario })
        } else {
            postSchedule({ data_agenda, horario })
        }
    }

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
                        <Grid item>{schedule ? `Atualizar Agenda ID: #${schedule.id}` : `Criar Agenda`}</Grid>
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
                            <TextField fullWidth type="date" name="data_agenda" id="data_agenda" label="Data da Agenda" required defaultValue={schedule?.data_agenda && formatDateForInput(schedule.data_agenda)} InputLabelProps={{ shrink: true }} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField fullWidth type="time" name="horario" id="horario" label="Horário" required defaultValue={schedule?.horario} InputLabelProps={{ shrink: true }} />
                        </Grid>
                    </Grid>
                </DialogContent>

                <Divider />
                <Box sx={{ width: "100%" }}>
                    <Stack spacing={2} sx={{ alignItems: "center", justifyContent: 'space-between', margin: '2vh' }} direction="row">
                        <Button variant="contained" component="label" color="error" onClick={() => setOpen(false)} >Fechar</Button>
                        <Button disabled={loading} variant="contained" color="primary" type='submit' >{schedule ? "Atualizar" : "Cadastrar"}</Button>
                    </Stack>
                </Box>
            </Box>
        </Dialog >
    )
}