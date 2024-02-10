import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import { PessoaInterface } from "../pessoas/ListPessoas";
import { LocalColetaInterface } from "../locais_coleta/ListLocaisColeta";

export interface DoacaoInterface {
    id: number;
    pessoa_id: number;
    local_id: number;
    data: string;
    createdAt: string;
    updatedAt: string;
}

const ListDoacoes = () => {

    const [doacoes, setDoacoes] = useState<DoacaoInterface[]>([]);
    const [pessoas, setPessoas] = useState<PessoaInterface[]>([]);
    const [locais, setLocais] = useState<LocalColetaInterface[]>([]);

    useEffect(() => {
        api.get('/doacoes')
            .then(response => {
                setDoacoes(response.data);
            })
    }, []);

    useEffect(() => {
        api.get('/pessoas')
            .then(response => {
                setPessoas(response.data);
            })
    }, []);

    useEffect(() => {
        api.get('/locais_coleta')
            .then(response => {
                setLocais(response.data);
            })
    }, []);

    const handleDeleteDoacao = async (id: number) => {
        //validações
        if (!window.confirm("Confirma exclusão da doação?")) {
            return;
        }

        try {
            await api.delete(`/doacoes/${id}`, {
                data: {
                    id
                }
            });

            alert("Doação excluída com sucesso");

            //atualizar
            setDoacoes(doacoes.filter(doacao => doacao.id !== id));

        } catch (error) {
            alert("Erro na exclusão da Doação!");
            console.error(error);
        }
    }

    return (
        <div>
            <h3>Lista de Doações</h3>
            <div>
                <Link to="/doacoes/create">Inserir</Link>
            </div>
            <div>
                <Link to="/">Voltar</Link>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Data</th>
                        <th>Pessoa</th>
                        <th>Local</th>
                        <th>Criado em</th>
                        <th>Atualizado em</th>
                        <th>Atualizar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    {doacoes.map(doacao => (
                        <tr>
                            <td>{doacao.id}</td>
                            <td>{doacao.data}</td>
                            <td>{pessoas.find(pessoa => pessoa.id === doacao.pessoa_id)?.nome || 'Sem pessoa associada'}</td>
                            <td>{locais.find(local => local.id === doacao.local_id)?.nome || 'Sem local associado'}</td>
                            <td>{doacao.createdAt}</td>
                            <td>{doacao.updatedAt}</td>
                            <td><Link to={`/doacoes/update/${doacao.id}`}>Atualizar</Link></td>
                            <td><button onClick={() => handleDeleteDoacao(doacao.id)}>Excluir</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListDoacoes;
