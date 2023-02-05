// Styled Components
import { Container } from './styleCards';

import { api } from '../../config/api'; 

// Images
import entradas from '../../assets/entradas.svg'
import saidas from '../../assets/saidas.svg'
import total from '../../assets/total.svg'

import { useState, useEffect } from 'react';


export const Cards = () => {
    const [entryTotal, setEntryTotal] = useState();
    const [outputTotal, setOutputTotal] = useState();

    useEffect(() => {
        async function fetchRegister() {
            const response = await api.get("/register")
            setEntryTotal(response.data.reduce((sum, item) => sum + item.entry, 0));
            setOutputTotal(response.data.reduce((sum, item) => sum + item.output, 0));
        }
        fetchRegister();
    }, []);
    return (
        <Container>
            <div>
                <h2>Entradas</h2>
                { entryTotal && <p>R$ {entryTotal}</p>}
                <img src={entradas} alt="Icone entradas" />
            </div>
            <div>
                <h2>Saidas</h2>
                { outputTotal && <p>R$ {outputTotal}</p>}
                <img src={saidas} alt="Icone saidas" />
            </div>
            <div style={{background: entryTotal - outputTotal > 0 ? "green" : "red" }}>
                <h2>Total</h2>
                { entryTotal &&  outputTotal && <p>R$ {entryTotal - outputTotal}</p>}
                <img src={total} alt="Icone total" />
            </div> 

        </Container>
    )
}
