import React, { useState ,useEffect } from 'react';
import api from "./services/api";

import './global.css';
import './App.css';
import "./Sidebar.css";
import './Main.css';

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

/*
Elementos do React:
- Componente: Bloco isolado de HTML, CSS e JS no qual não interfere no restante da aplicação
- Propriedade: Infos que um componenente PAI passa para o componente FILHO.
- Estado: Infos mantidas pelo componente (Imutabilidade).
*/

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }

    loadDevs();
  } , []);

  async function handleAddDev(data) {
    const response = await api.post("/devs", data);

    const devExists = devs.find(
      dev => dev.github_username === data.github_username
    );

    if (devExists) {
      console.log(new Date() + "\t Usuário já cadastrado");
      alert("Dev já cadastrado.");
      return;
    }

    setDevs([...devs, response.data]);
  }

  async function handleDelete(id) {
    const response = await api.delete(`/devs/${id}`);

    if (response.data) {
      const filteredDevs = devs.filter(dev => dev._id !== id);
      setDevs(filteredDevs);
    }
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem 
              key={dev._id} 
              dev={dev} 
              handleDelete={handleDelete}
            />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
