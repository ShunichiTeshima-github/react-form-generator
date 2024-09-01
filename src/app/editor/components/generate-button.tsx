import { Button } from '@/components/ui/button'
import { ElementModel } from '@/shared/models/generator'

interface Props extends ElementModel {
  isPreview: boolean
}

const GenerateButton = ({ ...props }: Props) => {
  const createButton = () => {
    return props.isPreview ? (
      <Button className="w-16">{props.displayName}</Button>
    ) : (
      `
      <Button className="w-16">${props.displayName}</Button>`
    )
  }

  return (
    <div className="flex items-center justify-start space-x-4">
      {createButton()}
    </div>
  )
}

export default GenerateButton
