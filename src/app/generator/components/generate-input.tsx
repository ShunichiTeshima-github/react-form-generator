import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ElementModel } from '@/shared/models/generator'
import { forwardRef } from 'react'

interface Props extends ElementModel {
  isPreview: boolean
}

const GenerateInput = ({ ...props }: Props) => {
  const createLabel = () => {
    return props.isPreview ? (
      <Label className="w-32">{props.displayName}</Label>
    ) : (
      `<Label className="w-32">${props.displayName}</Label>`
    )
  }

  const createInput = () => {
    return props.isPreview ? (
      <Input className="w-60" type="text" />
    ) : (
      `<Input className="w-60" type="text" />`
    )
  }

  return (
    <div className="flex items-center justify-start space-x-4">
      {createLabel()}
      {createInput()}
    </div>
  )
}

export default GenerateInput
