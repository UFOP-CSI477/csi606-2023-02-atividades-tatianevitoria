import { Box, Button, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import Paciente from '../../images/paciente.avif'
import Medico from '../../images/medico.jpg'
import Consulta from '../../images/consulta.jpg'
import Agenda from '../../images/agenda.png'

interface Card {
    title: string,
    image: string,
    description: string,
    url: string
}

const cards: Card[] = [
    {
        title: "Consultas",
        image: Consulta,
        description: "Agende e gerencie consultas para os pacientes.",
        url: "/queries"
    },
    {
        title: "Agendas",
        image: Agenda,
        description: "Visualize e gerencie as agendas dos médicos e outros profissionais de saúde.",
        url: "/schedules"
    },
    {
        title: "Médicos",
        image: Medico,
        description: "Acesse informações sobre os médicos da clínica e agende consultas.",
        url: "/doctors"
    },
    {
        title: "Pacientes",
        image: Paciente,
        description: "Acesse e atualize informações dos pacientes atendidos na clínica.",
        url: "/peoples"
    }
];


export default function HomeContainer() {

    const navigate = useNavigate()

    const handleNavigate = (url: string) => {
        navigate(url)
    }

    return (
        <Grid container spacing={3} mt={2}>
            {cards.map((card, index) => (
                <Grid item xs={6} key={index} >
                    <Card sx={{ height: '100%' }} >
                        <CardMedia
                            component="img"
                            height="180"
                            image={card.image}
                            alt={card.title}
                        />
                        <CardContent>
                            <Typography variant="h6" component="div">
                                {card.title}
                            </Typography>
                            <Box mt={1} display='flex' justifyContent='space-between' alignItems='center'>
                                <Typography variant="body2" color="text.secondary" width='80%'>
                                    {card.description}
                                </Typography>
                                <Button variant="contained" color="secondary" size="small" onClick={() => handleNavigate(card.url)}>
                                    Navegar
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
}