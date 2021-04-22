import React, { useState } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
} from 'reactstrap';

export function ModalError(props) {
    console.log(props)
    const [modal, setModal] = useState(false);

    const {
        buttonLabel,
        className,
        errorMessage
    } = props;

    const toggle = () => setModal(!modal);

    return (
        <div>
            <Button color="danger" onClick={toggle}>{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle} className={className} size="xl">
                <ModalHeader toggle={toggle}>Opssss! Houve um error!</ModalHeader>
                <ModalBody>
                    <p>{errorMessage}</p>
                </ModalBody>
            </Modal>
        </div>
    );
}