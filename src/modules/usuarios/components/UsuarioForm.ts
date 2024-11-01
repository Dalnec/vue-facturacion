import { defineComponent, watch, watchEffect } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { getUsuarioByIdAction } from '../actions'
import CustomInput from '@/modules/common/components/CustomInput.vue'

const validationSchema = yup.object({
  family: yup.string().required(),
  address: yup.string().required(),
  ci: yup.string().required().min(7),
  name: yup.string().required(),
  lastname: yup.string().required(),
  phone: yup.number().required(),
  email: yup.string().email(),
})

export default defineComponent({
  components: { CustomInput },
  props: {
    usuarioId: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const {
      data: usuario,
      isError,
      isLoading,
    } = useQuery({
      queryKey: ['usuario', +props.usuarioId],
      queryFn: () => getUsuarioByIdAction(+props.usuarioId),
      retry: false,
    })

    const { values, defineField, errors, handleSubmit, resetForm } = useForm({
      validationSchema,
    })

    const [family, familyAttrs] = defineField('family')
    const [address, addressAttrs] = defineField('address')
    const [ci, ciAttrs] = defineField('ci')
    const [name, nameAttrs] = defineField('name')
    const [lastname, lastnameAttrs] = defineField('lastname')
    const [phone, phoneAttrs] = defineField('phone')
    const [email, emailAttrs] = defineField('email')

    const onSubmit = handleSubmit(values => {
      console.log(values)
    })

    watchEffect(() => {
      if (isError.value && !isLoading.value) {
        // router.replace('/admin/products');
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

    return {
      usuario,
      isError,
      isLoading,
      errors,
      values,

      family,
      address,
      ci,
      name,
      lastname,
      phone,
      email,
      familyAttrs,
      addressAttrs,
      ciAttrs,
      nameAttrs,
      lastnameAttrs,
      phoneAttrs,
      emailAttrs,

      onSubmit,
    }
  },
})
