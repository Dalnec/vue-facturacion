<template>
  <div class="card glass w-full m-3">
    <!-- <figure>
      <img
        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
        alt="car!"
      />
    </figure> -->
    <div class="card-body p-6">
      <h2 class="card-title text-primary font-bold">Usuarios</h2>
      <!-- <p>How to park your car at your garage?</p> -->

      <div class="overflow-x-auto w-full text-base-info">
        <table class="table">
          <!-- head -->
          <thead>
            <tr>
              <th></th>
              <th>Nombre</th>
              <th>Tareas</th>
              <th>Avance</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(project, index) in mainStore.projectList"
              :key="project.id"
              class="hover"
            >
              <th>{{ index + 1 }}</th>
              <td>{{ project.name }}</td>
              <td>{{ project.task.length }}</td>
              <td>
                <progress
                  class="progress progress-primary w-56"
                  value="40"
                  max="100"
                ></progress>
              </td>
            </tr>
          </tbody>
        </table>

        <InputModal
          :open="open"
          @close="open = false"
          @value="mainStore.addProject"
          placeholder="Ingresar nombre del proyecto"
          title="Nuevo proyecto"
        />

        <CustomModal :open="openCustomModal">
          <template #header>
            <h3 class="text-lg font-bold">Modal Title</h3>
          </template>
          <template #body>
            <p class="py-4">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel eius
              ullam labore magni perspiciatis quia cum nesciunt amet nihil illo
              odit
            </p>
          </template>
          <template #actions>
            <button class="btn mr-4" @click="openCustomModal = false">
              Cancel
            </button>
            <button class="btn btn-primary" @click="openCustomModal = false">
              Aceptar
            </button>
          </template>
        </CustomModal>

        <fab-button @click="open = true" position="bottom-right">
          <AddCircle />
        </fab-button>
        <fab-button @click="openCustomModal = true" position="bottom-left">
          <AddCircle />
        </fab-button>
      </div>

      <div class="card-actions justify-end">
        <button class="btn btn-primary">Learn now!</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomModal from '@/modules/common/components/CustomModal.vue'
import FabButton from '@/modules/common/components/FabButton.vue'
import InputModal from '@/modules/common/components/InputModal.vue'
import AddCircle from '@/modules/common/icons/AddCircle.vue'
import { ref } from 'vue'
import { useMainStore } from '../store/main.store'

const mainStore = useMainStore()
const open = ref(false)
const openCustomModal = ref(false)
</script>
