import { ChangeColorPallte } from '../../globalFunctions/globalContext';
import { useGlobalList } from '../../globalFunctions/store';
import './cars.css'
function CardsExpo(props: any) {
    const colorP = useGlobalList(state=>state.color)
    return (
        <>
            <div className="overCard" style={{ borderColor: colorP.fourth }}>
                {props.children}
            </div>
        </>
    )
}
export default CardsExpo;