import { SelectItem } from '@/components/ui/select'
import { useFormContext } from 'react-hook-form'
import { z } from 'zod'
import { formSchema } from '../element-editor-dialog'
import InputForm from '../molecules/input-form'
import SelectForm from '../molecules/select-form'

const CommonEditor: React.FC = () => {
  const form = useFormContext<z.infer<typeof formSchema>>()

  return (
    <>
      <InputForm formName="key" label="キー" placeholder="userName" />
      <SelectForm formName="type" label="タイプ" placeholder="選択してください">
        <SelectItem value="input">Input</SelectItem>
        <SelectItem value="button">Button</SelectItem>
        <SelectItem value="select">Select</SelectItem>
        <SelectItem value="radio">Radio</SelectItem>
      </SelectForm>
      <InputForm formName="displayName" label="表示名" placeholder="お名前" />
    </>
  )
}

export default CommonEditor
