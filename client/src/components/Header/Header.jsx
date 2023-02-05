// Styled Components
import { Container } from './styleHeader';

import sifrao from '../../assets/sifrao.svg';

export const Header = () => {
    return (
        <Container>
            <div>
                <h1>John Finance</h1>
                <img src={sifrao} alt="" />
            </div>
        </Container>
    )
}
