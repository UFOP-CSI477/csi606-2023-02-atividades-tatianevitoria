import { useState, useEffect } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { PessoaInterface } from "../pessoas/ListPessoas";
import { LocalColetaInterface } from "../locais_coleta/ListLocaisColeta";

const CreateDoacao = () => {
    const [pessoaId, setPessoaId] = useState(0);
    const [pessoas, setPessoas] = useState<PessoaInterface[]>
    ([]);
    const [localId, setLocalId] = useState(0);
    const [locais, setLocais] = useState<LocalColetaInterface[]>
    ([]);
    const [data, setData] = useState('');
    
    useEffect(() => {
        api.get('/pessoas')
        .then(response => {
            setPessoas(response.data);
        })
    },[]);

    useEffect(() => {
        api.get('/locais_coleta')
        .then(response => {
            setLocais(response.data);
        })
    },[]);


    const navigate = useNavigate();

    const handleNewDoacao = async (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();

        const Data = {
            pessoa_id:pessoaId,
            local_id: localId,
            data
        };

        try{
            await api.post('/doacoes', Data);
            alert("Doação inserida com sucesso");
            navigate('/doacoes');
        }catch(error){
            console.error(error);
            alert("Erro na inserção da Doação!");
        }
    }

    return(
        <div>
            <h3>Cadastro de Doação</h3>
            <form onSubmit={handleNewDoacao}>
                <div>
                    <label htmlFor="pessoaId">Pessoa</label>
                    <select 
                        name="pessoaId" 
                        id="pessoaId"
                        value={pessoaId}
                        onChange={e => setPessoaId(parseInt(e.target.value))}
                    >
                        <option value ="0 selected">Selecione:</option>
                        {
                            pessoas.map(pessoa => (
                                <option value={pessoa.id}>{pessoa.nome}</option>
                            ))
                            
                        }
                    </select>
                </div>

                <div>
                    <label htmlFor="localId">Local Coleta</label>
                    <select 
                        name="localId" 
                        id="localId"
                        value={localId}
                        onChange={e => setLocalId(parseInt(e.target.value))}
                    >
                        <option value ="0 selected">Selecione:</option>
                        {
                            locais.map(local => (
                                <option value={local.id}>{local.nome}</option>
                            ))
                            
                        }
                    </select>
                </div>
                
                <div>
                    <label htmlFor="data">Data</label>
                    <input
                        type="date"
                        name="data"
                        id="data"
                        value={data}
                        onChange={e => setData(e.target.value)}
                    />
                </div>
               
                
                <button type="submit">Cadastrar</button>
                <button type="reset">Limpar</button>
            </form>
        </div>
    );
}

export default CreateDoacao;
