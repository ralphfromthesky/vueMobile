import { useQuery, useMutation, useQueryClient } from 'react-query'
import { faqAxiosPost } from './ajaxHook'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type faqData = {
    faqs: any,
}
export const useFaqs = create<faqData>()(
    devtools(
        persist((set) => ({
            faqs: {},
        }), {
            name: "faqs"
        })
    )
)

