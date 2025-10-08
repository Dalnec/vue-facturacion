<template>
  <div class="">
    <div class="flex justify-between">
      <div
        class="font-bold text-lg mb-2 bg-white border border-gray-200 rounded-lg p-4 w-1/2 text-center"
      >
        Facturación:
        <p class="text-gray-700 text-base">Mayo 2025</p>
      </div>
      <div
        class="font-bold text-lg mb-2 bg-white border border-gray-200 rounded-lg p-4 w-1/2 text-center"
      >
        Creado:
        <p class="text-gray-700 text-base">2025-05-05 20:05</p>
      </div>
    </div>
  </div>
  <section v-if="historyData.length">
    <article
      v-for="item in historyData"
      :key="item.id"
      class="bg-white border border-gray-200 rounded-lg p-4 mb-2"
    >
      <div class="flex justify-between">
        <span class="">Acción:</span>
        <span
          class="inline-flex items-center rounded-md bg-blue-400/10 px-2 py-1 text-xs font-medium text-blue-400 inset-ring inset-ring-blue-400/30"
          >{{ item.action }}</span
        >
      </div>
      <div class="flex justify-between">
        <span class="">Modificado:</span>
        <span class="">{{ formatDate(item.modified) }}</span>
      </div>
      <div class="flex justify-between">
        <span class="">Empleado: </span>
        <span class="">El nombre del empleado</span>
      </div>

      <div v-if="item.changes && Object.keys(item.changes).length">
        <div>Cambios:</div>
        <div
          v-for="(chg, field) in item.changes"
          :key="field"
          class="flex justify-between"
        >
          <div class="">
            {{ field == 'measured' ? 'Lectura a domicilio' : field }}
          </div>
          <div class="">
            <span class="line-through text-red-400">{{ chg.old }}</span>
            <span class="">→</span>
            <span class="text-green-600">{{ chg.new }}</span>
          </div>
        </div>
      </div>
    </article>
  </section>

  <div v-else class="">Sin resultados</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

/* Tipos */
type ActionType = 'update' | 'create' | 'delete'

export interface FieldChange {
  new: string | number | boolean | null
  old: string | number | boolean | null
}

export type ChangesMap = Record<string, FieldChange>

export interface HistoryItem {
  id: number
  created: string // 'YYYY-MM-DD HH:mm:ss'
  modified: string // 'YYYY-MM-DD HH:mm:ss'
  changed_at?: string // opcional
  changes?: ChangesMap
  action: ActionType
  invoice: number | string
  employee: number | string // puede venir nombre o id
}

/* Props */
const props = defineProps<{
  history?: HistoryItem[]
}>()

/* Emits */
defineEmits<{
  (e: 'close'): void
}>()

/* Estado */
const historyData = ref<HistoryItem[]>(
  props.history && props.history.length
    ? props.history
    : [
        {
          id: 1,
          created: '2025-10-06 02:42:57',
          modified: '2025-10-06 02:42:57',
          changed_at: '2025-10-06 02:42:57',
          changes: { measured: { new: '1001.00', old: '999.00' } },
          action: 'update',
          invoice: 373,
          employee: 1,
        },
        {
          id: 1,
          created: '2025-10-06 02:42:57',
          modified: '2025-10-06 02:42:57',
          changed_at: '2025-10-06 02:42:57',
          changes: { measured: { new: '1001.00', old: '999.00' } },
          action: 'update',
          invoice: 373,
          employee: 1,
        },
        {
          id: 1,
          created: '2025-10-06 02:42:57',
          modified: '2025-10-06 02:42:57',
          changed_at: '2025-10-06 02:42:57',
          changes: { measured: { new: '1001.00', old: '999.00' } },
          action: 'update',
          invoice: 373,
          employee: 1,
        },
        {
          id: 1,
          created: '2025-10-06 02:42:57',
          modified: '2025-10-06 02:42:57',
          changed_at: '2025-10-06 02:42:57',
          changes: { measured: { new: '1001.00', old: '999.00' } },
          action: 'update',
          invoice: 373,
          employee: 1,
        },
      ],
)

/* Utils */
function formatDate(dt: string): string {
  // reemplaza espacio por 'T' para evitar NaN en Safari/iOS
  const d = new Date(dt.replace(' ', 'T'))
  if (isNaN(d.getTime())) return dt
  return d.toLocaleString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>
