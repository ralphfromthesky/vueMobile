import { Backdrop, CircularProgress, Stack } from "@mui/material";
import { ChangeColorPallte } from "../globalFunctions/globalContext";
import { useGlobalList } from "../globalFunctions/store";

export default function Loader(props: any) {
    const color = useGlobalList(state => state.color);
    return (
        <>
            <Backdrop
                sx={{ color: color.text, zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={props.setLoader}
            >
                <Stack spacing={2} direction={"column"} alignItems={"center"}>
                    <CircularProgress color="inherit" />
                    {props.children ? props.children : ""}
                </Stack>
            </Backdrop>
        </>
    )
}