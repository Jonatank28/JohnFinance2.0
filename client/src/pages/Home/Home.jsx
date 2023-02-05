// Styled Components
import { ContainerGlobal } from "../../styles/global";
import { Container } from './styleHome';

// Components
import { Header } from '../../components/Header/Header';
import { Cards } from "../../components/Cards/Cards";
import { Table } from "../../components/Table/Table";


export const Home = () => {
    return (
        <Container>
            <Header />  
            <ContainerGlobal>
                <Cards />
                <Table />
            </ContainerGlobal>
        </Container>
    )
};