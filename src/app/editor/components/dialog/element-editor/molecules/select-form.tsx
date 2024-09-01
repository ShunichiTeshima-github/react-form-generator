import {
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useFormContext } from 'react-hook-form'
import { formSchema, keyStr } from '../element-editor-dialog'
import { z } from 'zod'

interface props {
  formName: keyStr
  label: string
  placeholder: string
  children: React.ReactNode
}

const SelectForm: React.FC<props> = ({ ...props }) => {
  const form = useFormContext<z.infer<typeof formSchema>>()
  return (
    <FormField
      control={form.control}
      name={props.formName}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{props.label}</FormLabel>
          <FormControl>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value as string}
            >
              <SelectTrigger>
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
              <SelectContent>{props.children}</SelectContent>
            </Select>
          </FormControl>
        </FormItem>
      )}
    />
  )
}

export default SelectForm
