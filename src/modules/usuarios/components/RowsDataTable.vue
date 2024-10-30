<template>
  <tr :class="`hover ${(index + 1) % 2 === 0 ? 'bg-gray-200' : ''}`">
    <th class="text-center p-1">{{ index + 1 }}</th>
    <td class="p-1">{{ usuario.family }}</td>
    <td class="p-1">
      <p>{{ usuario.ci }}</p>
      {{ usuario.names }} {{ usuario.lastnames }}
    </td>
    <td class="text-center p-1">{{ usuario.phone }}</td>
    <td class="text-center p-1">{{ usuario.address }}</td>
    <td class="text-center p-1">
      <div
        :class="`badge badge-sm ${!usuario.hasDebt ? 'badge-primary' : 'badge-error'} font-bold `"
      >
        {{ !usuario.hasDebt ? 'AL DIA' : 'DEUDA' }}
      </div>
    </td>
    <td class="text-center p-1">
      <div
        :class="`badge badge-sm ${!usuario.makeInvoice ? 'badge-success' : 'badge-warning'} font-bold`"
      >
        {{ !usuario.makeInvoice ? 'AL DIA' : 'PENDIENTE' }}
      </div>
    </td>
    <td class="text-center p-1">
      <div class="dropdown dropdown-end">
        <div
          tabindex="0"
          role="button"
          class="btn btn-circle btn-ghost btn-sm text-info"
        >
          <svg
            class="h-4 w-4 stroke-current"
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
                d="M13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6C12.5523 6 13 5.55228 13 5Z"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12Z"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19Z"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </g>
          </svg>
        </div>
        <ul
          tabindex="0"
          class="dropdown-content menu bg-base-100 rounded-box z-[1] w-45 p-2 shadow"
        >
          <li>
            <RouterLink :to="`/usuarios/form/${usuario.id}`">Editar</RouterLink>
          </li>
          <li><a>Cobrar</a></li>
          <li><a>Facturar</a></li>
          <li><a>Contraseña</a></li>
        </ul>
      </div>
    </td>
  </tr>
</template>
<script setup lang="ts">
import type { Usuario } from '../interfaces/usuario.interface'

interface Props {
  usuario: Usuario
  index: number
}

defineProps<Props>()
</script>
