import EmailIcon from '@mui/icons-material/Email';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DraftsIcon from '@mui/icons-material/Drafts';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import 'react-notifications/lib/notifications.css';
import { ChangeColorPallte, SetNewBalance } from '../../globalFunctions/globalContext';
import { useGlobalList, useGlobalVariables } from '../../globalFunctions/store';
import PngkPagination from '../../Pagination/pagination';
import { useGetMessageList } from '../../hooks/curstomHooks';
export default function NotificationPage() {
    const { t, i18n } = useTranslation(["home", "main"]);
    const colorP = useGlobalList(state => state.color)
    const notif = useGetMessageList()
    const [openNotif, setOpenNotif] = useState(false);
    const handleClose = () => {
        setOpenNotif(false);
    };

    const notificationMessage = useGlobalList(state => state.notifications)
    const [messageContent, setMessageContent] = useState("")
    const [isData, setIsData] = useState(false)
    const [content, setContent] = useState(false)
    const [pageCount, setPageCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)



    const handleMessage = (message: any) => {

        setMessageContent(message.content)
        setContent(true);
        readMessage(message)


    }
    async function readMessage(value: any) {
        useGlobalVariables.setState({ isSupport: true });
        useGlobalVariables.setState({ isSupport: true })
        const response = await axios.post('/userCenter/msgManage/readMessage.do', {
            sid: value.id,
            rid: value.receiveMessageId
        }, {
            headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8", 'X-Requested-With': 'XMLHttpRequest' }
        })

    }

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };
    useEffect(() => {
        const payload = {
            pageNumber: currentPage
        }
        notif.mutate(payload)
    }, [currentPage])

    function timestampToTime(timestamp: any) {
        var date = new Date(timestamp);
        var Y = date.getFullYear() + '/';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
        var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        const strDate = Y + M + D + h + m + s;
        return strDate;

    }

    return (
        <>
            {/* <DraftsIcon style={{ color: colorP.forGround, height: ".40rem", width: ".40rem" }} className="noticeIcon" /> */}
            <div className="noticeContainerSupport" style={(notificationMessage && notificationMessage.success !== false) ? { marginBottom: 0, backgroundColor: colorP.backGorund } : { backgroundColor: colorP.backGorund }}>
                <div className='noticeBoxContainer' style={(notificationMessage && notificationMessage.success !== false) ? { marginBottom: 0, backgroundColor: colorP.third } : { backgroundColor: colorP.backGorund }}>

                    {content == false ? (notificationMessage && notificationMessage.success !== false) ? notificationMessage?.rows?.map((value: any, index: any) =>
                        <div className="noticeBox" onClick={() => handleMessage(value)} style={{ backgroundColor: colorP.backGorund }}>
                            <div className="iconBox">
                                {value.status == 1 ? <img src="/supportImages/unread.png" alt="" /> : <img src="/supportImages/read.png" alt="" />}
                            </div>
                            <div className="noticeBoxContent">
                                <div className="noticeTitleBox">
                                    <label style={{ color: colorP.text4 }} className="noticeContent">{value.title}</label>
                                </div>
                                <div className="noticeTitleBox"><label className="noticeDate" style={{ color: colorP.id === 16 ? colorP.text4 : colorP.text2 }}>{timestampToTime(value.createTime)}</label></div>
                            </div>
                            <div className="arrowBox">
                                <div className="arrowTitle"><label style={{ color: colorP.id === 16 ? colorP.text4 : colorP.text }}>{t("ts409", { ns: "ts" })}</label></div>
                                <ArrowForwardIosIcon style={{ color: colorP.id === 16 ? colorP.text4 : colorP.text2, height: ".18rem", width: ".18rem" }} className="arrowIcon"></ArrowForwardIosIcon>
                            </div>
                        </div>
                    ) : (
                        <div className="noticeBox" style={{ backgroundColor: colorP.backGorund, height: "100%" }} >
                            <div className="noMsessage">
                                <img style={{ width: "2.5rem" }} src="/supportImages/noMessage.png" alt="" className="noMessageImage" />
                                <label className="noMessageLabel" style={{ color:colorP.id === 16 ? colorP.text4 : colorP.text }}>{t('ts1156', { ns: 'ts' })}</label>
                            </div>
                        </div>
                    ) : (<div className='alertContainer' style={{ color: colorP.text + " !important" }} dangerouslySetInnerHTML={{ __html: messageContent }} />)}
                </div>
                {(notificationMessage && notificationMessage.success !== false) &&
                    <div className="pagination" >
                        <PngkPagination data={Math.ceil(notificationMessage.total / 10)} action={handleChangePage}></PngkPagination>
                    </div>
                }
            </div>
        </>
    )
}