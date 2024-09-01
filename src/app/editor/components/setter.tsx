import { Button } from '@/components/ui/button'
import {
  ComponentModel,
  ElementModel,
  GeneratorModel
} from '@/shared/models/generator'
import { useEffect, useRef, useState } from 'react'
import GenerateElementGroup from './generate-element-group'
import { renderToString } from 'react-dom/server'
import { useGenerateCodeAction } from '@/hooks/actions'
import GenerateElementList from './generate-element-list'
import { usePreviewCodeAction } from '@/hooks/actions/use-preview-code-action'
import ElementEditorDialog from './dialog/element-editor/element-editor-dialog'
import { useGeneratorDocumentsAction } from '@/hooks/actions/use-generator-documents-action'
import { generatorDocumentsAtom } from '@/stores/generator-documents-atom'
import { useRecoilValue } from 'recoil'

export default function Setter() {
  const [dispElements, setDispElements] = useState<{
    [x: string]: ElementModel
  }>({})

  // action
  const { changeGeneratedCode } = useGenerateCodeAction()
  const { changePreviewCode } = usePreviewCodeAction()
  const { setGeneratorDocuments } = useGeneratorDocumentsAction()

  // state
  const generatorDocuments = useRecoilValue(generatorDocumentsAtom)

  // const { elements } = useGenerator(generatorDocuments, '/work')

  useEffect(() => {
    // ファイル読み込み処理
    const mockDocument: GeneratorModel = {
      paths: {
        '/work': {
          elements: {
            name: {
              type: 'radio',
              displayName: '氏名',
              displayOrder: 2,
              selectList: [{ value: 'aiueo', name: 'あいうえお' }],
              radioSettings: [
                {
                  name: 'ラジオ',
                  value: 'radiosetting'
                },
                {
                  name: 'ラジオ2',
                  value: 'radiosetting2'
                },
                {
                  name: 'ラジオ3',
                  value: 'radiosetting3'
                }
              ],
              radioInitialValue: 'radiosetting2'
            },
            title: {
              type: 'input',
              displayName: 'タイトル',
              displayOrder: 1,
              selectList: [],
              radioSettings: [],
              radioInitialValue: ''
            }
          }
        }
      }
    }
    setGeneratorDocuments(mockDocument)
  }, [])

  // generatorModelの変更を検知して表示の変更
  useEffect(() => {
    if (Object.keys(generatorDocuments.paths).length > 0) {
      setDispElements(
        JSON.parse(JSON.stringify(generatorDocuments.paths['/work'].elements))
      )
    }
  }, [generatorDocuments])

  const submitRef = useRef(null!)

  const handleGenerate = () => {
    const component = (
      <GenerateElementGroup elements={dispElements} isPreview={false} />
    )

    changePreviewCode({ elements: dispElements })

    const string = renderToString(component)

    const parsedString = string
      .replaceAll('&lt;', '<')
      .replaceAll('&gt;', '>')
      .replaceAll('&quot;', '"')
      .replaceAll('class=', 'className=')
      .replaceAll('<!--', '') // TODO
      .replaceAll('-->', '') // TODO

    changeGeneratedCode(parsedString)
  }

  return (
    <div>
      <GenerateElementList
        elements={dispElements}
        isPreview={true}
      ></GenerateElementList>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ElementEditorDialog
          objKey={''}
          element={undefined}
        ></ElementEditorDialog>
        <Button
          style={{ marginLeft: '50px' }}
          ref={submitRef}
          onClick={handleGenerate}
        >
          コード生成
        </Button>
      </div>
    </div>
  )
}
