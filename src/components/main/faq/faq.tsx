import MainLayout from "../../layout";
import "./faq.css";
import { HeaderWithAction } from "../common/header";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Loader from "../../backdropLoader/backdrop-loader";
import NoData from "../../noData/no-data";
import { ChangeColorPallte } from "../../globalFunctions/globalContext";
import { isEmptyObject } from "jquery";
import { useGlobalList, useGlobalVariables } from "../../globalFunctions/store";
import { useFaqs } from "../../hooks/faqHook";
import { useFaqActivities } from "../../hooks/getUserInfoHook";
function Faq() {
  const { t, i18n } = useTranslation(["home", "main"]);
  const colorP = useGlobalList(state => state.color);

  const tab = useGlobalVariables(state => state.faqsTab)
  const faqValue = useGlobalVariables(state => state.faqValue)

  const selectData = (index: any) => {
    useGlobalVariables.setState({ faqsTab: index })
  }


  return (
    <MainLayout>
      <section className="mainEvent">
        <HeaderWithAction>{t("ts158", { ns: "ts" })}</HeaderWithAction>
        {faqValue.filter((data: any) => data.type !== 25 && data.type !== 24).length === 0 ?
          <NoData />
          :
          <div className="flex gap-[.2rem] justify-between mb-[.2rem]">
            <div className="flex flex-col gap-[.2rem]">
              {faqValue && faqValue.filter((data: any) => data.type !== 25 && data.type !== 24)?.map((value: any, index: any) =>
                <div onClick={() => selectData(index)} className="flex rounded-[.1rem] w-[1.3rem] h-[.6rem] items-center justify-center p-[.1rem] text-center cursor-pointer" style={tab === index ? { backgroundColor: colorP.forGround } : { backgroundColor: colorP.backGorund }}>
                  <span className="text-[.18rem] text-white" style={tab === index ? { color: colorP.text2 } : { color: colorP.text4 }}>{value.title}</span>
                </div>
              )}
            </div>
            <div className="w-full h-auto rounded-[.1rem] p-[.2rem]" style={{ backgroundColor: colorP.backGorund }}>
              <div className="text-[.18rem] text-white" dangerouslySetInnerHTML={{ __html: faqValue.filter((data: any) => data.type !== 25 && data.type !== 24)[tab]?.content }}></div>
            </div>
          </div>
        }
      </section>
    </MainLayout>
  );
}
export default Faq;
