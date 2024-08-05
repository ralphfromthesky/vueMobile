import { useGlobalList, useGlobalVariables } from "../../globalFunctions/store";
import { colorPalletess } from "./colors";
import { useStationConfig } from "../../hooks/getUserInfoHook";



export function useCollorePallete() {
    const staconfig = useStationConfig()
    const stationConfig = useGlobalVariables.getState().stationConfig;
    const colors = useGlobalList(state => state.color)
   
    if (staconfig.isLoading === false) {
        if (staconfig.data?.data?.success !== false && stationConfig.stationCode !== "t300") {
            const color: any = colorPalletess.find((item) => item?.id === stationConfig.stationTheme)
            useGlobalList.setState({ color: color })
        } else if (staconfig.data?.data?.success !== true && stationConfig.stationCode !== "t300") {
            const color: any = colorPalletess.find((item) => item?.id === 1)
            useGlobalList.setState({ color: color })
        } else if (colors.length === 0 && stationConfig.stationCode === "t300") {
            const color: any = colorPalletess.find((item) => item?.id === 1)
            useGlobalList.setState({ color: color })
        }
    }
}
