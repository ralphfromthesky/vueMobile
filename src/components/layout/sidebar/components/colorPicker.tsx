import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useGlobalList, useGlobalVariables } from "../../../globalFunctions/store";
import { colorPalletess } from "../../styles/colors";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import CssFilterConverter from "css-filter-converter";
import ColorLensIcon from '@mui/icons-material/ColorLens';

export default function ColorPicker() {
    const { t } = useTranslation(["home", "main"]);
    const station = useGlobalVariables((state) => state.stationConfig);
    const backgroundColor = useGlobalList(state => state.color);
    const iconColor: any = CssFilterConverter.hexToFilter(backgroundColor.backGorund);

    const colored = useGlobalVariables(state => state.color)
    const handleColorChange = (event: any) => {
        // changeColor(event.target.value)
        useGlobalVariables.setState({color: event.target.value})
        const color: any = colorPalletess.find((item) => item?.id === event.target.value)
        useGlobalList.setState({ color: color })
    }

    return (
        <Box
            sx={{
                " .footerActions:hover": {
                    " .iconLabel": {
                        color: backgroundColor.forGround + "!important"
                    },
                    " .iconContainer": {
                        backgroundColor: backgroundColor.forGround + "!important"
                    },
                },
                ".footerActions": {
                    " .iconContainer": {
                        backgroundColor: station.stationCode === "yd102" ? backgroundColor.text4 : backgroundColor.text + "!important"
                    }
                }

            }}
        >
            <div className="footerActions">
                <div className="iconContainer">
                    <i className="iconBorder">
                        <ColorLensIcon style={{ color: backgroundColor.backGorund, fontSize: ".23rem" }} />
                    </i>
                </div>
                <FormControl size="small"
                    sx={{
                        minWidth: "1.5rem",
                        fontSize: ".16rem",
                        color: backgroundColor.text + "!important",
                        "& .MuiPaper-root": {
                            background: backgroundColor.backGorund,
                            fontSize: ".16rem",
                            color: backgroundColor.text + "!important",
                        },
                        "& fieldset": {
                            borderColor: backgroundColor.text + "!important",
                            "& legend": {
                                "& span": {
                                    color: backgroundColor.forGround + " !important"
                                }
                            }
                        },
                        "& label": {
                            fontSize: ".16rem",
                            color: backgroundColor.text + "!important",
                        },
                        "& .Mui-focused .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                            borderColor: backgroundColor.text + " !important",
                        }, "& .MuiInputBase-root": {
                            color: backgroundColor.text + "!important",
                            fontSize: ".16rem"
                        }, "& .MuiSvgIcon-root": {
                            color: backgroundColor.text + "!important",
                            width: ".15em",
                        },
                        " .MuiSelect-select": {
                            color: backgroundColor.text + "!important",
                        },
                        marginTop: ".06rem !important"
                    }}
                >
                    <InputLabel sx={{ color: backgroundColor.text }} id="demo-select-small-label">{t("ts458", { ns: "ts" })}</InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        label={t("ts458", { ns: "ts" })}
                        value={colored}
                        onChange={handleColorChange}
                        MenuProps={{
                            PaperProps: {
                                sx: {
                                    background: backgroundColor.backGorund,
                                    color: backgroundColor.text,
                                    "& em": {
                                        fontSize: ".16rem",
                                        color: backgroundColor.text + "!important",
                                        paddingRight: ".32rem"
                                    },
                                    " .MuiButtonBase-root": {
                                        fontSize: ".16rem",
                                        color: backgroundColor.text + "!important",

                                    }
                                }
                            }
                        }}
                    >
                        <MenuItem value={1}>
                            <em>{t("ts459", { ns: "ts" })}...</em>
                        </MenuItem>
                        {colorPalletess.map((value: any, index: any) =>
                            <MenuItem key={index} value={value.id}>{value.name}</MenuItem>
                        )}
                    </Select>
                </FormControl>
            </div>
        </Box>
    )

}