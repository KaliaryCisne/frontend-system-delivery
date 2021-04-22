import React, { useState, useContext } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
} from 'reactstrap';
import GoogleMaps from "../Map";

export function ModalMap(props) {
    console.log(props)
    const [modal, setModal] = useState(false);

    const {
        buttonLabel,
        className
    } = props;

    const toggle = () => setModal(!modal);

    return (
        <div>
            <Button color="danger" onClick={toggle}>{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle} className={className} size="xl">
                <ModalHeader toggle={toggle}>Melhor rota para entrega</ModalHeader>
                <ModalBody>
                    <GoogleMaps 
                        originLatitude={props.originLatitude}
                        originLongitude={props.originLongitude}
                        destLatitude={props.destLatitude}
                        destLongitude={props.destLongitude}
                    />
                </ModalBody>
            </Modal>
        </div>
    );
}