'use client'

import { Input } from '@/components/ui/input'
import { GeneratorModel } from '@/shared/models/generator'
import { PageGenerator } from '@/shared/utils/page-generator'
import { Label } from '@/components/ui/label'
import useGenerator from '../../../hooks/use-generator'
import GenerateElementGroup, {
  GeneratorElementsHandles
} from '@/app/generator/components/generate-element-group'
import { Button } from '@/components/ui/button'
import { useRef } from 'react'
import templateElements from '@/app/generator/components/generate-element-group'
import { renderToString } from 'react-dom/server'

const mockDocument: GeneratorModel = {
  paths: {
    '/work': {
      elements: {
        name: {
          type: 'input',
          displayName: '氏名'
        },
        title: {
          type: 'input',
          displayName: 'タイトル'
        }
      }
    }
  }
}

const Generator: React.FC = () => {
  const { elements } = useGenerator(mockDocument, '/work')

  const submitRef = useRef(null!)

  const handleGenerate = () => {
    const component = (
      <GenerateElementGroup elements={elements} isPreview={false} />
    )

    const string = renderToString(component)

    const parsedString = string
      .replaceAll('&lt;', '<')
      .replaceAll('&gt;', '>')
      .replaceAll('&quot;', '"')
      .replaceAll('class=', 'className=')
      .replaceAll('<!--', '') // TODO
      .replaceAll('-->', '') // TODO

    console.log(parsedString)
  }

  return (
    <div>
      <GenerateElementGroup elements={elements} isPreview={true} />
      <Button ref={submitRef} onClick={handleGenerate}>
        生成
      </Button>
    </div>
  )
}

export default Generator
