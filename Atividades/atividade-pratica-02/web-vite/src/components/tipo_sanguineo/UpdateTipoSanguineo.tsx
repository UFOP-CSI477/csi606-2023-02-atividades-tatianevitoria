import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";

const UpdateTipoSanguineo = () => {
    const [tipo, setTipo] = useState('');
    const [fator, setFator] = useState('');

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        api.get(`/tipos_sanguineos/${id}`)
            .then(response => {
                setTipo(response.data.tipo);
                setFator(response.data.fator);
            });
    }, [id]);

    const handleUpdateTipoSanguineo = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = {
            id: parseInt(String(id)),
            tipo,
            fator
        };

        try{
            await api.put(`/tipos_sanguineos/${id}`, data);
            alert("Tipo Sanguíneo atualizado com sucesso");
            navigate('/tipos_sanguineos');
        }catch(error){
            console.error(error);
            alert("Erro na atualização do Tipo Sanguíneo!");
        }
    }

    return(
        <div>
            <h3>Atualização de Tipo Sanguíneo</h3>
            <form onSubmit={handleUpdateTipoSanguineo}>

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
                
                <button type="submit">Atualizar</button>
                <button type="reset">Limpar</button>
            </form>
        </div>
    );
}

export default UpdateTipoSanguineo;
