import DashboardContainer from "../../components/DashboardContainer";
import DoctorContainer from "../../components/DoctorContainer";
import PageTitle from "../../components/PageTitle";

export default function Doctors() {

    return (
        <DashboardContainer>
            <PageTitle title="Médicos" />
            <DoctorContainer />
        </DashboardContainer>
    )
}