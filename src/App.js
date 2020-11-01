import React from "react";
import "./App.css";
import { Card, List, Typography } from "antd";
import "antd/dist/antd.css";

const App = () => {
  const [pais, setPais] = React.useState(null);
  const [dados, setDados] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      const response = await fetch("https://disease.sh/v3/covid-19/countries");
      const data = await response.json();
      const paises = await data.map((pais) => ({
        nome: pais.country,
        valor: pais.countryInfo.iso2,
        casos: pais.cases,
      }));
      setDados(paises);
    };
    getData();
  }, []);
  const requestPais = async (e) => {
    const countryCode = e.target.value;
    const response = await fetch(
      `https://disease.sh/v3/covid-19/countries/${countryCode}`
    );
    const data = await response.json();

    setPais(data);
  };
  document.body.style.backgroundColor = "gray";

  return (
    <>
      <div className="header">
        <p>
          About Covid for Country <strong>1.0</strong>
        </p>
        <select name="country" id="select" onChange={requestPais}>
          <option value="select" disabled>
            Selecionar Pais
          </option>
          {dados
            ? dados.map((pais) => (
                <option value={pais.valor}>{pais.nome}</option>
              ))
            : null}
        </select>
      </div>
      <div className="main_app">
        {pais ? (
          <div className="cartao">
            <Card
              extra={
                <img
                  style={{ width: "50px", height: "auto" }}
                  src={pais.countryInfo.flag}
                />
              }
              style={{ backgroundColor: "#405de6" }}
              title="Dados Atualizados"
            >
              <h3>Pais: {pais.country}</h3>
              <p>Infectados: {pais.cases}</p>
              <p>Curados: {pais.recovered}</p>
              <p>Mortos: {pais.deaths}</p>
            </Card>
          </div>
        ) : (
          <p></p>
        )}
        {dados ? (
          <div className="world_list">
            <List
              header={<div>World Covid Infos</div>}
              footer={<div>V 1.0</div>}
              bordered
              dataSource={dados.map((pais) => [pais.casos, pais.nome])}
              renderItem={(item) => (
                <List.Item>
                  <Typography.Text mark>{item[1]}</Typography.Text> {item[0]}{" "}
                </List.Item>
              )}
            />{" "}
          </div>
        ) : (
          <p>Carregando..</p>
        )}
      </div>
    </>
  );
};

export default App;
