import { Link } from "react-router-dom";

const Menu = () =>{
    return(
        <div>
            <h2>Aplicação Doação de Sangue</h2>
            <ul>
                <li><Link to = "/">HOME</Link></li>
                <li><Link to = "/estados">ESTADOS</Link></li>
                <li><Link to = "/cidades">CIDADES</Link></li>
                <li><Link to = "/pessoas">PESSOAS</Link></li>
                <li><Link to = "/doacoes">DOAÇÕES</Link></li>
                <li><Link to = "/tipos_sanguineos">TIPOS SANGUINEOS</Link></li>
                <li><Link to = "/locais_coleta">LOCAIS DE COLETA</Link></li>

            </ul>
        </div>
    );
}

export default Menu