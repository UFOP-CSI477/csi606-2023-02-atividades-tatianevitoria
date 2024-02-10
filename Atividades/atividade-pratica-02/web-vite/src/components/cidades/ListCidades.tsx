import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import { EstadoInterface } from "../estados/ListEstados";

export interface CidadeInterface{
    id: number;
    nome: string;
    estado_id: number;
    createdAt: string;
    updatedAt: string;
}

const ListCidades = () => {

    const[ cidades, setCidades ] = useState<CidadeInterface[]>([]);
    const [estados, setEstados] = useState<EstadoInterface[]>
    ([]);

    useEffect(() => {
        api.get('/cidades')
            .then(response => {
                setCidades(response.data);
            })
    }, []);
    
    useEffect(() => {
        api.get('/estados')
            .then(response => {
                setEstados(response.data);
            })
    }, []);



    const handleDeletecidade = async (id : number)=> {
        //validações
        if(!window.confirm("Confirma exclusão da cidade?")){
            return;
        }

        try{
            await api.delete(`/cidades/${id}`, {
                data: {
                    id
                }
            });

            alert("Cidade excluída com sucesso");
        
            //atualizar
            setCidades(cidades.filter(cidade=> cidade.id != id));
        
        }catch(error){
            alert("Erro na exclusão da Cidade!");
            console.error(error);
        }
    }

    return(
        <div>
            <h3>Lista de cidades</h3>
            <div>
            <Link to="/cidades/create">Inserir</Link>
            </div>
            <div>
            <Link to="/">Voltar</Link>
            </div>
            
            <table>

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Estado</th>
                        <th>Criado em</th>
                        <th>Atualizado em</th>
                        <th>Atualizar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>
                <tbody>
                {
                    cidades.map(cidade => (
                        <tr>
                        <td>{cidade.id}</td>
                        <td>{cidade.nome}</td>
                        <td>{estados.find(estado => estado.id === cidade.estado_id)?.nome || 'Sem estado associado'}</td>
                        <td>{cidade.createdAt}</td>
                        <td>{cidade.updatedAt}</td>
                        <td><Link to={`/cidades/update/${cidade.id}`}> Atualizar</Link></td>
                        <td><button onClick={() =>{handleDeletecidade(cidade.id)}}>Excluir</button></td> 
                         
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
}

export default ListCidades;