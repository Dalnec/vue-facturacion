<template>
  <form
    class="grid grid-cols-1 bg-white px-5 gap-4 py-2"
    @submit.prevent="onSubmit()"
  >
    <div class="first-col">
      <div class="mb-4">
        <label for="family" class="form-label">Familia</label>
        <CustomInput
          v-model="family"
          v-bind="familyAttrs"
          :error="errors.family"
        />
      </div>

      <div class="mb-4">
        <label for="address" class="form-label">Direccion</label>
        <CustomInput
          v-model="address"
          v-bind="addressAttrs"
          :error="errors.address"
        />
      </div>

      <div class="mb-4">
        <label for="ci" class="form-label">Carnet de Identidad</label>
        <CustomInput v-model.number="ci" v-bind="ciAttrs" :error="errors.ci" />
      </div>

      <div class="mb-4">
        <label for="name" class="form-label">Nombre</label>
        <!-- <input
          v-model="name"
          v-bind="nameAttrs"
          type="text"
          id="name"
          :class="['form-control', { 'border-error': errors.name }]"
        />
        <span class="text-red-500" v-if="errors.name">{{ errors.name }}</span> -->
        <CustomInput v-model="name" v-bind="nameAttrs" :error="errors.name" />
      </div>

      <div class="mb-4">
        <label for="lastname" class="form-label">Apellidos</label>
        <CustomInput
          v-model="lastname"
          v-bind="lastnameAttrs"
          :error="errors.lastname"
        />
      </div>

      <div class="mb-4">
        <label for="phone" class="form-label">Celular</label>
        <CustomInput
          v-model.number="phone"
          v-bind="phoneAttrs"
          :error="errors.phone"
        />
      </div>

      <div class="mb-4">
        <label for="email" class="form-label">Correo Electronico</label>
        <CustomInput
          v-model="email"
          v-bind="emailAttrs"
          :error="errors.email"
        />
      </div>

      <!-- <div class="flex flex-row gap-3">
        <div class="mb-4">
          <label for="price" class="form-label">Precio</label>
          <input type="number" id="price" class="form-control" />
        </div>

        <div class="mb-4">
          <label for="stock" class="form-label">Inventario</label>
          <input type="number" id="stock" class="form-control" />
        </div>
      </div> -->
      <!-- <div class="mb-4">
        <label for="stock" class="form-label">Género</label>
        <select class="form-control">
          <option value="">Seleccione</option>
          <option value="2">LECTURADOR</option>
          <option value="1">ADMINISTRADOR</option>
        </select>
      </div> -->
    </div>
    <button class="btn btn-primary" type="submit">Guardar</button>
  </form>
  <div class="grid grid-cols-2">
    <pre class="bg-blue-200 p-2">
      {{ values }}
    </pre>
    <pre class="bg-red-200 p-2">
      {{ errors }}
    </pre>
  </div>
</template>
<script src="./UsuarioForm.ts" lang="ts"></script>

<style scoped>
.form-label {
  @apply block text-gray-700 text-sm font-bold mb-2;
}
</style>
