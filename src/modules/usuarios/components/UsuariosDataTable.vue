<template>
  <div>
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th class="text-center p-1"></th>
          <th class="text-center p-1">Familia</th>
          <th class="text-center p-1">Representante</th>
          <th class="text-center p-1">Celular</th>
          <th class="text-center p-1">Direccion</th>
          <th class="text-center p-1">Estado Deuda</th>
          <th class="text-center p-1">Estado Facturacion</th>
          <th class="text-center p-1">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <RowsDataTable
          v-for="(usuario, i) in usuarios"
          :key="usuario.id"
          :usuario="usuario"
          :index="index + i"
        />
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { Usuario } from '../interfaces/usuario.interface'
import RowsDataTable from './RowsDataTable.vue'

interface Props {
  usuarios: Usuario[]
  index: number
}
defineProps<Props>()
</script>
