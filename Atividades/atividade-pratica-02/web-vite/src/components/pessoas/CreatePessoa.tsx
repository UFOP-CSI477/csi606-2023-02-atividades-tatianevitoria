import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { CidadeInterface } from "../cidades/ListCidades";
import { TipoSanguineoInterface } from "../tipo_sanguineo/ListTiposSanguineos";

const CreatePessoa = () => {

    const [nome, setNome] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState(0);
    const [complemento, setComplemento] = useState('');
    const [rg, setRg] = useState('');
    const [cidadeId, setCidadeId] = useState(0);
    const [tipoId, setTipoId] = useState(0);
    const [tipos, setTipos] = useState<TipoSanguineoInterface[]>([]);
    const [cidades, setCidades] = useState<CidadeInterface[]>([]);

    useEffect(() => {
        api.get('/cidades')
            .then(response => {
                setCidades(response.data);
            })
    }, []);

    useEffect(() => {
        api.get('/tipos_sanguineos')
            .then(response => {
                setTipos(response.data);
            })
    }, []);

    const navigate = useNavigate();

    const handleNewPessoa = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();


        //validações

        //enviar os dados
        const data = {
            nome,
            rua,
            numero,
            complemento,
            rg,
            cidade_id: cidadeId,
            tipo_id: tipoId
        };

        try {
            await api.post('/pessoas', data);
            alert("Pessoa inserida com sucesso");
            navigate('/pessoas');
        } catch (error) {
            console.error(error);
            alert("Erro na inserção da Pessoa!");
        }
    }

    return (
        <div>
            <h3>Cadastro de Pessoa</h3>
            <form onSubmit={handleNewPessoa}>
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
                    <label htmlFor="rua">Rua</label>
                    <input
                        type="text"
                        name="rua"
                        id="rua"
                        value={rua}
                        onChange={e => setRua(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="numero">Número</label>
                    <input
                        type="text"
                        name="numero"
                        id="numero"
                        value={numero}
                        onChange={e => setNumero(parseInt(e.target.value))}
                    />
                </div>

                <div>
                    <label htmlFor="complemento">Complemento</label>
                    <input
                        type="text"
                        name="complemento"
                        id="complemento"
                        value={complemento}
                        onChange={e => setComplemento(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="rg">RG</label>
                    <input
                        type="text"
                        name="rg"
                        id="rg"
                        value={rg}
                        onChange={e => setRg(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="cidadeId">Cidade</label>
                    <select
                        name="cidadeId"
                        id="cidadeId"
                        onChange={e => setCidadeId(parseInt(e.target.value))}
                    >
                        <option value="0">Selecione:</option>
                        {
                            cidades.map(cidade => (
                                <option key={cidade.id} value={cidade.id}>{cidade.nome}</option>
                            ))

                        }
                    </select>
                </div>

                <div>
                    <label htmlFor="tipoId">Tipo Sanguíneo</label>
                    <select
                        name="tipoId"
                        id="tipoId"
                        onChange={e => setTipoId(parseInt(e.target.value))}
                    >
                        <option value="0">Selecione:</option>
                        {
                            tipos.map(tipo => (
                                <option key={tipo.id} value={tipo.id}>{`${tipo.tipo} (${tipo.fator})`}</option>
                            ))
                        }
                    
                    </select>
                </div>
                <button type="submit">Cadastrar</button>
                <button type="reset">Limpar</button>
            </form>
        </div>
    )
}

export default CreatePessoa;
