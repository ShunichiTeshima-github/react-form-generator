import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form } from '@/components/ui/form'
import { DialogClose } from '@radix-ui/react-dialog'
import { ElementModel } from '@/shared/models/generator'
import { useGeneratorDocumentsAction } from '@/hooks/actions/use-generator-documents-action'
import SelectEditor from './organisms/select-editor'
import CommonEditor from './organisms/common-editor'
import RadioEditor from './organisms/radio-editor'

const selectSchema = z.object({
  name: z.string(),
  value: z.string()
})

const radioSchema = z.object({
  name: z.string(),
  value: z.string()
})

export const formSchema = z.object({
  key: z.string().min(1, 'Key is required'),
  type: z.string().min(1, 'type is required'),
  displayName: z.string().min(1, 'displayName is required'),
  displayOrder: z.number(),
  selectList: z.array(selectSchema),
  radioSettings: z.array(radioSchema),
  radioInitialValue: z.string()
})

interface props {
  objKey: string
  element: ElementModel | undefined
}

// 項目増やすとエラーとなるので見直しが必要
export type keyStr =
  | 'type'
  | 'key'
  | 'displayName'
  | 'displayOrder'
  | 'selectList'
  | 'radioSettings'
  | 'radioInitialValue'

const ElementEditorDialog: React.FC<props> = ({ objKey, element }) => {
  //action
  const { changeGeneratorDocuments } = useGeneratorDocumentsAction()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      key: objKey ? objKey : '',
      type: element && element.type ? element.type : '',
      displayName: element && element.displayName ? element.displayName : '',
      displayOrder: element && element.displayOrder ? element.displayOrder : 0,
      selectList: element && element.selectList ? element.selectList : [],
      radioSettings:
        element && element.radioSettings ? element.radioSettings : [],
      radioInitialValue: ''
    }
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    changeGeneratorDocuments(
      {
        elements: {
          [values.key]: {
            type: values.type,
            displayName: values.displayName,
            displayOrder: element?.displayOrder ? element?.displayOrder : 0,
            selectList: values.selectList,
            radioSettings: values.radioSettings,
            radioInitialValue: values.radioInitialValue
          }
        }
      },
      objKey
    )
  }

  // フォームの初期化を実施
  const onOpenDialog = () => {
    if (element) {
      Object.entries(element).map(([key, val]) => {
        form.setValue(key as keyStr, val)
      })
    } else {
      form.reset()
    }
  }

  return (
    <>
      <Dialog
        onOpenChange={(open) => {
          if (open) onOpenDialog()
        }}
      >
        <DialogTrigger asChild>
          {element ? (
            <Button variant="outline">詳細</Button>
          ) : (
            <Button variant="outline">要素を追加</Button>
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[1200px]">
          <DialogHeader>
            <DialogTitle>要素を追加</DialogTitle>
            <DialogDescription>生成したい項目を追加します。</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CommonEditor></CommonEditor>
              <SelectEditor></SelectEditor>
              <RadioEditor></RadioEditor>
              <DialogFooter>
                <DialogClose
                  disabled={!form.formState.isValid}
                  style={{ marginTop: '10px' }}
                  type="submit"
                >
                  追加
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ElementEditorDialog
