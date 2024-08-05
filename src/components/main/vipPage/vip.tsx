import MainLayout from '../../layout';
import './vip.css'
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react';
import Privilage, { PrivilageWeekly } from './privilage';
import LevelUpBonus from './level-up-bonuses';
import VipLevel from './vip-level';
import Instruction from './instruction';
import { useTranslation } from 'react-i18next';
import { ChangeColorPallte } from '../../globalFunctions/globalContext';
import { HeaderWithAction } from '../common/header';
import { FormControl } from '@mui/material';
import { TabContainer, TabItem } from '../common/components/tabComponent';
import { useGlobalList, useGlobalVariables } from '../../globalFunctions/store';
import SalaryLevel from './salary-level';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanelBonus(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    <>{children}</>
                </Box>
            )}
        </div>
    );
}

function a11yPropsBanus(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
function VipPage(props: any) {
    const { t } = useTranslation(["home", "main"]);
    const color = useGlobalList(state => state.color)
    const [bonus, setBonus] = useState(0);
    const handleChangeBonus = (event: React.SyntheticEvent, newValue: number) => {
        setBonus(newValue);
    };

    const value = useGlobalVariables(state => state.tabIndex2)
    function getTab(index: any) {
        switch (index) {
            case 0:
                return <LevelUpBonus />
            case 1:
                return <Privilage />
            case 2:
                return <PrivilageWeekly />
            default:
                return <LevelUpBonus />

        }
    }
    return (
        <>
            <MainLayout>
                <section>
                    <HeaderWithAction backBtn={props.state}>VIP</HeaderWithAction>
                </section>
                <section className='vipMainContainer'>
                    <VipLevel />
                    {/* {(value === 1 || value === 2) && <SalaryLevel />} */}
                    <div className="vipLevelMainContainer mb-[.2rem]" style={{ backgroundColor: color.backGorund }}>
                        <FormControl fullWidth>
                            <label className="levelHeaderTitle" style={{ color: color.text4 }}>{value === 1 || value === 2 ? "Salary Level List" : t("ts341", { ns: "ts" })}</label>
                            <Box sx={{ width: '100%', paddingTop: ".1rem" }}>
                                <TabContainer>
                                    <TabItem className={value === 0 ? "active" : ""} index={0}>{t("ts343", { ns: "ts" })}</TabItem>
                                    <TabItem className={value === 1 ? "active" : ""} index={1}>{t("ts1291", { ns: "ts" })}</TabItem>
                                    <TabItem className={value === 2 ? "active" : ""} index={2}>{t("ts1292", { ns: "ts" })}</TabItem>
                                </TabContainer>
                                <div>
                                    {getTab(value)}
                                </div>
                            </Box>
                        </FormControl>
                    </div>
                   {value===0 && <Instruction />}
                </section>
            </MainLayout>
        </>
    )
}

export default VipPage;