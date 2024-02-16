import { useEffect, useState } from "react";

import LinearProgressLoading from "../LinearProgressLoading";
import UpsertPeopleDialog from "../UpsertPeopleDialog";
import TableContainer from "../TableContainer";

import { peopleService } from "../../services/peopleService";
import { formatDocument } from "../../utils/formatValues";
import { Add, Delete, Edit } from "@mui/icons-material";
import { Box, Button, IconButton } from "@mui/material";
import { People } from "../../schemas/models";
import { GridColDef } from "@mui/x-data-grid";
import { toast } from "react-toastify";


export default function PeopleContainer() {

    const [openUpsertPeopleDialog, setOpenUpsertPeopleDialog] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [editPeople, setEditPeople] = useState<People>()
    const [peoples, setPeoples] = useState<People[]>([])

    const getAllPeoples = () => {

        setLoading(true)

        peopleService.getAllPeoples().then(res => {
            setPeoples(res.data)
            toast.success(`Pacientes carregadas com sucesso.`)
        }).catch(err => {
            toast.error(err.message)
        }).finally(() => {
            setLoading(false)
        })
    }

    const handleEditPeople = (people: People) => {
        setEditPeople(people)
        setOpenUpsertPeopleDialog(true)
    }

    const handleDeletePeople = (people: People) => {

        setLoading(true)

        peopleService.deletePeopleById(people.id).then(() => {
            toast.success(`Paciente de ID: #${people.id} deletada com sucesso.`)
            getAllPeoples()
        }).catch(err => {
            toast.error(err.message)
        }).finally(() => {
            setLoading(false)
        })
    }

    const handleCreatePeople = () => {
        setEditPeople(undefined)
        setOpenUpsertPeopleDialog(true)
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 100, editable: false, align: "center", headerAlign: 'center' },
        { field: 'nome', headerName: 'Nome', width: 500, editable: false, align: "center", headerAlign: 'center' },
        { field: 'cpf', headerName: 'CPF', width: 300, editable: false, align: "center", headerAlign: 'center', valueGetter: (params) => formatDocument(params.row.cpf) },
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
                        onClick={() => handleEditPeople(params.row)}
                    >
                        <Edit />
                    </IconButton>
                    <IconButton
                        color="error"
                        size="small"
                        onClick={() => handleDeletePeople(params.row)}
                    >
                        <Delete />
                    </IconButton>
                </Box>
            ),
        },
    ];

    useEffect(() => {
        getAllPeoples()
    }, [])

    return (
        <Box display='flex' justifyContent='center' flexDirection='column' alignItems='flex-start' width='100%' mt={3}>
            <Button color="secondary" variant="contained" endIcon={<Add />} sx={{ mb: 2 }} onClick={handleCreatePeople} >
                Novo
            </Button>
            {openUpsertPeopleDialog && <UpsertPeopleDialog getAllPeoples={getAllPeoples} setOpen={setOpenUpsertPeopleDialog} people={editPeople} />}
            {loading && <LinearProgressLoading />}
            <TableContainer columns={columns} rows={peoples} />
        </Box>
    )
}