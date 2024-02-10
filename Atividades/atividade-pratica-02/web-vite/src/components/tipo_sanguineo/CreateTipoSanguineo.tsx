import { useState } from "react"
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const CreateTipoSanguineo = () => {

    const [tipo, setTipo] = useState('');
    const [fator, setFator] = useState('');
    const navigate = useNavigate();

    const handleNewTipoSanguineo = async (event : React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();

        //enviar os dados
        const data = {
            tipo,
            fator
        };

        try{
            await api.post('/tipos_sanguineos', data);
            alert("Tipo Sanguíneo inserido com sucesso");
            navigate('/tipos_sanguineos');
        }catch(error){
            console.error(error);
            alert("Erro na inserção do Tipo Sanguineo!");
        }
    }

    return(
        <div>
            <h3>Cadastro de Tipo Sanguineo</h3>
            <form onSubmit={handleNewTipoSanguineo}>
                <div>
                    <label htmlFor="tipo">Tipo</label>
                    <select
                        name="tipo"
                        id="tipo"
                        value={tipo}
                        onChange={e => setTipo(e.target.value)}
                    >
                    
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="AB">AB</option>
                        <option value="O">O</option>
                            
                    </select>
                </div>

                <div>
                    <label htmlFor="fator">Fator</label>
                    <select
                        name="fator"
                        id="fator"
                        value={fator}
                        onChange={e => setFator(e.target.value)}
                    >
                        <option value="+">+</option>
                        <option value="-">-</option>
                        
                    </select>
                </div>
                <button type="submit">Cadastrar</button>
                <button type="reset">Limpar</button>
            </form>
        </div>
    )
}
export default CreateTipoSanguineo;