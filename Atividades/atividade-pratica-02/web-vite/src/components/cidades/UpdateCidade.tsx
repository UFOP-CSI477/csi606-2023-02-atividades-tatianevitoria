import { useEffect, useState } from "react"
import api from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { EstadoInterface } from "../estados/ListEstados";

const UpdateCidade = () => {

    const [nome, setNome] = useState('');
    const [estadoId, setEstadoId] = useState(0);
    const [estados, setEstados] = useState<EstadoInterface[]>
    ([]);

    const { id } = useParams();

    useEffect(() => {
        api.get('/estados')
        .then(response => {
            setEstados(response.data);
        })
    },[]);

    useEffect(() => {

        api.get(`/cidades/${id}`)
            .then(response => {
                setNome(response.data.nome);
                setEstadoId(response.data.estado_id);
            });
    }, [id])

    const navigate = useNavigate();

    const handleUpdateCidade = async (event : React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();

    
        //validações

        //enviar os dados
        const data = {
            id: parseInt(String(id)),
            nome,
            estado_id: estadoId
        };

        try{
            await api.put(`/cidades/${id}`, data);
            alert("Cidade atualizada com sucesso");
            navigate('/cidades');
        }catch(error){
            console.error(error);
            alert("Erro na atualização da Cidade!");
        }
    }

    return(
        <div>
            <h3>Atualização de Cidade</h3>
            <form onSubmit={handleUpdateCidade}>
                <div>
                    <label htmlFor="nome">Nome</label>
                    <input
                        type="text"
                        name="nome"
                        id="nome"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="estadoId">Estado</label>
                    <select 
                        name="estadoId" 
                        id="estadoId"
                        value={estadoId}
                        onChange={e => setEstadoId(parseInt(e.target.value))}
                    >
                        <option value ="0 selected">Selecione:</option>
                        {
                            estados.map(estado => (
                                <option value={estado.id}>{estado.nome}</option>
                            ))
                            
                        }
                    </select>
                </div>
                <button type="submit">Atualizar</button>
                <button type="reset">Limpar</button>
            </form>
        </div>
    )
}
export default UpdateCidade;