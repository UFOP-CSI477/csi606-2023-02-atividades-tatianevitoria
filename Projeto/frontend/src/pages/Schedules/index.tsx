import DashboardContainer from "../../components/DashboardContainer";
import ScheduleContainer from "../../components/ScheduleContainer";
import PageTitle from "../../components/PageTitle";

export default function Schedules() {

    return (
        <DashboardContainer>
            <PageTitle title="Agendas" />
            <ScheduleContainer />
        </DashboardContainer>
    )
}