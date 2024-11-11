<template>
  <div class="card glass w-full m-3">
    <div class="card-body px-6 pt-6 pb-0">
      <div class="flex justify-start items-center">
        <RouterLink to="/usuarios" class="btn btn-circle mr-4">
          <svg
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
                d="M11 6L5 12L11 18M18 6L12 12L18 18"
                stroke="#0284c7"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </g>
          </svg>
        </RouterLink>
        <div>
          <h2 class="card-title text-primary font-bold">Usuarios</h2>
          <p>
            Formulario de {{ values.id ? 'Edición' : 'Creación' }} de Usuario
          </p>
        </div>
        <!-- Boton de accion -->
      </div>

      <div class="flex justify-center w-full items-center">
        <div class="card bg-base-100 shadow-xl w-[60%]">
          <div class="card-body bg-white p-0 rounded-lg w-full">
            <form
              class="grid grid-cols-1 px-5 gap-4 py-4 w-full"
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
                  <label for="address" class="form-label">Código Medidor</label>
                  <CustomInput
                    v-model="code"
                    v-bind="codeAttrs"
                    :error="errors.code"
                  />
                </div>
                <div class="mb-4">
                  <label for="address" class="form-label">Última Lectura</label>
                  <CustomInput
                    v-model.number="last_measured"
                    v-bind="last_measuredAttrs"
                    :error="errors.last_measured"
                  />
                </div>

                <div class="card bg-gray-100 shadow-xl">
                  <div class="card-body py-3">
                    <h2 class="card-title">Representante:</h2>

                    <div class="mb-4">
                      <label for="ci" class="form-label"
                        >Carnet de Identidad</label
                      >
                      <CustomInput
                        v-model.number="ci"
                        v-bind="ciAttrs"
                        :error="errors.ci"
                      />
                    </div>

                    <div class="mb-4">
                      <label for="names" class="form-label">Nombre</label>
                      <CustomInput
                        v-model="names"
                        v-bind="namesAttrs"
                        :error="errors.names"
                      />
                    </div>

                    <div class="mb-4">
                      <label for="lastnames" class="form-label"
                        >Apellidos</label
                      >
                      <CustomInput
                        v-model="lastnames"
                        v-bind="lastnamesAttrs"
                        :error="errors.lastnames"
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
                      <label for="email" class="form-label"
                        >Correo Electronico</label
                      >
                      <CustomInput
                        v-model="email"
                        v-bind="emailAttrs"
                        :error="errors.email"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <button
                :disabled="isPending"
                class="btn btn-primary disabled:bg-gray-300"
                type="submit"
              >
                Guardar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./UsuarioFormView.ts" lang="ts"></script>
