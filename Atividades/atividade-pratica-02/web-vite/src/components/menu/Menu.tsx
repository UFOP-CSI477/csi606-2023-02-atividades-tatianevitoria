import { Link } from "react-router-dom";

const Menu = () =>{
    return(
        <div>
            <h2>Aplicação Doação de Sangue</h2>
            <ul>
                <li><Link to = "/">HOME</Link></li>
                <li><Link to = "/estados">ESTADOS</Link></li>
                <li>CIDADES</li>
                <li>PESSOAS</li>
                <li>DOAÇÕES</li>
            </ul>
        </div>
    );
}

export default Menu