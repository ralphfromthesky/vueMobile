
import Dialog from "@mui/material/Dialog";
import "./submit-modal.css";
import { useTranslation } from "react-i18next";
import { ChangeColorPallte } from "../../../../globalFunctions/globalContext";
import React, { useState } from "react";
import { useGlobalList } from "../../../../globalFunctions/store";

export default function ImageModal(props: any) {
  const [open, setOpen] = useState<any>(true)
  const { t, i18n } = useTranslation(["home", "main"]);
  const colorP = useGlobalList(state => state.color);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <React.Fragment>
      <Dialog
        open={props.openSubModal}
        onClose={handleClose}

        sx={{
          " .MuiDialog-paper": {
            maxWidth: "max-content !important",
            overflow: "hidden !important",
            backgroundColor: "transparent !important",
            padding: "1rem",
            boxShadow: "none"
          },
        }}
      >
        {props.children}
      </Dialog>
    </React.Fragment>
  );
}
