import { useQuery } from 'react-query'
import { axiosGet2, axiosPost2 } from './ajaxHook'
import { useGlobalList } from '../globalFunctions/store'

export const useFetchCarouselImage = () => {
    var lang = localStorage.getItem('defAultLang')
    return useQuery({
        queryKey: ['carousel', lang],
        staleTime: 100000,
        enabled: false,
        queryFn: async () => (axiosGet2('/banner.do?lang=' + lang)),
        onSuccess: (data) => {
            useGlobalList.setState({ swiperData: data })
        }
    })
}