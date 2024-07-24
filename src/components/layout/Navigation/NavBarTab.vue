<template>
    <div class="flex items-center p-[.2rem] bg-[#05309F] border-b-[.055rem] border-b-[#3A61C2] w-full h-[.9rem] fixed top-0 z-10">
        <div class="flex gap-[.7rem] items-center overflow-x-auto text-white">
            <router-link to="/event">
                <div class="flex link-content items-center justify-center relative h-[.9rem]">
                    <span class="text-[.27rem]">Eventos</span>
                </div>
            </router-link>
            <router-link to="/task">
                <div class="flex link-content items-center justify-center relative h-[.9rem]">
                    <span class="text-[.27rem]">Mission</span>
                </div>
            </router-link>
            <router-link to="/vip">
                <div class="flex link-content items-center justify-center relative h-[.9rem]">
                    <span class="text-[.27rem]">VIP</span>
                </div>
            </router-link>
            <router-link to="/pendente">
                <div class="flex link-content items-center justify-center relative h-[.9rem]">
                    <span class="text-[.27rem]">Pendente</span>
                </div>
            </router-link>
            <router-link to="/juros">
                <div class="flex link-content items-center justify-center relative h-[.9rem]">
                    <span class="text-[.27rem]">Juros</span>
                </div>
            </router-link>
            <router-link to="/records">
                <div class="flex link-content items-center justify-center relative h-[.9rem]">
                    <span class="text-[.27rem]">History</span>
                </div>
            </router-link>
        </div>
    </div>
</template>

<style scoped>
.router-link-active .link-content {
    border-bottom: 3px solid hsl(47, 100%, 87%);
    color: hsl(47, 100%, 87%);
}
</style>