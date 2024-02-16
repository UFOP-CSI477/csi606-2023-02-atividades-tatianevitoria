import DashboardContainer from "../../components/DashboardContainer";
import PageTitle from "../../components/PageTitle";
import PeopleContainer from "../../components/PeopleContainer";

export default function Peoples() {

    return (
        <DashboardContainer>
            <PageTitle title="Pacientes" />
            <PeopleContainer />
        </DashboardContainer>
    )
}