import { Pagination } from "@mui/material"
import { ChangeColorPallte } from "../globalFunctions/globalContext"
import { useGlobalList } from "../globalFunctions/store";

function PngkPagination(props: any) {
    const colorP = useGlobalList(state => state.color);
    const totalPages = props.data
    const handleChangePage = props.action
    return (
        <Pagination variant="outlined" shape="rounded" sx={{
            ".MuiButtonBase-root": {
                height: ".4rem",
                width: ".4rem",
                color: "nude",
                borderRadius: ".06rem",
                border: "",
                borderColor: "#313843",
                fontSize: ".18rem"
            },
            " .MuiPaginationItem-root": {
                fontSize: ".2696969696969696rem"
            },
            ".MuiButtonBase-root.Mui-selected": {
                backgroundColor: colorP.forGround,
                color: colorP.text2 + " !important",
                borderColor: colorP.forGround
            },
            ".MuiButtonBase-root.Mui-selected:hover": {
                backgroundColor: colorP.forGround
            },
        }} count={totalPages} onChange={handleChangePage} color="secondary" />
    )
}
export default PngkPagination