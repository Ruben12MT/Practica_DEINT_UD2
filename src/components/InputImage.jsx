import React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function InputImage({ onImageSelected }) {
    function handleUpload(event){
        const selectedFile = event.target.files[0];
        if(selectedFile){
            onImageSelected(selectedFile)
        }
    }
    
    return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Subir imagen
      <VisuallyHiddenInput
        type="file"
        onChange={handleUpload}
        
      />
    </Button>
  );
}
