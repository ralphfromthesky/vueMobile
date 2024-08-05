import { Box } from '@mui/material';
import { ChangeColorPallte } from '../../../globalFunctions/globalContext'
import './table.css'
import * as stylex from '@stylexjs/stylex';
import { useGlobalList } from '../../../globalFunctions/store';
export function Table(props: any) {
    return (
        <>
            <div className="tableContainer">{props.children}</div>

        </>
    )
}

export function TableHeader(props: any) {
    const colorP = useGlobalList(state=>state.color)
    return (
        <>
            <div className="tableHead">{props.children}</div>
        </>
    )
}

export function TableHeaders(props: any) {
    const colorP = useGlobalList(state=>state.color)
    return (
        <>
            <div className="tableHeads" >{props.children}</div>
        </>
    )
}

export function TableBody(props: any) {
    return (
        <>
            <div className="tableBody">{props.children}</div>
        </>
    )
}
export function TableRow(props: any) {

    const colorP = useGlobalList(state=>state.color)
    return (
        <>
           <div className="tableRow" style={{ backgroundColor: colorP.third }}>{props.children}</div>
        </>
    )
}
export function TableCell(props: any) {
    const colorP = useGlobalList(state=>state.color)
    return (
        <>
            <div className="tableCell" style={{ color: colorP.text, borderColor: colorP.text }}>{props.children}</div>
        </>
    )
}
export function TableCellDisc(props: any) {
    const colorP = useGlobalList(state=>state.color)
    return (
        <>
            <div className="tableCell">{props.children}</div>
        </>
    )
}