import { useState } from "react"
import { useGlobalList, useGlobalVariables } from "../../globalFunctions/store"
import { ChangeColorPallte } from "../../globalFunctions/globalContext";

export default function Timer() {
    const color = useGlobalList(state => state.color)
    const [month, setMonth] = useState<any>("00")
    const [day, setDay] = useState<any>("00")
    const [hour, setHours] = useState<any>("00")
    const [minute, setMinute] = useState<any>("00")
    const [second, setSecond] = useState<any>("00")

    const stationConfig = useGlobalVariables(state => state.stationConfig)

    var date = new Date(new Date().toLocaleString('en', { timeZone: stationConfig?.stationCode === "yn108" ? 'Asia/Ho_Chi_Minh' : stationConfig?.stationCode === "yd102" ? "Asia/Kolkata" : stationConfig?.stationCode === "yn107" ? 'Asia/Ho_Chi_Minh' : "America/Fortaleza" }));
    setTimeout(() => {
        setMonth(date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
        setDay(date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
        setHours(date.getHours() < 10 ? '0' + date.getHours() : date.getHours())
        setMinute(date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
        setSecond(date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
    }, 1000)

    return (
        <div className="timeContainer text-[.12rem] flex flex-col justify-center text-center">
            <label className="timeDate text-[#adb6c3]" style={stationConfig.stationCode === "yd102" ? { color: color.text4 } : { color: "#adb6c3" }}>{month + "/" + day} {hour + ":" + minute + ":" + second}</label>
            <label className="timeDateUTC text-[#adb6c3]" style={stationConfig.stationCode === "yd102" ? { color: color.text4 } : { color: "#adb6c3" }}>({stationConfig?.stationCode === "yn108" ? "GMT+7" : stationConfig?.stationCode === "yn107" ? "GMT+7" : "GMT-3"})</label>
        </div>
    )
}