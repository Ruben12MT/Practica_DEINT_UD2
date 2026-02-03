import React, { useEffect, useState } from "react";
import FormBranch from "./FormBranch";
import { useParams } from "react-router";

export default function BranchModifier() {
  const { id } = useParams();
  const [branch, setBranch] = useState(null);

  useEffect(() => {
    async function fetchBranch() {
      try {
        const res = await fetch( window.__APP_CONFIG__.API_URL+`/branches/${id}`);
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
