import {
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ElementModel } from '@/shared/models/generator'
import { zodResolver } from '@hookform/resolvers/zod'
import { ControllerRenderProps, UseFormReturn, useForm } from 'react-hook-form'
import { z } from 'zod'
import { inputSchema } from './generate-element-group'

interface Props extends ElementModel {
  isPreview: boolean
  form: UseFormReturn<z.infer<typeof inputSchema>>
  objKey: string
}

const GenerateInput = ({ ...props }: Props) => {
  const createLabel = () => {
    return props.isPreview ? (
      <FormLabel className="w-32">{props.displayName}</FormLabel>
    ) : (
      `
      <FormLabel className="w-32">${props.displayName}</FormLabel>`
    )
  }

  const createInput = (
    field: ControllerRenderProps<
      {
        input: string
        button: string
        select: string
        radio: string
      },
      'input'
    > | null = null
  ) => {
    return props.isPreview ? (
      <Input className="w-80" type="text" {...field} />
    ) : (
      `
      <Input className="w-60" type="text" {...field} />`
    )
  }

  return (
    <>
      {props.isPreview ? (
        <FormField
          control={props.form.control}
          name={'input'}
          render={({ field }) => (
            <FormItem>
              {createLabel()}
              <FormControl>
                {/* TODO field as anyとしてエラーを消しているが見直しが必要 */}
                {createInput(field)}
              </FormControl>
            </FormItem>
          )}
        />
      ) : (
        <>
          {`
          <FormField
          control={form.control}
          name="${props.objKey}"
          render={({ field }) => (
            <FormItem>
              ${createLabel()}
              <FormControl>
                ${createInput()}
              </FormControl>
            </FormItem>
          )}
        />`}
        </>
      )}
    </>
  )
}

export default GenerateInput
