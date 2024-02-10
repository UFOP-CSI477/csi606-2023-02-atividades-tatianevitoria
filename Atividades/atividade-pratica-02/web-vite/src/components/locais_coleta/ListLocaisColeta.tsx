import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import { CidadeInterface } from "../cidades/ListCidades";

export interface LocalColetaInterface {
    id: number;
    nome: string;
    rua: string;
    numero: number;
    complemento: string;
    cidade_id: number;
    createdAt: string;
    updatedAt: string;
}

const ListLocaisColeta = () => {

    const [locaisColeta, setLocaisColeta] = useState<LocalColetaInterface[]>([]);
    const [cidades, setCidades] = useState<CidadeInterface[]>([]);

    useEffect(() => {
        api.get('/locais_coleta')
            .then(response => {
                setLocaisColeta(response.data);
            })
    }, []);

    useEffect(() => {
        api.get('/cidades')
            .then(response => {
                setCidades(response.data);
            })
    }, []);

    const handleDeleteLocalColeta = async (id: number) => {
        //validações
        if (!window.confirm("Confirma exclusão do local de coleta?")) {
            return;
        }

        try {
            await api.delete(`/locais_coleta/${id}`, {
                data: {
                    id
                }
            });

            alert("Local de coleta excluído com sucesso");

            //atualizar
            setLocaisColeta(locaisColeta.filter(localColeta => localColeta.id !== id));

        } catch (error) {
            alert("Erro na exclusão do Local de Coleta!");
            console.error(error);
        }
    }

    return (
        <div>
            <h3>Lista de Locais de Coleta</h3>
            <div>
                <Link to="/locais_coleta/create">Inserir</Link>
            </div>
            <div>
                <Link to="/">Voltar</Link>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Endereço</th>
                        <th>Cidade</th>
                        <th>Criado em</th>
                        <th>Atualizado em</th>
                        <th>Atualizar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    {locaisColeta.map(localColeta => (
                        <tr>
                            <td>{localColeta.id}</td>
                            <td>{localColeta.nome}</td>
                            <td>{localColeta.rua} - {localColeta.numero} - {localColeta.complemento}</td>
                            <td>{cidades.find(cidade => cidade.id === localColeta.cidade_id)?.nome || 'Sem estado associado'}</td>
                            <td>{localColeta.createdAt}</td>
                            <td>{localColeta.updatedAt}</td>
                            <td><Link to={`/locais_coleta/update/${localColeta.id}`}>Atualizar</Link></td>
                            <td><button onClick={() => handleDeleteLocalColeta(localColeta.id)}>Excluir</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListLocaisColeta;
