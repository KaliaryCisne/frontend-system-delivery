import { Table, Button } from 'reactstrap';
import { useState, useEffect, useCallback, useContext } from 'react';
import { api } from '../../services/delivery';
import { RefreshContext } from "../../context/RefreshPage";
import { SiGooglemaps } from "react-icons/si";
import { BsFillTrashFill } from "react-icons/bs";
import { ModalMap } from "../Modal/maps";

export function List() {

    const [deliveries, setDeliveries] = useState([]);
    const [data, setData] = useContext(RefreshContext);

    useEffect(() => {
        handleList();
        setData(false);
    }, [data]);

    const handleList = useCallback(async () => {
        try {
            const response = await api.get('/list');
            setDeliveries(response.data.data);

        } catch (err) {
            console.log(err)
        }

    }, [deliveries]);

    const handleDelete = useCallback(async (id) => {
        try {
            const response = await api.delete(`/delete/${id}`);
            setData(true);
        } catch (err) {
            console.log(err)
        }

    }, [deliveries]);

    return (
        <Table className="list-deliveries">
            <thead>
                <tr>
                    <th>ID do Pedido</th>
                    <th>Cliente</th>
                    <th>Data/Hora Pedido</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {deliveries && deliveries.map(delivery => {
                    return (
                        <tr key={delivery.id}>
                            <th scope="row">{delivery.id}</th>
                            <td>{delivery.client_name}</td>
                            <td>{delivery.delivery_date}</td>
                            <td>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <ModalMap
                                        buttonLabel={<SiGooglemaps size={15} title="Visualizar no Mapa" />}
                                        originLatitude={delivery.starting_latitude}
                                        originLongitude={delivery.starting_longitude}
                                        destLatitude={delivery.destination_latitude}
                                        destLongitude={delivery.destination_longitude}
                                    />

                                    <Button
                                        onClick={() => { handleDelete(delivery.id) }}
                                        color="danger"
                                        style={{ marginLeft: '5px' }}
                                        title="Excluir"
                                    >
                                        <BsFillTrashFill
                                            size={15}
                                            color="white"
                                        />
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    );
}