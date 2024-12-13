import React, { useState } from "react";
import "./App.css";
import logo from "./assets/logo.jpg"; // Cambiar la extensión a .jpg

function App() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    nombreUsuario: "",
    contraseña: "",
    telefono: "",
    direccion: "",
    cc: "",
  });

  const [responseMessage, setResponseMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    nombre: "",
    correo: "",
    nombreUsuario: "",
    contraseña: "",
    telefono: "",
    direccion: "",
    cc: "",
  });

  // Validaciones
  const validateForm = () => {
    const newErrors = {};
    
    const nameRegex = /^[a-zA-Z\s]+$/; // Solo letras (y espacios)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Correo con letras y números
    const usernameRegex = /^[a-zA-Z]+$/; // Solo letras para nombre de usuario
    const passwordRegex = /^[a-zA-Z0-9]+$/; // Letras y números para contraseña
    const phoneRegex = /^[0-9]{10}$/; // Solo números, 10 dígitos para teléfono
    const addressRegex = /^[a-zA-Z0-9\s,]+$/; // Dirección con letras y números (y espacios)
    const ccRegex = /^[0-9]+$/; // Solo números para la cédula de ciudadanía

    // Validación del nombre (solo letras)
    if (!formData.nombre || !nameRegex.test(formData.nombre)) {
      newErrors.nombre = "El nombre solo puede contener letras.";
    }

    // Validación del correo (letras y números)
    if (!formData.correo || !emailRegex.test(formData.correo)) {
      newErrors.correo = "El correo debe contener solo letras y números.";
    }

    // Validación del nombre de usuario (solo letras)
    if (!formData.nombreUsuario || !usernameRegex.test(formData.nombreUsuario)) {
      newErrors.nombreUsuario = "El nombre de usuario solo puede contener letras.";
    }

    // Validación de la contraseña (letras y números y máximo 8 caracteres)
    if (!formData.contraseña || !passwordRegex.test(formData.contraseña)) {
      newErrors.contraseña = "La contraseña debe contener solo letras y números.";
    } else if (formData.contraseña.length < 8) {
      newErrors.contraseña = "La contraseña debe tener al menos 8 caracteres.";
    } else if (formData.contraseña.length > 8) {
      newErrors.contraseña = "La contraseña no puede tener más de 8 caracteres.";
    }

    // Validación del teléfono (solo números y 10 dígitos)
    if (!formData.telefono || !phoneRegex.test(formData.telefono)) {
      newErrors.telefono = "El teléfono debe tener 10 dígitos y solo números.";
    }

    // Validación de la dirección (letras y números)
    if (!formData.direccion || !addressRegex.test(formData.direccion)) {
      newErrors.direccion = "La dirección debe contener solo letras y números.";
    }

    // Validación de la cédula de ciudadanía (solo números)
    if (!formData.cc || !ccRegex.test(formData.cc)) {
      newErrors.cc = "La cédula de ciudadanía debe contener solo números.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Si no hay errores, puede enviarse el formulario
  };

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Función para restringir la entrada de caracteres no válidos y limitar la longitud
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let filteredValue = value;

    switch (name) {
      case "nombre":
        // Solo permite letras y espacios
        filteredValue = value.replace(/[^a-zA-Z\s]/g, "");
        break;
      case "correo":
        // Permite letras, números, puntos, guiones y @
        filteredValue = value.replace(/[^a-zA-Z0-9._%+-@]/g, "");
        break;
      case "nombreUsuario":
        // Solo permite letras
        filteredValue = value.replace(/[^a-zA-Z]/g, "");
        break;
      case "contraseña":
        // Permite solo letras y números, y limita la longitud a 8 caracteres
        filteredValue = value.replace(/[^a-zA-Z0-9]/g, "").slice(0, 8); // Limitar a 8 caracteres
        break;
      case "telefono":
        // Solo permite números
        filteredValue = value.replace(/[^0-9]/g, "");
        break;
      case "direccion":
        // Permite letras, números, espacios y comas
        filteredValue = value.replace(/[^a-zA-Z0-9\s,]/g, "");
        break;
      case "cc":
        // Solo permite números
        filteredValue = value.replace(/[^0-9]/g, "");
        break;
      default:
        break;
    }

    // Actualizar el estado con el valor filtrado
    setFormData({
      ...formData,
      [name]: filteredValue,
    });
  };

  // Función de envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return; // Si hay errores, no enviamos el formulario
    }

    setIsSubmitting(true);
    const apiUrl = "https://tu-api.com/endpoint"; // URL de la API

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Datos guardados con éxito:", data);
        setResponseMessage("Datos guardados con éxito.");
      } else {
        console.error("Error al guardar los datos:", response.status);
        setResponseMessage("Hubo un error al guardar los datos.");
      }
    } catch (error) {
      console.error("Hubo un error con la solicitud:", error);
      setResponseMessage("Hubo un error con la solicitud.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="App">
      {/* Mostrar el logo en lugar del texto */}
      <img src={logo} alt="Logo de SENALAB" style={{ width: "150px", height: "auto" }} />

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}  // Usamos handleInputChange para filtrar caracteres
            required
          />
          {errors.nombre && <p className="error">{errors.nombre}</p>}
        </div>

        <div>
          <label>Correo:</label>
          <input
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleInputChange}  // Usamos handleInputChange para filtrar caracteres
            required
          />
          {errors.correo && <p className="error">{errors.correo}</p>}
        </div>

        <div>
          <label>Nombre de Usuario:</label>
          <input
            type="text"
            name="nombreUsuario"
            value={formData.nombreUsuario}
            onChange={handleInputChange}  // Usamos handleInputChange para filtrar caracteres
            required
          />
          {errors.nombreUsuario && <p className="error">{errors.nombreUsuario}</p>}
        </div>

        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="contraseña"
            value={formData.contraseña}
            onChange={handleInputChange}  // Usamos handleInputChange para filtrar caracteres
            required
          />
          {errors.contraseña && <p className="error">{errors.contraseña}</p>}
        </div>

        {/* Nuevos campos */}
        <div>
          <label>Teléfono:</label>
          <input
            type="text"
            name="telefono"
            value={formData.telefono}
            onChange={handleInputChange}  // Usamos handleInputChange para filtrar caracteres
            required
          />
          {errors.telefono && <p className="error">{errors.telefono}</p>}
        </div>

        <div>
          <label>Dirección:</label>
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleInputChange}  // Usamos handleInputChange para filtrar caracteres
            required
          />
          {errors.direccion && <p className="error">{errors.direccion}</p>}
        </div>

        <div>
          <label>Cédula de Ciudadanía (CC):</label>
          <input
            type="text"
            name="cc"
            value={formData.cc}
            onChange={handleInputChange}  // Usamos handleInputChange para filtrar caracteres
            required
          />
          {errors.cc && <p className="error">{errors.cc}</p>}
        </div>

        {/* Botón de enviar */}
        <div>
          <button type="submit" disabled={isSubmitting}>
            Enviar
          </button>
        </div>
      </form>

      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}

export default App;
