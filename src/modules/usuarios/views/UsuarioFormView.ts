import { defineComponent, watch, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import * as yup from 'yup'
import { useForm } from 'vee-validate'
import { useMutation, useQuery } from '@tanstack/vue-query'
import CustomInput from '@/modules/common/components/CustomInput.vue'
import { createUpdateUsuarioAction, getUsuarioByIdAction } from '../actions'
import { useToast } from 'vue-toastification'

const validationSchema = yup.object({
  family: yup.string().required(),
  address: yup.string().required(),
  ci: yup.string().required().min(7),
  names: yup.string().required(),
  lastnames: yup.string().required(),
  phone: yup.number().required().min(8),
  email: yup.string().email().nullable(),
})

export default defineComponent({
  components: { CustomInput },
  props: {
    usuarioId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter()
    const toast = useToast()

    const {
      data: usuario,
      isError,
      isLoading,
      refetch,
    } = useQuery({
      queryKey: ['usuario', props.usuarioId],
      queryFn: () => getUsuarioByIdAction(+props.usuarioId),
      retry: false,
    })

    const { values, defineField, errors, handleSubmit, resetForm, meta } =
      useForm({
        validationSchema,
      })

    const [family, familyAttrs] = defineField('family')
    const [address, addressAttrs] = defineField('address')
    const [ci, ciAttrs] = defineField('ci')
    const [names, namesAttrs] = defineField('names')
    const [lastnames, lastnamesAttrs] = defineField('lastnames')
    const [phone, phoneAttrs] = defineField('phone')
    const [email, emailAttrs] = defineField('email')

    const {
      mutate,
      isPending,
      isSuccess: isUpdateSuccess,
      data: updatedUsuario,
    } = useMutation({
      mutationFn: createUpdateUsuarioAction,
    })

    const onSubmit = handleSubmit(values => {
      mutate(values)
    })

    watchEffect(() => {
      if (isError.value && !isLoading.value) {
        router.replace('/usuarios')
        return
      }
    })

    watch(
      usuario,
      () => {
        if (!usuario) return

        resetForm({
          values: usuario.value,
        })
      },
      {
        deep: true,
        immediate: true,
      },
    )

    watch(isUpdateSuccess, value => {
      if (!value) return

      toast.success('Producto actualizado correctamente', {
        timeout: 2000,
      })
      router.replace(`/usuarios/form/${updatedUsuario.value!.id}`)

      resetForm({
        values: updatedUsuario.value,
      })
    })

    watch(
      () => props.usuarioId,
      () => {
        refetch()
      },
    )

    return {
      usuario,
      isError,
      isLoading,
      errors,
      values,
      meta,

      family,
      address,
      ci,
      names,
      lastnames,
      phone,
      email,
      familyAttrs,
      addressAttrs,
      ciAttrs,
      namesAttrs,
      lastnamesAttrs,
      phoneAttrs,
      emailAttrs,

      onSubmit,
      isPending,
    }
  },
})
