import { Input } from '@/components/ui/input'
import { GeneratorModel } from '@/shared/models/generator'
import { PageGenerator } from '@/shared/utils/page-generator'

const mockDocument: GeneratorModel = {
  paths: {
    '/work': {
      elements: {
        title: {
          type: 'input',
          displayName: '表示用職種名'
        }
      }
    }
  }
}

const pageGenerator = new PageGenerator(mockDocument, '/work')

export default function SandBox() {
  return (
    <>
      <div>test</div>
      <Input type="email" placeholder="Email" />
      {'<div></div>'}
      {Object.keys(pageGenerator.elements).map((name, index) => {
        return <div key={index}>{pageGenerator.elements[name].displayName}</div>
      })}
    </>
  )
}
