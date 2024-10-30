<template>
  <div class="navbar bg-primary">
    <div class="flex-1">
      <svg
        class="w-8 h-8 mr-2"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path
            d="M8.99999 14C8.99999 13.4477 8.55227 13 7.99999 13C7.4477 13 6.99999 13.4477 6.99999 14C6.99999 15.3574 7.26721 16.7375 8.08236 17.7972C8.93437 18.9048 10.2571 19.5 12 19.5C12.5523 19.5 13 19.0523 13 18.5C13 17.9477 12.5523 17.5 12 17.5C10.7429 17.5 10.0656 17.0952 9.66761 16.5778C9.23276 16.0125 8.99999 15.1426 8.99999 14Z"
            fill="#dbecf5"
          ></path>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M13.4228 1.54267C12.6513 0.711988 11.348 0.712021 10.5766 1.54273C9.63287 2.55896 7.89116 4.5305 6.37916 6.77881C4.87045 9.02222 3.46953 11.5773 3.49416 14.3526C3.49633 14.5981 3.50939 14.9426 3.55218 15.3536C3.63717 16.17 3.84245 17.278 4.33361 18.4008C4.82693 19.5285 5.61868 20.6923 6.88173 21.5709C8.15052 22.4536 9.82552 23 11.9997 23C14.1739 23 15.8489 22.4536 17.1178 21.5709C18.3808 20.6923 19.1727 19.5286 19.6661 18.4009C20.1573 17.2781 20.3627 16.17 20.4477 15.3536C20.4905 14.9427 20.5036 14.5982 20.5058 14.3527C20.5306 11.5774 19.1293 9.02208 17.6206 6.77875C16.1084 4.53043 14.3666 2.55889 13.4228 1.54267ZM8.03877 7.89491C9.44577 5.80274 11.0797 3.94302 11.9997 2.94942C12.9198 3.94301 14.5539 5.80273 15.961 7.89491C17.2351 9.78932 18.5269 11.9805 18.5059 14.3348C18.5042 14.5268 18.4938 14.8074 18.4585 15.1464C18.3873 15.83 18.2176 16.722 17.8338 17.5992C17.4521 18.4715 16.8689 19.3078 15.9756 19.9291C15.0882 20.5465 13.8256 21 11.9997 21C10.1738 21 8.91129 20.5465 8.02387 19.9291C7.13071 19.3078 6.54754 18.4715 6.16596 17.5992C5.78221 16.722 5.61259 15.8301 5.54142 15.1465C5.50613 14.8074 5.49578 14.5269 5.49408 14.3349C5.4732 11.9806 6.76469 9.78944 8.03877 7.89491Z"
            fill="#dbecf5"
          ></path>
        </g>
      </svg>
      <a class="text-xl font-bold text-white">
        Sistema de Facturación y Monitoreo
      </a>
    </div>
    <div class="flex-none gap-2">
      <a class="text-white font-bold">Administrador</a>
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <svg
              class="w-10 h-10 p-0 m-0"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM15 9C15 10.6569 13.6569 12 12 12C10.3431 12 9 10.6569 9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9ZM12 20.5C13.784 20.5 15.4397 19.9504 16.8069 19.0112C17.4108 18.5964 17.6688 17.8062 17.3178 17.1632C16.59 15.8303 15.0902 15 11.9999 15C8.90969 15 7.40997 15.8302 6.68214 17.1632C6.33105 17.8062 6.5891 18.5963 7.19296 19.0111C8.56018 19.9503 10.2159 20.5 12 20.5Z"
                  fill="#ffffff"
                ></path>
              </g>
            </svg>
          </div>
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-45 p-2 shadow"
        >
          <li>
            <a class="justify-between">
              Profile
              <!-- <span class="badge">New</span> -->
            </a>
          </li>
          <li><a>Settings</a></li>
          <li>
            <a
              @click="
                () => {
                  authStore.logout()
                  // $router.push({ name: 'login' })
                }
              "
              >Logout</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/modules/auth/stores/auth.store'

const authStore = useAuthStore()
</script>
