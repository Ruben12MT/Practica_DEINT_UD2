import React, { useEffect, useState } from "react";
import FormBranch from "./FormBranch";
import { useParams } from "react-router";

/**
 * Componente contenedor para modificar una sucursal existente.
 * Obtiene el ID desde la URL, recupera los datos de la sucursal y renderiza el formulario de edición.
 * 
 * @returns {JSX.Element} Formulario de sucursal con datos precargados.
 */
export default function BranchModifier() {
  const { id } = useParams(); // ID de la sucursal
  const [branch, setBranch] = useState(null); // Datos de la sucursal

  useEffect(() => {
    async function fetchBranch() {
      try {
        const res = await fetch(window.__APP_CONFIG__.API_URL + `/branches/${id}`);
        const json = await res.json();
        setBranch(json.datos);
      } catch (error) {
        console.error("Error en BranchModifier:", error);
      }
    }

    fetchBranch();
  }, [id]);

  return <FormBranch branchToEdit={branch} />;
}
