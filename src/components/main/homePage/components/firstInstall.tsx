import { Dialog, AppBar, Toolbar, Typography, IconButton, DialogContent, DialogActions } from "@mui/material";
import { props } from "@stylexjs/stylex";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ChangeColorPallte } from "../../../globalFunctions/globalContext";
import CloseIcon from '@mui/icons-material/Close';
import { useGlobalList, useGlobalVariables, useModalStates } from "../../../globalFunctions/store";
import { FormControlLabel, Checkbox, Button } from "@mui/material";

export default function FirstInstall() {
    const { t, i18n } = useTranslation(["home", "main"]);
    const colorP = useGlobalList(state => state.color)

    const firstInstall = useGlobalVariables(state => state.firstInstall)

    const [includTypeInstallFirst, setTypeInstallFirstHandleType] = useState(false)
    const [includTypeInstallFirst2, setTypeInstallFirstHandleType2] = useState(false)

    const includTypeInstallFirstHandle = (event: any) => {
        setTypeInstallFirstHandleType(event.target.checked);
        setTypeInstallFirstHandleType2(!event.target.checked);
    };
    const includTypeInstallFirstHandle2 = (event: any) => {
        setTypeInstallFirstHandleType2(event.target.checked);
        setTypeInstallFirstHandleType(!event.target.checked);
    };

    const openInstall = useGlobalVariables(state => state.firstInstallModal)
    const modalInstall = useModalStates(state => state.firstInstallModal)

    const today = new Date()
    const perDay = useGlobalVariables(state => state.turnOncePerDay)

    useEffect(() => {
        if (firstInstall?.popAfterLoginType === 2 && firstInstall?.status === 2) {
            useGlobalVariables.setState({ firstInstallModal: true })
        } else if (firstInstall?.popAfterLoginType === 5 && firstInstall?.status === 2 && modalInstall) {
            useGlobalVariables.setState({ firstInstallModal: true })
        } else if (firstInstall?.popAfterLoginType === 1 && firstInstall?.status === 2) {
            useGlobalVariables.setState({ firstInstallModal: false })
        } else if (firstInstall?.popAfterLoginType === 3 && firstInstall?.status === 2 && (today.getHours() >= 1 && today.getHours() <= 24)) {
            useGlobalVariables.setState({ turnOncePerDay: true })
            if (perDay === false) {
                useGlobalVariables.setState({ firstInstallModal: true })
            } else {
                useGlobalVariables.setState({ firstInstallModal: false })
            }
        } else if (firstInstall?.popBeforeLoginType === 2 && firstInstall?.status === 2) {
            useGlobalVariables.setState({ firstInstallModal: true })
        } else if (firstInstall?.popBeforeLoginType === 5 && firstInstall?.status === 2 && modalInstall) {
            useGlobalVariables.setState({ firstInstallModal: true })
        } else if (firstInstall?.popBeforeLoginType === 1 && firstInstall?.status === 2) {
            useGlobalVariables.setState({ firstInstallModal: false })
        } else if (firstInstall?.popBeforeLoginType === 3 && firstInstall?.status === 2 && (today.getHours() >= 1 && today.getHours() <= 24)) {
            useGlobalVariables.setState({ turnOncePerDay: true })
            if (perDay === false) {
                useGlobalVariables.setState({ firstInstallModal: true })
            } else {
                useGlobalVariables.setState({ firstInstallModal: false })
            }
        }
    }, [])

    const goTo = (link: any) => {
        window.open(link, "_blank")
        useGlobalVariables.setState({ firstInstallModal: false })
    }

    return (
        <React.Fragment>
            <Dialog
                // open={true}
                open={openInstall}
                sx={{
                    " .MuiDialog-paper": {
                        maxWidth: "8rem",
                        borderRadius: ".2rem",
                        "& .MuiDialogContent-root": {
                            padding: ".2rem"
                        }
                    },
                    " .MuiPaper-root": {
                        " .MuiToolbar-root": {
                            padding: "0.2rem 0.3rem !important"
                        },
                        " .MuiDialogContent-root": {
                            paddingTop: "0"
                        }
                    },
                    " .MuiDialogActions-root":{
                        backgroundColor: colorP.third,
                        padding: "0 .2rem .2rem .2rem"
                    }
                }}
            >
                <AppBar sx={{ position: 'relative', backgroundColor: colorP.third, boxShadow: "0" }}>
                    <Toolbar sx={{ paddingTop: '.1rem', paddingBottom: '.3rem' }}>
                        <Typography sx={{
                            ml: 2, flex: 1, fontWeight: 600,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                            ".modalTitleDiscountModal": {
                                maxWidth: "32rem !important",
                                textAlign: "justify !important",
                            }

                        }} variant="h6" align='center' component={'span'}>
                            <div className="modalTitleDiscountModal" style={{ color: colorP.text4, fontSize: ".2rem", lineHeight: 1, width: "6.5rem" }}>{firstInstall?.title}</div>
                        </Typography>
                        <IconButton
                            edge="start"
                            color="inherit"
                            value="8"
                            onClick={() => useGlobalVariables.setState({ firstInstallModal: false })}
                            aria-label="close"
                            className="modalCloseCalendar"
                            sx={{ position: 'absolute', right: 0, top: 0, }}

                        >

                            <CloseIcon style={{ color: colorP.text4, fontSize: ".3rem", }} />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <DialogContent sx={{ backgroundColor: colorP.third, fontSize: ".15rem" }}>
                    <div style={{ backgroundColor: colorP.backGorund, padding: ".2rem", borderRadius: ".1rem" }}>
                        <span style={{ whiteSpace: "pre-wrap", color: colorP.text }}>
                            {firstInstall?.actDesc}
                        </span>
                    </div>
                </DialogContent>
                <DialogActions>
                    <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
                        <FormControlLabel
                            sx={{
                                marginLeft: "0",
                                ".MuiButtonBase-root": {
                                    color: "#313843",
                                    fontSize: ".18rem"
                                },
                                ".MuiButtonBase-root.Mui-checked": {
                                    color: "#04BE02",
                                },
                                " .MuiTypography-root": {
                                    fontSize: ".18rem",
                                    color: colorP.text4,
                                    marginLeft: "6px",
                                },
                                " .MuiSvgIcon-root": {
                                    width: ".35rem",
                                    height: ".35rem",
                                }
                            }}
                            label={t("ts1231", { ns: "ts" })}
                            control={
                                <div className="checkbox-wrapper-4">
                                    <input type="checkbox" className="inp-cbx" id="checkerFirstIInstall" checked={includTypeInstallFirst} onChange={includTypeInstallFirstHandle} />
                                    <label className="cbx" htmlFor="checkerFirstIInstall"><span>
                                        <svg width=".18rem" height=".18rem">
                                            <use xlinkHref="#check-4"></use>
                                        </svg></span></label>
                                    <svg className="inline-svg">
                                        <symbol id="check-4" viewBox="0 0 12 10">
                                            <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                        </symbol>
                                    </svg>
                                </div>
                            }
                        />
                        <FormControlLabel
                            sx={{
                                marginLeft: ".3rem",
                                ".MuiButtonBase-root": {
                                    color: "#313843",
                                    fontSize: ".18rem"
                                },
                                ".MuiButtonBase-root.Mui-checked": {
                                    color: "#04BE02",
                                },
                                " .MuiTypography-root": {
                                    fontSize: ".18rem",
                                    color: colorP.text4,
                                    marginLeft: "6px",
                                },
                                " .MuiSvgIcon-root": {
                                    width: ".35rem",
                                    height: ".35rem",
                                },
                            }}
                            label={t("ts1232", { ns: "ts" })}
                            control={
                                <div className="checkbox-wrapper-4">
                                    <input type="checkbox" className="inp-cbx" id="checkerSecondInstall" checked={includTypeInstallFirst2} onChange={includTypeInstallFirstHandle2} />
                                    <label className="cbx" htmlFor="checkerSecondInstall"><span>
                                        <svg width=".18rem" height=".18rem">
                                            <use xlinkHref="#check-4"></use>
                                        </svg></span></label>
                                    <svg className="inline-svg">
                                        <symbol id="check-4" viewBox="0 0 12 10">
                                            <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                        </symbol>
                                    </svg>
                                </div>
                            }
                        />
                        <Button onClick={() => goTo(firstInstall?.titleImg)} style={{ color: colorP.third, borderColor: colorP.forGround, height: "fit-content", background: colorP.forGround, marginLeft: "auto", fontSize: ".16rem", borderRadius: ".1rem", textTransform: "capitalize" }} variant='outlined' >{t("ts799", { ns: "ts" })}</Button>
                    </div>
                </DialogActions>
            </Dialog>
        </React.Fragment >
    )
}