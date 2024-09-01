import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { ElementModel } from '@/shared/models/generator'
import ElementEditorDialog from './dialog/element-editor/element-editor-dialog'
import { useGeneratorDocumentsAction } from '@/hooks/actions/use-generator-documents-action'
import { useState } from 'react'

interface Props {
  elements: { [x: string]: ElementModel }
  isPreview: boolean
}

const GenerateElementList: React.FC<Props> = ({ ...props }) => {
  const [startOrder, setStartOrder] = useState<number>(0)
  const [endOrder, setEndOrder] = useState<number>(0)

  // action
  const { deleteElementFromGeneratorDocuments, changeDisplayOrder } =
    useGeneratorDocumentsAction()

  const deleteElement = (key: string) => {
    deleteElementFromGeneratorDocuments(key)
  }

  const onDragStart = (startOrder: number) => {
    setStartOrder(startOrder)
  }

  const onDragEnter = (enterOrder: number) => {
    setEndOrder(enterOrder)
  }

  const onDragEnd = () => {
    if (startOrder === endOrder) return
    changeDisplayOrder(startOrder, endOrder)
  }

  return (
    <div className="flex flex-col gap-4 p-10">
      <>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]"></TableHead>
              <TableHead>物理名</TableHead>
              <TableHead>タイプ</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(props.elements)
              .sort((a, b) => {
                const aOrder = a[1].displayOrder
                const bOrder = b[1].displayOrder
                return aOrder - bOrder
              })
              .map(([key, element]) => {
                return (
                  <TableRow
                    draggable={true}
                    onDragStart={() => onDragStart(element.displayOrder)}
                    onDragEnter={() => onDragEnter(element.displayOrder)}
                    onDragOver={(event) => event.preventDefault()}
                    onDragEnd={() => onDragEnd()}
                    key={key}
                  >
                    <TableCell className="font-medium">
                      {/* <Button variant="outline">詳細</Button> */}
                      <ElementEditorDialog
                        objKey={key}
                        element={element}
                      ></ElementEditorDialog>
                    </TableCell>
                    <TableCell>{key}</TableCell>
                    <TableCell>{element.type}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => deleteElement(key)}
                        variant="outline"
                      >
                        削除
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
        <div style={{ display: 'flex' }}></div>
      </>
    </div>
  )
}

export default GenerateElementList
