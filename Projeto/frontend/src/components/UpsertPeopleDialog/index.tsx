import { useState } from "react"

import { Box, Button, Dialog, DialogContent, DialogTitle, Divider, Grid, IconButton, Stack, TextField } from "@mui/material"
import { peopleService } from "../../services/peopleService"
import { PeopleDTO } from "../../schemas/dtos"
import { People } from "../../schemas/models"
import { Close } from "@mui/icons-material"
import { toast } from "react-toastify"

interface IUpsertPeopleDialogProps {
    people?: People,
    setOpen(state: boolean): void,
    getAllPeoples(): void
}

export default function UpsertPeopleDialog({ setOpen, people, getAllPeoples }: IUpsertPeopleDialogProps) {

    const [loading, setLoading] = useState<boolean>(false)

    const postPeople = (people: PeopleDTO) => {

        setLoading(true)

        peopleService.postPeople(people).then(() => {
            toast.success('Pessoa criada com sucesso!')
            getAllPeoples()
            setOpen(false)
        }).catch(err => {
            toast.error(err.message)
        }).finally(() => {
            setLoading(false)
        })
    }

    const putPeopleById = (id: number, people: PeopleDTO) => {

        setLoading(true)

        peopleService.putPeopleById(id, people).then(() => {
            toast.success(`Paciente de ID: #${id} atualizado com sucesso!`)
            getAllPeoples()
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

        const nome = String(data.get('nome'))
        const cpf = String(data.get('cpf'))

        if (people) {
            putPeopleById(people.id, { nome, cpf })
        } else {
            postPeople({ nome, cpf })
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
                        <Grid item>{people ? `Atualizar Paciente ID: #${people.id}` : `Adicionar Paciente`}</Grid>
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
                            <TextField fullWidth type="string" name="nome" id="nome" label="Nome do Paciente" required defaultValue={people?.nome} InputLabelProps={{ shrink: true }} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField fullWidth type="string" name="cpf" id="cpf" label="CPF" required defaultValue={people?.cpf} InputLabelProps={{ shrink: true }} />
                        </Grid>
                    </Grid>
                </DialogContent>

                <Divider />
                <Box sx={{ width: "100%" }}>
                    <Stack spacing={2} sx={{ alignItems: "center", justifyContent: 'space-between', margin: '2vh' }} direction="row">
                        <Button variant="contained" component="label" color="error" onClick={() => setOpen(false)} >Fechar</Button>
                        <Button disabled={loading} variant="contained" color="primary" type='submit' >{people ? "Atualizar" : "Cadastrar"}</Button>
                    </Stack>
                </Box>
            </Box>
        </Dialog >
    )
}