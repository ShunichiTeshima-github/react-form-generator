import { useRecoilValue } from 'recoil'
import GenerateElementGroup from './generate-element-group'
import { previewCodeAtom } from '@/stores/preview-code-atom'

export default function Preview() {
  // state
  const previewCode = useRecoilValue(previewCodeAtom)
  return (
    <>
      {Object.keys(previewCode.elements).length !== 0 ? (
        <GenerateElementGroup
          elements={previewCode.elements}
          isPreview={true}
        ></GenerateElementGroup>
      ) : (
        <p>生成したコードを確認します。</p>
      )}
    </>
  )
}
