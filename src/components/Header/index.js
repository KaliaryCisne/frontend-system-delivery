import { Navbar } from 'reactstrap';

import '../../styles/Header/index.scss';

export function Header() {
    return (
        <header>
            <Navbar color="danger">
                <p className="title">App de Delivery</p>
            </Navbar>
        </header>
    );
}