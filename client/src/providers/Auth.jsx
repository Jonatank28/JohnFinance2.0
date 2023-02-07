import { createContext, useState } from "react";

export const AuthContext =  createContext({ });

export const AuthProvider = ( { children} ) => {
    const [data, setData] = useState();
    const [entryTotal, setEntryTotal] = useState(0);
    const [outputTotal, setOutputTotal] = useState(0);
    const [totalGeral, setTotalGeral] = useState(0);

    function formatNumber(n) {
        return n.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true
        });
    }

    const user = {
        name: "Jonatan",
        id: "4"
    }

    
    return (
        <AuthContext.Provider value={{ data, setData, entryTotal, setEntryTotal, outputTotal, setOutputTotal, totalGeral, setTotalGeral, formatNumber, user}}>
            { children }
        </AuthContext.Provider>
    )
}