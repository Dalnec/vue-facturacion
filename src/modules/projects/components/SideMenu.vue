<template>
  <aside class="bg-base-200 w-50 min-h-screen shadow-inner">
    <!-- <h2 class="text-lg font-bold mx-4">Menu Opciones</h2> -->

    <ul class="menu menu-lg text-info-content bg-base-200 rounded-box w-48">
      <li>
        <RouterLink to="/usuarios">
          <UsersMenu />
          Usuarios
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/monitoring">
          <MonitoringIcon />
          Monitoreo
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/purchases">
          <TarifaIcon />
          Tarifas
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/distric">
          <HouseMenu />
          Barrio/OTB
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/employee">
          <EmployeeIcon />
          Empleado
        </RouterLink>
      </li>
    </ul>
  </aside>
</template>
<script setup lang="ts">
import EmployeeIcon from '@/modules/common/icons/EmployeeIcon.vue'
import HouseMenu from '@/modules/common/icons/HouseMenu.vue'
import MonitoringIcon from '@/modules/common/icons/MonitoringIcon.vue'
import TarifaIcon from '@/modules/common/icons/TarifaIcon.vue'
import UsersMenu from '@/modules/common/icons/UsersMenu.vue'
</script>
