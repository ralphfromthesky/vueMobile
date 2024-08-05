import { useTranslation } from 'react-i18next';
import './inputComponent.css'
import { ChangeColorPallte } from '../../../globalFunctions/globalContext';
import { Box } from '@mui/material';
import { useGlobalList, useGlobalVariables } from '../../../globalFunctions/store';
export function SearchInput(props: any) {
    const { t, i18n } = useTranslation(["home", "main"]);
    const staConfig = useGlobalVariables(state => state.stationConfig)
    const color = useGlobalList(state => state.color);
    const handleKeyDown = (e: any) => {
        if (e.which === 38 || e.which === 40) {
            e.preventDefault();
        }
    }
    return (
        <Box
            sx={{
                ".searchInputContainer": {
                    borderColor: color.fourth,
                    height: ".5rem"
                },
                ".searchInputContainer:has(input[type='number']:focus)": {
                    borderColor: color.forGround,
                },
                "input": {
                    color: color.text
                },
                "input::placeholder": {
                    opacity: 1,
                    color: staConfig.stationCode === "yd102" ? color.text4 : color.text
                }
            }}
        >
            <div className='searchInputContainer'>
                <input value={props.value} onChange={props.onChange} onKeyDown={handleKeyDown} onKeyUp={handleKeyDown} type={props.type} ref={props.inputRef} placeholder={props.placeHolder ? props.placeHolder : t("ts042", { ns: "ts" })} />
                <button onClick={props.onClick} className='searchIcon'><img src="/images/searchIcon.png" alt="" /></button>
            </div>
        </Box>
    )
}