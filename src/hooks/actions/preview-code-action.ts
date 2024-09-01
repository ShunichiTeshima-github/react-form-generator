import { useRecoilCallback } from 'recoil'

import { previewCodeAtom } from '@/stores/preview-code-atom'
import { ComponentModel } from '@/shared/models/generator'

const previewCodeAction = () => {
  const changePreviewCode = useRecoilCallback(
    ({ set }) =>
      (previewCode: ComponentModel) => {
        set(previewCodeAtom, previewCode)
      }
  )

  return { changePreviewCode }
}

export { previewCodeAction }
