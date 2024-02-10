import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

export interface TipoSanguineoInterface {
    id: number;
    tipo: string;
    fator: string;
    createdAt: string;
    updatedAt: string;
}

const ListTiposSanguineos = () => {

    const [tiposSanguineos, setTiposSanguineos] = useState<TipoSanguineoInterface[]>([]);

    useEffect(() => {
        api.get('/tipos_sanguineos')
            .then(response => {
                setTiposSanguineos(response.data);
            })
    }, []);

    const handleDeleteTipoSanguineo = async (id: number) => {
        //validações
        if (!window.confirm("Confirma exclusão do tipo sanguíneo?")) {
            return;
        }

        try {
            await api.delete(`/tipos_sanguineos/${id}`, {
                data: {
                    id
                }
            });

            alert("Tipo Sanguíneo excluído com sucesso");

            //atualizar
            setTiposSanguineos(tiposSanguineos.filter(tiposSanguineos => tiposSanguineos.id !== id));

        } catch (error) {
            alert("Erro na exclusão do Tipo Sanguíneo!");
            console.error(error);
        }
    }

    return (
        <div>
            <h3>Lista de Tipos Sanguíneos</h3>
            <div>
                <Link to="/tipos_sanguineos/create">Inserir</Link>
            </div>
            <div>
                <Link to="/">Voltar</Link>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tipo</th>
                        <th>Fator RH</th>
                        <th>Criado em</th>
                        <th>Atualizado em</th>
                        <th>Atualizar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tiposSanguineos.map(tipoSanguineo => (
                            <tr>
                                <td>{tipoSanguineo.id}</td>
                                <td>{tipoSanguineo.tipo}</td>
                                <td>{tipoSanguineo.fator}</td>
                                <td>{tipoSanguineo.createdAt}</td>
                                <td>{tipoSanguineo.updatedAt}</td>
                                <td><Link to={`/tipos_sanguineos/update/${tipoSanguineo.id}`}>Atualizar</Link></td>
                                <td><button onClick={() => {handleDeleteTipoSanguineo(tipoSanguineo.id)}}>Excluir</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default ListTiposSanguineos;
