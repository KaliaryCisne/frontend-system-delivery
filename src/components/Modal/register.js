import React, { useState, useContext, useEffect } from 'react';
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
    const [originCity, setOriginCity] = useState();

    const [destinationAddress, setDestinationAddress] = useState();
    const [destinationNumber, setDestinationNumber] = useState();
    const [destinationState, setDestinationState] = useState();
    const [destinationCity, setDestinationCity] = useState();

    const [modal, setModal] = useState(false);
    const [clientName, setClientName] = useState();
    const [deliveryDate, setDeliveryDate] = useState();


    const toggle = () => setModal(!modal);

    const register = async (e) => {
        e.preventDefault();

        let { latOrigin, lngOrigin, latDest, lngDest } =  await findAddress();

        const delivery = {
            client_name: clientName,
            delivery_date: deliveryDate,
            starting_latitude: latOrigin.toString(),
            starting_longitude: lngOrigin.toString(),
            destination_latitude: latDest.toString(),
            destination_longitude: lngDest.toString()
        }

        console.log(delivery);
        send(delivery);

    }

    const findAddress = async (e) => {

        let latOrigin, lngOrigin, latDest, lngDest;
        // Consultar dados do endereço de partida
        try {
            const response = await mapsApi.get(
                `json?address=${originAddress.replace(" ", "+")},+${originNumber}+${originCity},${originState}&key=${process.env.REACT_APP_API_KEY}`);

            const { lat, lng } = response.data.results[0].geometry.location;
            latOrigin = lat;
            lngOrigin = lng;
        } catch (err) {
            console.log(err)
        }

        // Consultar dados do endereço de destino
        try {
            const response = await mapsApi.get(
                `json?address=${destinationAddress.replace(" ", "+")},+${destinationNumber}+${destinationCity},${destinationState}&key=${process.env.REACT_APP_API_KEY}`);

            const { lat, lng } = response.data.results[0].geometry.location;
            latDest = lat;
            lngDest = lng;
        } catch (err) {
            console.log(err)
        }

        return { latOrigin, lngOrigin, latDest, lngDest };
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
            <Modal isOpen={modal} toggle={toggle} className={className} size="xl">
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
                                    className="col-2 originCity"
                                    placeholder="Fortaleza"
                                    onChange={(e) => { setOriginCity(e.target.value) }}
                                    required
                                />
                                <Input
                                    className="col-2 originState mx-1"
                                    placeholder="CE"
                                    maxLength="2"
                                    onChange={(e) => { setOriginState(e.target.value) }}
                                    required
                                    style={{textTransform: 'uppercase'}}
                                />
                            </InputGroup>
                            <br />
                        </FormGroup>

                        <hr />

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
                                    className="col-2 destinationCity"
                                    placeholder="Fortaleza"
                                    onChange={(e) => { setDestinationCity(e.target.value) }}
                                    required
                                />
                                <Input
                                    className="col-2 destinationState mx-1"
                                    placeholder="CE"
                                    maxLength="2"
                                    onChange={(e) => { setDestinationState(e.target.value) }}
                                    required
                                    style={{textTransform: 'uppercase'}}
                                />
                                
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