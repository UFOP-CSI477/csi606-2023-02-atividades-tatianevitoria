import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import ListEstados from "./components/estados/ListEstados";
import CreateEstado from "./components/estados/CreateEstado";
import UpdateEstado from "./components/estados/UpdateEstado";
import CreateCidade from "./components/cidades/CreateCidade";
import ListCidades from "./components/cidades/ListCidades";
import UpdateCidade from "./components/cidades/UpdateCidade";
import CreatePessoa from "./components/pessoas/CreatePessoa";
import ListPessoas from "./components/pessoas/ListPessoas";
import UpdatePessoa from "./components/pessoas/UpdatePessoa";
import CreateLocalColeta from "./components/locais_coleta/CreateLocaisColeta";
import ListLocaisColeta from "./components/locais_coleta/ListLocaisColeta";
import UpdateLocalColeta from "./components/locais_coleta/UpdateLocaisColeta";
import CreateDoacao from "./components/doacoes/CreateDoacao";
import ListDoacoes from "./components/doacoes/ListDoacoes";
import UpdateDoacao from "./components/doacoes/UpdateDoacao";
import CreateTipoSanguineo from "./components/tipo_sanguineo/CreateTipoSanguineo";
import ListTiposSanguineos from "./components/tipo_sanguineo/ListTiposSanguineos";
import UpdateTipoSanguineo from "./components/tipo_sanguineo/UpdateTipoSanguineo";

const AppRoutes = () => {

    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/estados" element={<ListEstados />}/>
                <Route path="/estados/create" element={<CreateEstado />} />
                <Route path="/estados/update/:id" element={<UpdateEstado />} />

                <Route path="/cidades/create" element={<CreateCidade />} />
                <Route path="/cidades" element={<ListCidades />}/>
                <Route path="/cidades/update/:id" element={<UpdateCidade />} />

                <Route path="/pessoas/create" element={<CreatePessoa />} />
                <Route path="/pessoas" element={<ListPessoas />}/>
                <Route path="/pessoas/update/:id" element={<UpdatePessoa />} />

                <Route path="/locais_coleta/create" element={<CreateLocalColeta />} />
                <Route path="/locais_coleta" element={<ListLocaisColeta />}/>
                <Route path="/locais_coleta/update/:id" element={<UpdateLocalColeta />} />

                <Route path="/doacoes/create" element={<CreateDoacao />} />
                <Route path="/doacoes" element={<ListDoacoes />}/>
                <Route path="/doacoes/update/:id" element={<UpdateDoacao />} />

                <Route path="/tipos_sanguineos/create" element={<CreateTipoSanguineo />} />
                <Route path="/tipos_sanguineos" element={<ListTiposSanguineos />}/>
                <Route path="/tipos_sanguineos/update/:id" element={<UpdateTipoSanguineo />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;