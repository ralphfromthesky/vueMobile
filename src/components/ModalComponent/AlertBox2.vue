<template>
    <div data-twe-modal-init data-twe-backdrop="static"
        class="fixed left-0 top-0 z-[1055] hidden h-full w-full p-[.2rem] overflow-y-auto overflow-x-hidden outline-none"
        id="alertBox2" tabindex="-1" aria-labelledby="exampleModalCenterTitle" aria-modal="true" role="dialog">
        <div data-twe-modal-dialog-ref
            class="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center justify-center flex-col gap-[.2rem] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px]">
            <div class="pointer-events-auto relative flex w-full flex-col rounded-[.2rem] bg-[#05309F] border border-[#3A61C2] bg-clip-padding text-current shadow-4 outline-none dark:bg-surface-dark">
                <div class="relative p-[.2rem]">
                    <slot></slot>
                </div>
                <!-- <div class="flex w-full items-center justify-center">
                    <div class="flex items-center justify-center w-[.6rem] h-[.6rem] rounded-full bg-transparent border-[.05rem] border-white absolute bottom-[-.9rem]">
                        <button type="button"
                            class="box-content rounded-none border-none text-white hover:text-neutral-800 hover:no-underline focus:text-neutral-800 focus:opacity-100 focus:shadow-none focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-300 dark:focus:text-neutral-300 logOutModalButton"
                            data-twe-modal-dismiss aria-label="Close">
                            <span class="[&>svg]:h-[.4rem] [&>svg]:w-[.4rem]">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </span>
                        </button>
                    </div>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script setup>

    import { onMounted } from "vue";
    import {
        Modal,
        Ripple,
        initTWE,
    } from "tw-elements";

    onMounted(() => {
        initTWE({ Modal, Ripple });
    })
</script>