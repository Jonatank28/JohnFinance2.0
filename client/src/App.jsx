// Styled components
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import GlobalStyles, { ContainerGlobal } from "./styles/global";

//Pages
import { Home } from "./pages/Home/Home";

// Libs
import Modal from 'react-modal'


Modal.setAppElement("#root");




function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
                <Home/>
        </ThemeProvider>
    )
}

export default App
