import React, { useState } from "react";
import "./RegistroMuestras.css";
import logo from "../assets/logo.png";

const RegistroMuestras = () => {
  const [cedula, setCedula] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [tipoAgua, setTipoAgua] = useState("");
  const [otroTipoAgua, setOtroTipoAgua] = useState("");
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");

  const registrarCliente = (e) => {
    e.preventDefault();
    console.log("Cliente registrado");
    setModalOpen(false); 
  };

  const handleNombreChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setNombre(value);
    } else {
      alert("El nombre solo puede contener letras.");
    }
  };

  const handleCedulaChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setCedula(value);
    } else {
      alert("La cédula solo puede contener números.");
    }
  };

  const handleTelefonoChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setTelefono(value);
    } else {
      alert("El teléfono solo puede contener números.");
    }
  };

  return (
    <div className="form-container">
      <div className="logo">
  <img src={logo} alt="Logo del laboratorio" />
</div>

      <h2>Registro de Muestras</h2>
      <form>
        {}
        <label htmlFor="cedula">Cédula Cliente</label>
        <div className="cedula-container">
          <input
            type="text"
            id="cedula"
            placeholder="Ingrese la cédula del cliente"
            value={cedula}
            onChange={handleCedulaChange}
          />
          <button
            type="button"
            className="btn-registrar-cliente"
            onClick={() => setModalOpen(true)}
          >
            Registrar Cliente
          </button>
        </div>

        {}
        <label htmlFor="tipoAgua">Tipo de Agua</label>
        <select
          id="tipoAgua"
          value={tipoAgua}
          onChange={(e) => setTipoAgua(e.target.value)}
        >
          <option value="">Seleccione tipo de agua</option>
          <option value="natural">Agua Natural</option>
          <option value="potable">Agua Potable</option>
          <option value="residual">Agua Residual</option>
          <option value="otro">Otro</option>
        </select>

        {}
        {tipoAgua === "otro" && (
          <div>
            <label htmlFor="otroTipoAgua">Especifique el tipo de agua</label>
            <input
              type="text"
              id="otroTipoAgua"
              placeholder="Ingrese el tipo de agua"
              value={otroTipoAgua}
              onChange={(e) => setOtroTipoAgua(e.target.value)}
            />
          </div>
        )}

        {}
        <label htmlFor="fechaHora">Fecha y Hora</label>
        <input type="datetime-local" id="fechaHora" />

        <label htmlFor="idMuestra">ID de Muestra</label>
        <input type="text" id="idMuestra" placeholder="Ingrese el ID de muestra" />

        <label htmlFor="tipoMuestreo">Tipo de Muestreo</label>
        <input type="text" id="tipoMuestreo" placeholder="Ingrese el tipo de muestreo" />

        <label htmlFor="analisis">Análisis a Realizar</label>
        <select id="analisis">
  <option value="">Seleccione opciones de análisis</option>
  <option value="aluminio">Aluminio</option>
  <option value="arsenico">Arsénico</option>
  <option value="bromo">Bromo</option>
  <option value="cadmio">Cadmio</option>
  <option value="cot">Carbono Orgánico Total (COT)</option>
  <option value="cloro_residual">Cloro Residual</option>
  <option value="cloro_total">Cloro Total</option>
  <option value="cloruros">Cloruros</option>
  <option value="cobalto">Cobalto</option>
  <option value="cobre">Cobre</option>
  <option value="color_aparente">Color Aparente</option>
  <option value="color_real">Color Real</option>
  <option value="conductividad">Conductividad</option>
  <option value="cromo">Cromo</option>
  <option value="dbo5">Demanda Bioquímica de Oxígeno (DBO5)</option>
  <option value="dqo">Demanda Química de Oxígeno (DQO)</option>
  <option value="dureza_calcica">Dureza Cálcica</option>
  <option value="dureza_magnesica">Dureza Magnésica</option>
  <option value="dureza_total">Dureza Total</option>
  <option value="ortofosfatos">Ortofosfatos</option>
  <option value="fosforo_total">Fósforo Total</option>
  <option value="hierro">Hierro</option>
  <option value="magnesio">Magnesio</option>
  <option value="manganeso">Manganeso</option>
  <option value="mercurio">Mercurio</option>
  <option value="molibdeno">Molibdeno</option>
  <option value="niquel">Níquel</option>
  <option value="nitratos">Nitratos</option>
  <option value="nitritos">Nitritos</option>
  <option value="nitrogeno_amoniacal">Nitrógeno Amoniacal</option>
  <option value="nitrogeno_total">Nitrógeno Total</option>
  <option value="oxigeno_disuelto">Oxígeno Disuelto</option>
  <option value="ph">pH</option>
  <option value="plata">Plata</option>
  <option value="plomo">Plomo</option>
  <option value="potasio">Potasio</option>
  <option value="solidos_sedimentables">Sólidos Sedimentables</option>
  <option value="solidos_suspendidos">Sólidos Suspendidos</option>
  <option value="solidos_totales">Sólidos Totales</option>
  <option value="sulfatos">Sulfatos</option>
  <option value="turbiedad">Turbiedad</option>
  <option value="yodo">Yodo</option>
  <option value="zinc">Zinc</option>
          {}
        </select>

        <button type="submit">Registrar</button>
      </form>

      {}
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Registrar Cliente</h3>
            <form onSubmit={registrarCliente}>
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                placeholder="Nombre"
                value={nombre}
                onChange={handleNombreChange}
                required
              />

              <label htmlFor="cedulaModal">Cédula</label>
              <input
                type="text"
                id="cedulaModal"
                placeholder="Cédula"
                value={cedula}
                onChange={handleCedulaChange}
                required
              />

              <label htmlFor="telefono">Teléfono</label>
              <input
                type="text"
                id="telefono"
                placeholder="Teléfono"
                value={telefono}
                onChange={handleTelefonoChange}
                required
              />

              <label htmlFor="correo">Correo Electrónico</label>
              <input type="email" id="correo" placeholder="Correo Electrónico" required />

              <label htmlFor="direccion">Dirección</label>
              <input type="text" id="direccion" placeholder="Dirección" required />

              <label htmlFor="password">Contraseña</label>
              <input type="password" id="password" placeholder="Contraseña" required />

              <button type="submit">Registrar Cliente</button>
            </form>
            <button className="btn-cerrar" onClick={() => setModalOpen(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistroMuestras;
