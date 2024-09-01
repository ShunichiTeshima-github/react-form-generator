import { useFieldArray, useFormContext } from 'react-hook-form'
import { z } from 'zod'
import { formSchema } from '../element-editor-dialog'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import SelectForm from '../molecules/select-form'
import { SelectItem } from '@/components/ui/select'

const RadioEditor: React.FC = () => {
  const form = useFormContext<z.infer<typeof formSchema>>()
  const { fields, append, remove } = useFieldArray({
    name: 'radioSettings',
    control: form.control
  })

  const addSelectOption = () => {
    append({ name: '', value: '' })
  }

  const deleteSelectOption = (index: number) => {
    remove(index)
  }
  return (
    <>
      {form.watch('type') === 'radio' && (
        <>
          <FormLabel>ラジオグループ</FormLabel>
          <br />
          {fields.map((val, index) => (
            <div key={val.id} className="flex">
              <FormField
                control={form.control}
                name={`radioSettings.${index}.name`}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="mt-2 w-80 mr-2"
                          placeholder={`表示用要素名${index + 1}`}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )
                }}
              />
              <FormField
                control={form.control}
                name={`radioSettings.${index}.value`}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <div className="flex">
                        <FormControl>
                          <Input
                            className="mt-2 w-80"
                            placeholder={`選択時の値${index + 1}`}
                            {...field}
                          />
                        </FormControl>
                      </div>
                    </FormItem>
                  )
                }}
              />
              <Button
                className="mt-2 ml-20"
                type="button"
                onClick={() => deleteSelectOption(index)}
              >
                削除
              </Button>
            </div>
          ))}
          <Button
            variant={'secondary'}
            className="mt-2"
            size={'sm'}
            type="button"
            onClick={addSelectOption}
          >
            項目追加
          </Button>
          <SelectForm
            formName={`radioInitialValue`}
            label="初期選択設定"
            placeholder="選択してください"
          >
            {form
              .watch('radioSettings')
              .filter((val) => val.value && val.name)
              .map((item) => (
                <SelectItem key={item.value} id={item.value} value={item.value}>
                  {item.name}
                </SelectItem>
              ))}
          </SelectForm>
        </>
      )}
    </>
  )
}

export default RadioEditor
