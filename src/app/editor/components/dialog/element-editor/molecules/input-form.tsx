import {
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useFormContext } from 'react-hook-form'
import { z } from 'zod'
import { formSchema, keyStr } from '../element-editor-dialog'

interface props {
  formName: keyStr
  label: string
  placeholder: string
}

const InputForm: React.FC<props> = ({ ...props }) => {
  const form = useFormContext<z.infer<typeof formSchema>>()
  return (
    <FormField
      control={form.control}
      name={props.formName}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{props.label}</FormLabel>
          <FormControl>
            {/* TODO field as anyとしてエラーを消しているが見直しが必要 */}
            <Input placeholder={props.placeholder} {...(field as any)} />
          </FormControl>
        </FormItem>
      )}
    />
  )
}

export default InputForm
