<template>
    <WithdrawLayout>
        <div class="flex flex-col w-full p-[.2rem] gap-[.2rem]">
            <div class="flex w-full justify-between items-center">
                <div class="flex w-full items-center gap-[.2rem]">
                    <div
                        class="flex bg-[#05309F] w-[1.5rem] border border-[#3A61C2] rounded-full px-[.2rem] h-[.5rem] items-center justify-between">
                        <span class="text-[#A0C5FB] text-[.2rem]">Tudos</span>
                        <img src="/images/return.png" alt="" class="-rotate-90 w-[.2rem]">
                    </div>
                    <img class="w-[.4rem]" src="/withdrawImages/kf.png" alt="">
                </div>
                <div class="flex w-full justify-end gap-[.1rem] items-center">
                    <span class="text-[#6FA4EF] text-[.22rem]">Total de Saques</span>
                    <span class="text-white text-[.22rem]">R$ 0,00</span>
                    <img class="w-[.3rem]" src="/images/shuaxin.png" alt="">
                </div>
            </div>
            <div class="flex flex-col h-[calc(100vh-2rem)] overflow-auto">
                <div class="flex flex-col items-center h-full justify-center">
                    <img class="w-[2.5rem]" src="/images/noRecord.png" alt="">
                    <span class="text-[#6FA4EF] text-[.25rem]">Sem Registros</span>
                </div>
            </div>
        </div>
    </WithdrawLayout>
</template>
<script setup>
    import WithdrawLayout from './components/WithdrawLayout.vue'
</script>