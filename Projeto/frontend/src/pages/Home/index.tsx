import DashboardContainer from "../../components/DashboardContainer";
import HomeContainer from "../../components/HomeContainer";
import PageTitle from "../../components/PageTitle";

export default function Home() {

    return (
        <DashboardContainer>
            <PageTitle title="Início" />
            <HomeContainer />
        </DashboardContainer>
    )
}