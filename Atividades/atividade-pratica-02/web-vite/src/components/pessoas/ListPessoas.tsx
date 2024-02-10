import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import { CidadeInterface } from "../cidades/ListCidades";
import { TipoSanguineoInterface } from "../tipo_sanguineo/ListTiposSanguineos";

export interface PessoaInterface {
    id: number;
    nome: string;
    rua: string;
    numero: number;
    complemento: string;
    rg: string;
    cidade_id: number;
    tipo_id: number;
    createdAt: string;
    updatedAt: string;
}

const ListPessoas = () => {

    const [pessoas, setPessoas] = useState<PessoaInterface[]>([]);
    const [cidades, setCidades] = useState<CidadeInterface[]>([]);
    const [tipos_sanguineos, setTiposSanguineos] = useState<TipoSanguineoInterface[]>([]);


    useEffect(() => {
        api.get('/pessoas')
            .then(response => {
                setPessoas(response.data);
            })
    }, []);

    useEffect(() => {
        api.get('/cidades')
            .then(response => {
                setCidades(response.data);
            })
    }, []);

    useEffect(() => {
        api.get('/tipos_sanguineos')
            .then(response => {
                setTiposSanguineos(response.data);
            })
    }, []);

    const handleDeletePessoa = async (id: number) => {
        //validações
        if (!window.confirm("Confirma exclusão da pessoa?")) {
            return;
        }

        try {
            await api.delete(`/pessoas/${id}`, {
                data: {
                    id
                }
            });

            alert("Pessoa excluída com sucesso");

            //atualizar
            setPessoas(pessoas.filter(pessoa => pessoa.id !== id));

        } catch (error) {
            alert("Erro na exclusão da Pessoa!");
            console.error(error);
        }
    }

    return (
        <div>
            <h3>Lista de pessoas</h3>
            <div>
                <Link to="/pessoas/create">Inserir</Link>
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
                        <th>RG</th>
                        <th>Tipo Sanguíneo</th>
                        <th>Criado em</th>
                        <th>Atualizado em</th>
                        <th>Atualizar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        pessoas.map(pessoa => (
                            <tr>
                                <td>{pessoa.id}</td>
                                <td>{pessoa.nome}</td>
                                <td>{pessoa.rua} - {pessoa.numero} - {pessoa.complemento}</td>
                                <td>{cidades.find(cidade => cidade.id === pessoa.cidade_id)?.nome || 'Sem cidade associada'}</td>
                                <td>{pessoa.rg}</td>
                                <td>{tipos_sanguineos.find(tipo => tipo.id === pessoa.tipo_id)?.tipo || 'Sem tipo sanguíneo associado'}{tipos_sanguineos.find(tipo => tipo.id === pessoa.tipo_id)?.fator || 'Sem fator associado'}</td>
                                <td>{pessoa.createdAt}</td>
                                <td>{pessoa.updatedAt}</td>
                                <td><Link to={`/pessoas/update/${pessoa.id}`}> Atualizar</Link></td>
                                <td><button onClick={() => { handleDeletePessoa(pessoa.id) }}>Excluir</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default ListPessoas;
