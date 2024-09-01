import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio'
import { ElementModel } from '@/shared/models/generator'

interface Props extends ElementModel {
  isPreview: boolean
}

const GenerateRadioGroup: React.FC<Props> = ({ ...props }: Props) => {
  const createLabel = () => {
    return props.isPreview ? (
      <Label className="w-32">{props.displayName}</Label>
    ) : (
      `
      <Label className="w-32">${props.displayName}</Label>`
    )
  }

  const createRadio = () => {
    return props.isPreview ? (
      <RadioGroup
        className="flex items-center space-x-1"
        defaultValue={props.radioInitialValue}
      >
        {props.radioSettings.map((val) => (
          <div key={val.value} className="flex items-center space-x-2">
            <Label htmlFor={val.value}>{val.name}</Label>
            <RadioGroupItem value={val.value} id={val.name} />
          </div>
        ))}
      </RadioGroup>
    ) : (
      `
      <RadioGroup className="flex items-center space-x-1" defaultValue="comfortable">
      ${props.radioSettings.map(
        (val) =>
          `<div className="flex items-center space-x-2">
          <Label htmlFor="${val.value}">${val.name}</Label>
          <RadioGroupItem value="${val.value}" id="${val.name}" />
        </div>`
      )}
    </RadioGroup>
    `
    )
  }

  return (
    <div className="flex items-center justify-start space-x-4">
      {createLabel()}
      {createRadio()}
    </div>
  )
}

export default GenerateRadioGroup
