import { Button } from '@/components/ui/button'
import { generatedCodeAtom } from '@/stores/generated-code-atom'
import { useRecoilValue } from 'recoil'
import CodeBlock from './code-block'

export default function codeView() {
  // state
  const generatedCode = useRecoilValue(generatedCodeAtom)

  // ファイル生成機能は使用しない想定のため一旦コメントアウト
  // // テンプレートファイルを読み込む関数
  // const readTemplateFile = async (filePath: string) => {
  //   try {
  //     const response = await fetch(filePath)
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok')
  //     }
  //     const text = await response.text()
  //     return text
  //   } catch (error) {
  //     console.error('Failed to fetch template:', error)
  //     return ''
  //   }
  // }

  // // データをテンプレートに埋め込む関数
  // const populateTemplate = (
  //   template: string,
  //   data: { [key: string]: string }
  // ): string => {
  //   let result = template
  //   for (const key in data) {
  //     const placeholder = `{{${key}}}`
  //     result = result.replace(new RegExp(placeholder, 'g'), data[key])
  //   }
  //   return result
  // }

  // // JSXファイルを生成する関数
  // const generateJSXFile = async (
  //   templatePath: string,
  //   data: { [key: string]: string }
  // ) => {
  //   try {
  //     const template = await readTemplateFile(templatePath)
  //     const populatedTemplate = populateTemplate(template, data)
  //     const blob = new Blob([populatedTemplate], { type: 'text/plain' })
  //     const url = window.URL.createObjectURL(blob)
  //     const a = document.createElement('a')
  //     a.href = url
  //     a.download = 'sample.tsx'
  //     document.body.appendChild(a)
  //     a.click()
  //     document.body.removeChild(a)
  //     window.URL.revokeObjectURL(url)
  //     console.log(`JSX file has been generated`)
  //   } catch (error) {
  //     console.error('Error generating JSX file:', error)
  //   }
  // }

  return (
    <>
      <CodeBlock codeType="JSX">{generatedCode}</CodeBlock>
      {/* <Button
        style={{ marginTop: '20px' }}
        onClick={() =>
          generateJSXFile('/template.txt', {
            className: 'TestComponent',
            functionTemplate: "const test: string ='aiueo' ",
            jsxTemplate: generatedCode
          })
        }
      >
        ファイル生成
      </Button> */}
    </>
  )
}
