import { useTranslation } from "react-i18next";
import DialogueModal from "../../../Dialogue";
import { CustomInput } from "../../../commonComponents/inputComponent";
import { useGlobalList, useModalState } from "../../../globalFunctions/store";
import { useSaveInvestment } from "../../../hooks/getUserInfoHook";
import Cookies from "universal-cookie";
export default function AgentRegFrom() {
    const backgroundColor = useGlobalList(state => state.color)
    const { t } = useTranslation(["home", "main"]);
    const cookies = new Cookies();
    const modStat=cookies.get("agenReg")
    const modState = useModalState(state => state.open)
    const investment = useSaveInvestment()
    function addInvesment(event: any) {
        event.preventDefault()
        const payload = {
            applyName:  event.target[0]?.value,
            applyId:  event.target[1]?.value,
            whatsapp:  event.target[2]?.value,
            telegram:  event.target[3]?.value,
        }
        investment.mutate(payload)
    }
    function onChange(){

    }
    return (
        <DialogueModal close={()=>useModalState.setState({open:false})} openModal={modState} title={t("ts1250", { ns: "ts" })}>
            <form onSubmit={addInvesment}>
                <div className="flex flex-col gap-[.2rem] w-[5rem] p-[.2rem]">

                    <CustomInput handleChange={onChange} icon="/images/1.png" placeholder={t("ts1251", { ns: "ts" })} />
                    <CustomInput handleChange={onChange} icon="/images/driver-license.png" placeholder={t("ts1252", { ns: "ts" })} />
                    <CustomInput handleChange={onChange} iconFilter={false}  icon="/images/whatsapp.png" placeholder={t("ts1253", { ns: "ts" })} />
                    <CustomInput handleChange={onChange} iconFilter={false}  icon="/images/telegram.png" placeholder={t("ts1254", { ns: "ts" })} />
                    <button type="submit" className="text-[.2rem] h-[0.55rem] rounded-[.1rem]" style={{ background: backgroundColor.forGround, borderColor: backgroundColor.forGround, color: backgroundColor.text2 }}>{t("ts321", { ns: "ts" })}</button>

                </div>
            </form>
        </DialogueModal>
    )
}