import { Header } from "./components/Header"
import { List } from "./components/List";
import { RefreshPage } from "./context/RefreshPage";
import { ModalRegister } from "./components/Modal/register";

import './styles/global.scss';

export function App() {
  return (
    <RefreshPage>
      <Header />
      <div className="container-fluid mt-5">
      <List />
      <ModalRegister buttonLabel="Adicionar" className=""/>
      </div>
    </RefreshPage >
  );
}