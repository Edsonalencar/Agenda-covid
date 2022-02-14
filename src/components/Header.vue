<script setup lang="ts">
  import { Popover } from '@headlessui/vue'
  import { UserIcon, CalendarIcon } from '@heroicons/vue/outline'

  defineProps<{
    msg: string,
    buttom: string,
    to: string
  }>()
</script>

<template>
  <div>
    <Popover class="relative">
      <div class="w-full">
        <div class="flex items-center justify-end py-4 px-4">
          <div class="hidden items-center justify-end sm:flex sm:flex-1 lg:w-0">
            <p
              class="text-gray-500 hover:text-gray-900 whitespace-nowrap text-base font-medium"
            >
            {{msg}}
            </p>
            <router-link
              :to="to"
              class="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-blue px-4 py-1 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              <UserIcon class="mr-2 h-4 w-4" aria-hidden="true" />
              {{buttom}}
            </router-link>
          </div>
        </div>
      </div>
    </Popover>
  </div>
</template>
