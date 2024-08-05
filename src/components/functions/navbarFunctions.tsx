import { useTranslation } from "react-i18next";
import { useGlobalList, useGlobalVariables, useTabStates } from "../globalFunctions/store";
import { ToastrPngk } from "../globalFunctions/toastr";
import { useGetRecharge } from "../hooks/getUserInfoHook";
import { useNavigate } from "react-router";
const userInfo = useGlobalVariables.getState().userDetails;
const Color = useGlobalList.getState().color
export function useOpenWithdrawPage(link: any, index: any) {
    const rechargeCn = useGetRecharge();
    const { t } = useTranslation(["home", "main"]);
    const navigate = useNavigate();
    if (userInfo?.type == 150 || userInfo?.type == 160) {
        ToastrPngk({ msg: t("ts983", { ns: "ts" }), type: "error", id: link });
    } else {
        rechargeCn.mutate();
        useTabStates.setState({ type: 0 });
        if (link === "withdraw") {
            navigate("/withdraw");
            useTabStates.setState({ type: index });
        } else {
            navigate("/withdrawal");
        }
    }
}
export function abbrNum(number: any, decPlaces: any) {
    decPlaces = Math.pow(10, decPlaces);
    var abbrev = ["k", "m", "b", "t"];
    for (var i = abbrev.length - 1; i >= 0; i--) {
      var size = Math.pow(10, (i + 1) * 3);
      if (size <= number) {
        number = Math.round(number * decPlaces / size) / decPlaces;
        if ((number === 1000) && (i < abbrev.length - 1)) {
          number = 1;
          i++;
        }
        number += abbrev[i];
        break;
      }
    }
    return number;
  }

export function ColorChanger(color: any){
  if (color >=22 ){
    return "#fff"
  }
  else {
    return Color.text
  }

}