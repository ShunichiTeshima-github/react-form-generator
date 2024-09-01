import GenerateButton from './generate-button'
import { ElementModel } from '@/shared/models/generator'
import React from 'react'
import GenerateInput from './generate-input'
import GenerateSelect from './generate-select'
import GenerateRadioGroup from './generate-radio-group'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form } from '@/components/ui/form'

export interface GeneratorElementsHandles {
  createTemplate: () => string
}

interface Props {
  elements: { [x: string]: ElementModel }
  isPreview: boolean
}

export const inputSchema = z.object({
  input: z.string(),
  button: z.string(),
  select: z.string(),
  radio: z.string()
})

const GenerateElementGroup: React.FC<Props> = ({ ...props }) => {
  const form = useForm<z.infer<typeof inputSchema>>({
    resolver: zodResolver(inputSchema),
    defaultValues: {
      input: '',
      button: '',
      select: '',
      radio: ''
    }
  })

  return (
    <div className="flex flex-col gap-4 p-10">
      <Form {...form}>
        {Object.entries(props.elements)
          .sort((a, b) => {
            const aOrder = a[1].displayOrder
            const bOrder = b[1].displayOrder
            return aOrder - bOrder
          })
          .map(([key, element]) => {
            return (
              <React.Fragment key={key}>
                {element.type === 'input' ? (
                  <GenerateInput
                    key={key}
                    objKey={key}
                    form={form}
                    {...element}
                    isPreview={props.isPreview}
                  />
                ) : element.type === 'button' ? (
                  <GenerateButton
                    key={key}
                    {...element}
                    isPreview={props.isPreview}
                  />
                ) : element.type === 'select' ? (
                  <GenerateSelect
                    key={key}
                    {...element}
                    isPreview={props.isPreview}
                  />
                ) : (
                  <GenerateRadioGroup
                    key={key}
                    {...element}
                    isPreview={props.isPreview}
                  />
                )}
              </React.Fragment>
            )
          })}
      </Form>
    </div>
  )
}

export default GenerateElementGroup
