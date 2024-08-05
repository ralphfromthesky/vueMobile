import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import './tabComponent.css'
import { useGlobalList, useGlobalVariables } from "../../../globalFunctions/store";
import { useGetPopularGame } from "../../../hooks/curstomHooks";
import { ChangeColorPallte } from "../../../globalFunctions/globalContext";
export function TabContainer(props: any) {
    const { t, i18n } = useTranslation(["home", "main"]);
    const color = useGlobalList(state => state.color);
    const width = props.width ? props.width : "100%"
    return (
        <Box sx={{ borderBottom: 2, borderColor: color.forGround, width }}>
            <div className='tabContainers' style={props.style}>
                {props.children}
            </div>
        </Box>
    )
}
export function TabItem(props: any) {
    const color = useGlobalList(state => state.color);
    const handleChangeTab = (ind: any) => {
        useGlobalVariables.setState({ tabIndex2: ind })
    }
    return <div id={props.id} onClick={() => handleChangeTab(props.index)} className={'tabContent ' + (props?.className ? "active" : "")} style={props?.className ? { color: color.forGround } : { color: color.text4 }}><span style={props?.className ? { color: color.forGround } : { color: color.text4 }}>{props.children}</span></div>
}

export function TabItems(props: any) {
    const color =useGlobalList(state => state.color);
    const handleChangeTab = (ind: any) => {
        useGlobalVariables.setState({ tabIndex2: ind })
        const gameType = useGlobalVariables.setState({ gameID: props.id })
    }
    return <div id={props.id} onClick={() => handleChangeTab(props.index)} className={'tabContent ' + (props?.className ? "active" : "")} style={props?.className ? { color: color.forGround } : { color: color.text4 }}><span style={props?.className ? { color: color.forGround } : { color: color.text4 }}>{props.children}</span></div>
}
export function TabCustom(props: any) {
    const color =useGlobalList(state => state.color);
    return <div id={props.id} onClick={props.onClick} style={props?.className ? { color: color.forGround } : {}} className={'tabContent ' + (props?.className ? "active" : "")}><span>{props.children}</span></div>
}