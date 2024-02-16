import DashboardContainer from "../../components/DashboardContainer";
import PageTitle from "../../components/PageTitle";
import QueryContainer from "../../components/QueryContainer";

export default function Queries() {

    return (
        <DashboardContainer>
            <PageTitle title="Consultas" />
            <QueryContainer />
        </DashboardContainer>
    )
}