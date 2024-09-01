import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { ElementModel } from '@/shared/models/generator'
import { Label } from '@radix-ui/react-label'

interface Props extends ElementModel {
  isPreview: boolean
}

const GenerateSelect = ({ ...props }: Props) => {
  const createLabel = () => {
    return props.isPreview ? (
      <Label className="w-32">{props.displayName}</Label>
    ) : (
      `
      <Label className="w-32">${props.displayName}</Label>`
    )
  }

  const createSelect = () => {
    return props.isPreview ? (
      <Select>
        <SelectTrigger className="w-60">
          <SelectValue placeholder="選択してください" />
        </SelectTrigger>
        <SelectContent>
          {[...props.selectList].map((val) => (
            <SelectItem key={val.value} value={val.value}>
              {val.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    ) : (
      `
      <Select>
      <SelectTrigger>
        <SelectValue placeholder="選択してください" />
      </SelectTrigger>
      <SelectContent>
      ${[...props.selectList].map(
        (val) => `<SelectItem value="${val.value}">${val.name}</SelectItem>`
      )}
      </SelectContent>
    </Select>`
    )
  }

  return (
    <div className="flex items-center justify-start space-x-4">
      {createLabel()}
      {createSelect()}
    </div>
  )
}

export default GenerateSelect
