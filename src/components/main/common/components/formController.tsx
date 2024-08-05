import { FormControl } from "@mui/material";
import { ChangeColorPallte } from "../../../globalFunctions/globalContext";
import { useGlobalList } from "../../../globalFunctions/store";

export default function FormControler(props: any) {
    const colorP = useGlobalList(state => state.color);
    return (
        <FormControl
            size="small"
            sx={{
                minWidth: 255,
                fontSize: ".16rem",
                color: "#68707b !important",
                "& .MuiPaper-root": {
                    background: colorP.backGorund,
                    fontSize: ".16rem",
                    color: "#68707b !important",
                },
                "& fieldset": {
                    borderColor: colorP.text + "!important",
                    "& legend": {
                        "& span": {
                            color: colorP.forGround + " !important"
                        }
                    }
                },
                "& label": {
                    fontSize: ".16rem",
                    color: colorP.text + "!important",
                },
                "& .Mui-focused .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                    borderColor: colorP.forGround + "!important",
                }, "& .MuiInputBase-root": {
                    color: colorP.text + "!important",
                    fontSize: ".16rem"
                }, "& .MuiSvgIcon-root": {
                    color: colorP.text + "!important",
                    width: ".15em",
                },
                " .MuiSelect-select": {
                    color: colorP.text + "!important",
                },
                marginTop: ".06rem !important"
            }}
        >
            {props.children}
        </FormControl>
    )
}