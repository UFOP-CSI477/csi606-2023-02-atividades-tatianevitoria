import { CalendarMonth, EventNote, Home, MedicalInformation, People } from '@mui/icons-material';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useNavigate } from 'react-router-dom';

interface MyListItemProps {
    icon: JSX.Element
    router: string
    iconText: string
}

function MyListItem({ icon, router, iconText }: MyListItemProps) {

    const navigate = useNavigate()

    const handleSection = () => navigate(router)

    return (
        <ListItem onClick={handleSection} >
            <ListItemButton sx={{ p: 1, borderRadius: 2 }}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={iconText} />
            </ListItemButton>
        </ListItem>
    )
}

export default function DrawerListItem() {

    return (
        <List>
            <MyListItem icon={<Home />} router='/' iconText="Início" />
            <MyListItem icon={<CalendarMonth />} router='/schedules' iconText="Agendas" />
            <MyListItem icon={<EventNote />} router='/queries' iconText="Consultas" />
            <MyListItem icon={<People />} router='/peoples' iconText="Pacientes" />
            <MyListItem icon={<MedicalInformation />} router='/doctors' iconText="Médicos" />
        </List>
    )
}