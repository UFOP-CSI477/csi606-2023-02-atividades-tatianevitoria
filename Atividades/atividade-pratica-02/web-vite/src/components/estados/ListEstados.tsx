import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

export interface EstadoInterface{
    id: number;
    nome: string;
    sigla: string;
    createdAt: string;
    updatedAt: string;
}

const ListEstados = () => {

    const[ estados, setEstados ] = useState<EstadoInterface[]>([]);

    useEffect(() => {
        api.get('/estados')
        .then(response => {
            setEstados(response.data);
        })
    },[]);

    const handleDeleteEstado = async (id : number)=> {
        //validações
        if(!window.confirm("Confirma exclusão do estado?")){
            return;
        }

        try{
            await api.delete(`/estados/${id}`, {
                data: {
                    id
                }
            });

            alert("Estado excluído com sucesso");
        
            //atualizar
            setEstados(estados.filter(estado=> estado.id != id));
        
        }catch(error){
            alert("Erro na exclusão do Estado!");
            console.error(error);
        }
    }

    return(
        <div>
            <h3>Lista de estados</h3>
            <div>
            <Link to="/estados/create">Inserir</Link>
            </div>
            <div>
            <Link to="/">Voltar</Link>
            </div>
            
            <table>

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Sigla</th>
                        <th>Criado em</th>
                        <th>Atualizado em</th>
                        <th>Atualizar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>
                <tbody>
                {
                    estados.map(estado => (
                        <tr>
                        <td>{estado.id}</td>
                        <td>{estado.nome}</td>
                        <td>{estado.sigla}</td>
                        <td>{estado.createdAt}</td>
                        <td>{estado.updatedAt}</td>
                        <td><Link to={`/estados/update/${estado.id}`}> Atualizar</Link></td>
                        <td><button onClick={() =>{handleDeleteEstado(estado.id)}}>Excluir</button></td> 
                         
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
}

export default ListEstados;