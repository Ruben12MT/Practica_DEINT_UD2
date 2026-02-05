import React, { useEffect, useState } from "react";
import FormBank from "./FormBank";
import { useParams } from "react-router";

/**
 * Componente contenedor para modificar un banco existente.
 * Obtiene el ID del banco desde la URL, descarga sus datos y renderiza el formulario de edición.
 * 
 * @returns {JSX.Element} El formulario de banco precargado con los datos o null mientras carga.
 */
export default function BankModifier() {
  const { id } = useParams(); // ID del banco a editar
  const [bank, setBank] = useState(null); // Estado para almacenar los datos del banco

  try {
    useEffect(() => {
      async function fetchBank() {
        const res = await fetch(window.__APP_CONFIG__.API_URL + `/banks/${id}`);
        const json = await res.json();
        setBank(json.datos);
      }
      fetchBank();
    }, [id]);
  } catch (error) {
    console.error("Error en BankModifier:", error);
    //     llamarDialog("Error en BankModifier", error.message, true);
  }

  return <FormBank bankToEdit={bank} />;
}
