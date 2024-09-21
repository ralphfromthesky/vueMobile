<template>
    <div>
        <div class="flex text-white">
            <h1 class="flex-1 bg-red-700">this is the header</h1>
            <div class="flex-none w-[20rem] flex gap-2 bg-orange-400">
                <router-link to="/about"><h1>About</h1></router-link>
                <router-link to="/profile"><h1>Profile</h1></router-link>
                <router-link to="/compA"><h1>comp-A</h1></router-link>
                <router-link to="/compB"><h1>comp-B</h1></router-link>
                <router-link to="/temp"><h1>templateRef</h1></router-link>

                <div>

                </div>
                
                

            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped></style>