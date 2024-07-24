<template>
    <Layout>
        <div>
            <div class="flex justify-end px-1 mt-1 items-center">

                <div>
                    <span class="text-white text-[.3rem]">Bonus</span> <span class="text-[#ffaa09]">0,00</span>
                </div>
            </div>
            <div class="w-screen h-screen flex justify-center items-center">
                <NoData />
            </div>

        </div>
    </Layout>
</template>

<script setup>
import Layout from '../../components/layout/Layout.vue'
import NoData from '@/components/NoData/NoData.vue';


</script>