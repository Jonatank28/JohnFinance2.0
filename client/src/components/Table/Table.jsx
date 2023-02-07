// Styled Components
import { Container } from './styleTable';

// Photos
import menos from '../../assets/menos.svg';
import novaTransacao from '../../assets/novaTransacao.svg';

// Libs
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Modal from 'react-modal'
import { useState, useEffect, useContext } from "react";
import { FcEditImage} from 'react-icons/fc';

// CSS
import "./style.css";

// Conection server
import { api } from '../../config/api';

import { AuthContext } from '../../providers/Auth';

import { format } from 'date-fns';


export const Table = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [isOpenUpdate, setIsOpenUpdate] = useState(false);
    const [cod, setCode] = useState();
    const [update, setUpdate] = useState([
        {
            description: '',
            entry: "",
            output: "",
            date: "2022-07-28"
        }
    ]);
    const [descriptionUpdate, setDescriptionUpdate] = useState(update[0].description);
    const [entryUpdate, setEntryUpdate] = useState();
    const [outputUpdate, setOutputUpdate] = useState();
    const [dataUpdate, setDataUpdate] = useState();


    const formattedDate = format(new Date(update[0].date), 'yyyy-MM-dd');


    const { data, setData, setEntryTotal, setOutputTotal, setTotalGeral, formatNumber, user } = useContext(AuthContext);

    function handleOpenModal() {
        setIsOpen(true)
    }

    function handleCloseModal() {
        setIsOpen(false);
    }
    function handleOpenModalDelete(registerID) {
        setIsOpenDelete(true)
        setCode(registerID)
    }

    function handleCloseModalDelete() {
        setIsOpenDelete(false);
        
    }

    async function handleTransationRegister(values) {
        await api.post(`/register/${user.id}`, values)
            .then(() => {
                console.log("deu certo");
            })
            .catch(err => console.log("error"));
        handleCloseModal();
    };

    async function handleTransationDelete(registerID) {
        await api.delete(`/register/${registerID}`)
            .catch((err) => console.log(err));
            handleCloseModalDelete();
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

    const SignupSchema2 = Yup.object().shape({
        
    });

    useEffect(() => {
        async function fetchRegister() {
            const response = await api.get("/register")
            setData(response.data)
            setEntryTotal(response.data.reduce((sum, item) => sum + item.entry, 0));
            setOutputTotal(response.data.reduce((sum, item) => sum + item.output, 0));
            setTotalGeral(response.data.reduce((sum, item) => sum + (item.entry - item.output), 0));
        }
        fetchRegister();
    }, [handleTransationRegister, handleTransationDelete]);

    async function handleOpenModalUpdate(registerID) {
        const response = await api.get(`/register/${registerID}`)
        setUpdate(response.data)
        setCode(registerID)
        setDescriptionUpdate(response.data[0].description)
        setEntryUpdate(response.data[0].entry)
        setOutputUpdate(response.data[0].output)
        setDataUpdate(response.data[0].date)
        setIsOpenUpdate(true)
    }

    function handleCloseModalUpdate() {
        setIsOpenUpdate(false)
    }

    function handleTransationUpdate(values){
        api.put(`/register/${cod}`, { descriptionUpdate, entryUpdate, outputUpdate, dataUpdate })
        .then(() => console.log("Atualizado com sucesso"))
        .catch((err) => console.log(err)) 
        
        setIsOpenUpdate(false)
    }


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
                                        <td style={{fontSize: "35px"}}  onClick={() => handleOpenModalUpdate(row.registerID)}><FcEditImage /></td>
                                        <td onClick={() => handleOpenModalDelete(row.registerID)}><img src={menos} alt="Icone de deletar linha" /></td>
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
            <Modal
                isOpen={isOpenDelete}
                onRequestClose={handleCloseModalDelete}
                style={{
                    content: {
                        position: 'absolute',
                        width: "min(300px, 90vw)",
                        height: "20vh",
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
                <div className='buttonDelete '>
                        <p>Tem certeza que deseja excluir essa transação</p>
                    <div>
                        <button onClick={handleCloseModalDelete}>Cancelar</button>
                        <button onClick={() => handleTransationDelete(cod)}>Confirmar</button>
                    </div>
                </div>
            </Modal>
            




            <Modal
                isOpen={isOpenUpdate}
                onRequestClose={handleCloseModalUpdate}
                style={{
                    content: {
                        position: 'absolute',
                        width: "min(450px, 90vw)",
                        height: "45vh",
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

                {/* Modalllll  */}

                <Formik
                    initialValues={{
                        description: update[0].description,
                        entry: update[0].entry,
                        output: update[0].output,
                        date: formattedDate,
                    }}
                    validationSchema={SignupSchema2}
                    onSubmit={(values, actions) => {
                        handleTransationUpdate(values);
                        actions.setSubmitting(false);
                    }}
                >
                    <Form className='form'>
                        <div>
                            <h3>Atualizar dados</h3>
                            <Field
                                name="description2"
                                type="text"
                                placeholder="Descrição"
                                defaultValue={update[0].description}
                                onChange={e => setDescriptionUpdate(e.target.value)}
                            />
                            <span><ErrorMessage name='description2'/></span>
                            <Field
                                name="entry2"
                                type="number"
                                placeholder="Entrada"
                                defaultValue={update[0].entry}
                                onChange={e => setEntryUpdate(e.target.value)}
                            />
                            <span> <ErrorMessage name='entry2'/></span>
                            <Field
                                name="output2"
                                type="number"
                                placeholder="Saida"
                                defaultValue={update[0].output}
                                onChange={e => setOutputUpdate(e.target.value)}
                            />
                            <span><ErrorMessage name='output2'/></span>
                            <Field
                                name="date2"
                                type="date"
                                placeholder="Data"
                                defaultValue={formattedDate}
                                onChange={e => setDataUpdate(e.target.value)}
                            />
                            <span><ErrorMessage name='date2'/></span>
                        </div>
                        <div>
                            <button onClick={handleCloseModalUpdate}>Cancelar</button>
                            <button type="submit" >Salvar</button>
                        </div>
                    </Form>
                </Formik>
            </Modal>
        </>
    )
}

