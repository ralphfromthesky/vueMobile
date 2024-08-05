import { useState } from "react";
import { ChangeColorPallte } from "../../../globalFunctions/globalContext";
import { useDiscount } from "../../../hooks/getUserInfoHook";
import {
  FormControlLabel,
  Checkbox,
  Button,
  Box,
  FormGroup,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./notice.css";
import ImageModal from "../../common/modal/submit-modal/imageModal";
import CloseIcon from "@mui/icons-material/Close";
import { useGlobalList, useGlobalVariables } from "../../../globalFunctions/store";

function NoticeModal(props: any) {
  const { t, i18n } = useTranslation(["home", "main"]);
  const Notices = props.children; // CustomHook
  const [current, setCurrent] = useState(0);
  const colorP = useGlobalList(state=>state.color);
  const openSubmitModal = useGlobalVariables(state => state.noticeModal)
  // const noticeModal=useGlobalVariables(state=>state.noticeModal)
  const handleSubmitModalClose = () => {
    useGlobalVariables.setState({ noticeModal: false })
    useGlobalVariables.setState({ disCountModal: true })
  };
  const activNotice =
    Notices &&
    Notices.filter((entry: { popupStatus: any }) => entry.popupStatus !== 1);
  function setCurtab(index: number) {
    setCurrent(index)
  }
  return (
    <ImageModal
      openSubModal={
        activNotice && activNotice.length !== 0 ? openSubmitModal : false
      }
      closeSubModal={handleSubmitModalClose}
    >

      <Box sx={{
        "img": {
          width: "6rem"
        },
        "span": {
          fontSize: ".18rem"
        },
        "div": {
          fontSize: "initial"
        },
        ".dontShowContainer": {
          maxWidth: "8rem"
        }
      }}>
        <CloseIcon
          onClick={handleSubmitModalClose}
          sx={{
            height: ".4rem",
            width: ".4rem",
            padding: "8px",
            backgroundColor: "hsla(0,0%,100%,.2)",
            borderRadius: "50%",
            cursor: "pointer",
            color: "#fff",
            position: "absolute",
            right: ".6rem",
            top: ".5rem",
          }}
          className="closeIcon"
        />
        <div className="dontShowContainer" style={{ background: colorP.backGorund, minWidth: "6rem", minHeight: "5rem", maxWidth: "fit-content" }}>
          <div className="buttonBoxers" style={{ borderColor: colorP.text4 }}>
            {
              activNotice && activNotice?.map((value: any, index: any) =>
                <button style={current == index ? { color: colorP.forGround, background: colorP.text4+"2f" } : { color: colorP.text4, background: "transparent" }} onClick={() => setCurtab(index)}>{value.title}</button>
              )
            }
          </div>
          <div className="noticeMainBoxers" style={{ padding: ".2rem" }}>
            {activNotice && <div className="boxersTuitle" style={{ color: colorP.text4 }} dangerouslySetInnerHTML={{ __html: activNotice[current]?.title }} />}
            {activNotice && <div dangerouslySetInnerHTML={{ __html: activNotice[current]?.content }} />}
          </div>
        </div>
      </Box>
    </ImageModal>
  );
}
export default NoticeModal;
