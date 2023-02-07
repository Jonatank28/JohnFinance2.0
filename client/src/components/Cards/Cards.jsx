// Styled Components
import { Container } from './styleCards';

// Images
import entradas from '../../assets/entradas.svg'
import saidas from '../../assets/saidas.svg'
import total from '../../assets/total.svg'

import { useContext } from 'react';
import { AuthContext } from '../../providers/Auth'


export const Cards = () => {
    const { entryTotal, outputTotal, totalGeral, formatNumber} = useContext(AuthContext);

    return (
        <Container>
            <div>
                <h2>Entradas</h2>
                <p>R$ {formatNumber(entryTotal)}</p>
                <img src={entradas} alt="Icone entradas" />
            </div>
            <div>
                <h2>Saidas</h2>
                <p>R$ {formatNumber(outputTotal)}</p>
                <img src={saidas} alt="Icone saidas" />
            </div>
            <div style={{background: totalGeral >= 0 ? "green" : "red"}}>
                <h2>Total</h2>
                <p>R$ {formatNumber(totalGeral)}</p>
                <img src={total} alt="Icone total" />
            </div> 

        </Container>
    )
}
