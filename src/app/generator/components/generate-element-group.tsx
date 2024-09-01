import GenerateInput from '@/app/generator/components/generate-input'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ElementModel } from '@/shared/models/generator'
import { forwardRef, useImperativeHandle } from 'react'

export interface GeneratorElementsHandles {
  createTemplate: () => string
}

interface Props {
  elements: { [x: string]: ElementModel }
  isPreview: boolean
}

const GenerateElementGroup: React.FC<Props> = ({ ...props }) => {
  return (
    <div className="flex flex-col gap-4 p-10">
      {Object.entries(props.elements).map(([key, element]) => {
        return (
          <GenerateInput key={key} {...element} isPreview={props.isPreview} />
        )
      })}
    </div>
  )
}

export default GenerateElementGroup
