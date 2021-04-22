import React, { useState, useContext } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    FormGroup,
    Form
} from 'reactstrap';
import { api } from '../../services/delivery';
import { mapsApi } from '../../services/maps';
import { RefreshContext } from "../../context/RefreshPage";
import { ModalError } from './error';

export function ModalRegister(props) {

    const [data, setData] = useContext(RefreshContext);

    const {
        buttonLabel,
        className
    } = props;

    // Parametros digitados de endereço
    const [originAddress, setOriginAddress] = useState();
    const [originNumber, setOriginNumber] = useState();
    const [originState, setOriginState] = useState();
    const [destinationAddress, setDestinationAddress] = useState();
    const [destinationNumber, setDestinationNumber] = useState();
    const [destinationState, setDestinationState] = useState();

    const [modal, setModal] = useState(false);
    const [clientName, setClientName] = useState();
    const [deliveryDate, setDeliveryDate] = useState();

    const [latiduteOrigin, setLatitudeOrigin] = useState();
    const [longitudeOrigin, setLongitudeOrigin] = useState();
    const [latiduteDestination, setLatitudeDestination] = useState();
    const [longitudeDestination, setLongitudeDestination] = useState();

    const toggle = () => setModal(!modal);

    const register = async (e) => {
        e.preventDefault();

        // Consultar dados do endereço de partida
        try {
            const response = await mapsApi.get(
                `json?address=${originAddress.replace(" ", "+")},+${originNumber}+${originState}&key=${process.env.REACT_APP_API_KEY}`);
            console.log(response);
            const { lat, lng } = response.data.results[0].geometry.location;
            setLatitudeOrigin(lat);
            setLongitudeOrigin(lng);
        } catch (err) {
            console.log(err)
        }

        // Consultar dados do endereço de destino
        try {
            const response = await mapsApi.get(
                `json?address=${destinationAddress.replace(" ", "+")},+${destinationNumber}+${destinationState}&key=${process.env.REACT_APP_API_KEY}`);
            console.log(response);
            const { lat, lng } = response.data.results[0].geometry.location;
            setLatitudeDestination(lat);
            setLongitudeDestination(lng);
        } catch (err) {
            console.log(err)
        }

        // if (latiduteOrigin !== '') {
        // Define o objeto para salvar no banco
        const delivery = {
            client_name: clientName,
            delivery_date: deliveryDate,
            starting_latitude: latiduteOrigin.toString(),
            starting_longitude: longitudeOrigin.toString(),
            destination_latitude: latiduteDestination.toString(),
            destination_longitude: longitudeDestination.toString()
        }
        console.log(delivery);
        // send(delivery);
        // } else {
        // modalError("Não foi possível capturar o endereço, por favor tentar novamente!");
        // }

    }

    // Envia os dados do delivery para a api de entregas
    const send = async (delivery) => {
        try {
            const response = await api.post('/create', delivery);

            setData(true);

            toggle();

        } catch (err) {
            console.log(err)
        }
    }

    // Exibe uma modal de error
    const modalError = async (message) => {
        return (
            <ModalError errorMessage={message} />
        );
    }

    return (
        <div>
            <Button color="danger" onClick={toggle}>{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Adicionar Entrega</ModalHeader>
                <ModalBody>
                    <Form onSubmit={register}>

                        <FormGroup>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    Nome do Cliente
                                </InputGroupAddon>
                                <Input
                                    placeholder="Zezin Silva"
                                    className="client_name"
                                    onChange={(e) => {
                                        setClientName(e.target.value);
                                    }}
                                />
                            </InputGroup>
                            <br />
                        </FormGroup>

                        <FormGroup>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    Data da Entrega
                                </InputGroupAddon>
                                <Input
                                    placeholder="19/04/2021"
                                    type="date"
                                    className="delivery_date"
                                    onChange={(e) => { setDeliveryDate(e.target.value) }}
                                />
                            </InputGroup>
                            <br />
                        </FormGroup>

                        <FormGroup>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>Origem</InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    placeholder="Rua dos Anjos"
                                    className="originAddress"
                                    onChange={(e) => { setOriginAddress(e.target.value) }}
                                    required
                                />
                                <Input
                                    className="col-2 mx-1 originNumber"
                                    placeholder="Nº 123"
                                    onChange={(e) => { setOriginNumber(e.target.value) }}
                                    required
                                />
                                <Input
                                    className="col-2 originState"
                                    placeholder="CE"
                                    maxLength="2"
                                    onChange={(e) => { setOriginState(e.target.value) }}
                                    required
                                    style={{textTransform: 'uppercase'}}
                                />
                            </InputGroup>
                            <br />
                        </FormGroup>

                        <FormGroup>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>Destino</InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    placeholder="Rua Jaboticaba"
                                    className="destinationAddress"
                                    onChange={(e) => { setDestinationAddress(e.target.value) }}
                                    required
                                />
                                <Input
                                    className="col-2 mx-1 destinationNumber"
                                    placeholder="Nº 541"
                                    onChange={(e) => { setDestinationNumber(e.target.value) }}
                                    required
                                />
                                <Input
                                    className="col-2 destinationState"
                                    placeholder="CE"
                                    maxLength="2"
                                    onChange={(e) => { setDestinationState(e.target.value) }}
                                    required
                                    style={{textTransform: 'uppercase'}}
                                />
                                {/* <select 
                                    name="estados-brasil"
                                    onChange={(e) => { setDestinationState(e.change) }}
                                    
                                    className="col-3 destinationState custom-select"
                                    defaultValue=""
                                    required
                                >
                                    <option value="AC" >Acre</option>
                                    <option value="AL" >Alagoas</option>
                                    <option value="AP" >Amapá</option>
                                    <option value="AM" >Amazonas</option>
                                    <option value="BA" >Bahia</option>
                                    <option value="CE" >Ceará</option>
                                    <option value="DF" >Distrito Federal</option>
                                    <option value="ES" >Espírito Santo</option>
                                    <option value="GO" >Goiás</option>
                                    <option value="MA" >Maranhão</option>
                                    <option value="MT" >Mato Grosso</option>
                                    <option value="MS" >Mato Grosso do Sul</option>
                                    <option value="MG" >Minas Gerais</option>
                                    <option value="PA" >Pará</option>
                                    <option value="PB" >Paraíba</option>
                                    <option value="PR" >Paraná</option>
                                    <option value="PE" >Pernambuco</option>
                                    <option value="PI" >Piauí</option>
                                    <option value="RJ" >Rio de Janeiro</option>
                                    <option value="RN" >Rio Grande do Norte</option>
                                    <option value="RS" >Rio Grande do Sul</option>
                                    <option value="RO" >Rondônia</option>
                                    <option value="RR" >Roraima</option>
                                    <option value="SC" >Santa Catarina</option>
                                    <option value="SP" >São Paulo</option>
                                    <option value="SE" >Sergipe</option>
                                    <option value="TO" >Tocantins</option>
                                </select> */}
                            </InputGroup>
                            <br />
                        </FormGroup>

                        <hr />

                        <Button color="danger" type="submit">Salvar</Button>{' '}
                        <Button color="link" onClick={toggle}>Cancelar</Button>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    );
}