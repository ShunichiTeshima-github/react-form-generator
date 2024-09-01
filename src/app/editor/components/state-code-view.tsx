import { generatorDocumentsAtom } from '@/stores/generator-documents-atom'
import { useRecoilValue } from 'recoil'
import useGenerator from '../../../../hooks/use-generator'
import { useEffect, useState } from 'react'
import CodeBlock from './code-block'

interface Props {}

const StateCodeView: React.FC<Props> = ({ ...Props }) => {
  // 生成テンプレート
  const strTemplate: string = '{{key}}: {{definition}}, \n'
  const [stateCode, setStateCode] = useState<string>('')

  // state
  const generatorDocuments = useRecoilValue(generatorDocumentsAtom)

  const { elements } = useGenerator(generatorDocuments, '/work')

  useEffect(() => {
    const asyncFunc = async () => {
      let setCode: string = ''
      Object.entries(elements)
        .sort((a, b) => a[1].displayOrder - b[1].displayOrder)
        .map(([key, value]) => {
          if (value.type === 'input') {
            if (key.includes('Number')) {
              setCode = setCode.concat(`\t${key}: z.number(),\n`)
            } else {
              setCode = setCode.concat(`\t${key}: z.string(),\n`)
            }
          } else if (value.type === 'select') {
            setCode = setCode.concat(`\t${key}: z.array(z.string()),\n`)
          } else if (value.type === 'radio') {
            setCode = setCode.concat(`\t${key}: z.array(z.string()),\n`)
          }
        })
      let result = await readTemplateFile('/template2.txt')
      const placeholder = `{{formDefinition}}`
      result = result.replace(new RegExp(placeholder, 'g'), setCode)
      setStateCode(result)
    }

    asyncFunc()
  }, [elements])

  // テンプレートファイルを読み込む関数
  const readTemplateFile = async (filePath: string) => {
    try {
      const response = await fetch(filePath)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const text = await response.text()
      return text
    } catch (error) {
      console.error('Failed to fetch template:', error)
      return ''
    }
  }

  return <>{stateCode && <CodeBlock codeType="State">{stateCode}</CodeBlock>}</>
}

export default StateCodeView
