import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Project } from '../interfaces/main.interfaces'
import { v4 as uuidv4 } from 'uuid'
import { useLocalStorage } from '@vueuse/core'

// const initialLoad = (): Project[] => {
//   return [
//     {
//       id: uuidv4(),
//       name: 'Proyecto 1',
//       task: [
//         {
//           id: '1',
//           name: 'Tarea 1',
//           completedAt: null,
//         },
//         {
//           id: '2',
//           name: 'Tarea 2',
//           completedAt: null,
//         },
//         {
//           id: '3',
//           name: 'Tarea 3',
//           completedAt: null,
//         },
//       ],
//     },
//     {
//       id: uuidv4(),
//       name: 'Proyecto 2',
//       task: [
//         {
//           id: '1',
//           name: 'Tarea 1',
//           completedAt: null,
//         },
//         {
//           id: '2',
//           name: 'Tarea 2',
//           completedAt: null,
//         },
//         {
//           id: '3',
//           name: 'Tarea 3',
//           completedAt: null,
//         },
//       ],
//     },
//   ]
// }

export const useMainStore = defineStore('main', () => {
  const projects = ref(useLocalStorage<Project[]>('projects', []))

  const addProject = (name: string) => {
    if (!name) return
    projects.value.push({
      id: uuidv4(),
      name,
      task: [],
    })
  }

  return {
    // Properties
    // projects,

    // Getters
    projectList: computed(() => [...projects.value]),
    // Actions
    addProject,
  }
})
