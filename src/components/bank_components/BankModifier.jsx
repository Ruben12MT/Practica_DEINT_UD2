import React, { useEffect, useState } from "react";
import FormBank from "./FormBank";
import { useParams } from "react-router";

export default function BankModifier() {
  const { id } = useParams();
  const [bank, setBank] = useState(null);

  try {
    useEffect(() => {
      async function fetchBank() {
        const res = await fetch(`http://localhost:3000/api/banks/${id}`);
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
