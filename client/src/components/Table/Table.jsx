// Styled Components
import { Container } from './styleTable';

// Photos
import menos from '../../assets/menos.svg';
import novaTransacao from '../../assets/novaTransacao.svg';

// Libs
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Modal from 'react-modal'
import { useState, useEffect } from "react";
import { FcEditImage} from 'react-icons/fc';

// CSS
import "./style.css";

// Conection server
import { api } from '../../config/api';


export const Table = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState("");

    function handleOpenModal() {
        setIsOpen(true);
    }

    function handleCloseModal() {
        setIsOpen(false);
    }

    async function handleTransationRegister(values) {
        await api.post("/register/4", values)
            .then(() => {
                console.log("deu certo");
            })
            .catch(err => console.log("error"));
        handleCloseModal();
        console.log(values)
    };

    async function handleTransationDelete(registerID) {
        await api.delete(`/register/${registerID}`)
            .then((response) => alert(response.data.message))
            .catch((err) => console.log(err));
    }

    function formatNumber(n) {
        return n.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true
        });
    }

    var dataAtaul;
    function DateCurrent() {
        let data2 = new Date();
        let dia = String(data2.getDate()).padStart(2, '0');
        let mes = String(data2.getMonth() + 1).padStart(2, '0');
        let ano = data2.getFullYear();
        return dataAtaul = ano + '-' + mes + '-' + dia;
    }

    const SignupSchema = Yup.object().shape({
        description: Yup.string().required('Campo obrigatório'),
        entry: Yup.number().required('Campo obrigatório'),
        output: Yup.number().required('Campo obrigatório'),
        date: Yup.date().required('Campo obrigatório'),
    });

    useEffect(() => {
        async function fetchRegister() {
            const response = await api.get("/register")
            setData(response.data)
            // setEntryTotal(response.data.reduce((sum, item) => sum + item.entry, 0));
            // setOutputTotal(response.data.reduce((sum, item) => sum + item.output, 0));
        }
        fetchRegister();
    }, [handleTransationRegister, handleTransationDelete]);

    // console.log("Componente Table =>", data);

    return (
        <>
            <Container>
                <div onClick={handleOpenModal}>
                    <img src={novaTransacao} alt="Menos" />
                    <span>Nova Transação</span>
                </div>
                {data &&
                    <table>
                        <thead>
                            <tr>
                                <th>Descrição</th>
                                <th>Entrada</th>
                                <th>Saida</th>
                                <th>Data</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((row) => (
                                    <tr key={row.registerID}>
                                        <td>{row.description}</td>
                                        <td style={{ color: row.entry > 0 ? "green" : "#969CB2" }}>R$ {formatNumber(row.entry)}</td>
                                        <td style={{ color: row.output > 0 ? "red" : "#969CB2" }}>R$ {formatNumber(row.output)}</td>
                                        <td>{row.dataFormatada}</td>
                                        <td style={{fontSize: "35px"}}><FcEditImage /></td>
                                        <td onClick={() => handleTransationDelete(row.registerID)}><img src={menos} alt="Icone de deletar linha" /></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                }
            </Container>
            <Modal
                isOpen={isOpen}
                onRequestClose={handleCloseModal}
                style={{
                    content: {
                        position: 'absolute',
                        width: "min(450px, 90vw)",
                        height: "40vh",
                        margin: "auto auto",
                        inset: "0px",
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        alignItems: "center",
                        opacity: '2',
                        background: "#F0F2F5",
                        border: "none",
                        overflow: "hidden",
                    },
                    overlay: {
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.6)'
                    }
                }
                }
            >
                <Formik
                    initialValues={{
                        description: '',
                        entry: '',
                        output: '0',
                        date: DateCurrent(),
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={(values, actions) => {
                        handleTransationRegister(values);
                        actions.setSubmitting(false);
                    }}
                >
                    <Form className='form'>
                        <div>
                            <h3>Nova Transação</h3>
                            <Field
                                name="description"
                                type="text"
                                placeholder="Descrição"
                            />
                            <span><ErrorMessage name='description'/></span>
                            <Field
                                name="entry"
                                type="number"
                                placeholder="Entrada"
                            />
                            <span> <ErrorMessage name='entry'/></span>
                            <Field
                                name="output"
                                type="number"
                                placeholder="Saida"
                            />
                            <span><ErrorMessage name='output'/></span>
                            <Field
                                name="date"
                                type="date"
                                placeholder="Data"
                            />
                            <span><ErrorMessage name='date'/></span>
                        </div>
                        <div>
                            <button onClick={handleCloseModal}>Cancelar</button>
                            <button type="submit" >Salvar</button>
                        </div>
                    </Form>
                </Formik>
            </Modal>
        </>
    )
}

