import { useRecoilCallback, useRecoilState } from 'recoil'

import { isPreviewAtom } from '@/stores'

/*
|--------------------------------------------------------------------------
| useEditorAction
|--------------------------------------------------------------------------
| editor関連のアクションフック
*/
const useEditorAction = () => {
  const changePreviewMode = useRecoilCallback(
    ({ set }) =>
      (isPreview: boolean) => {
        set(isPreviewAtom, isPreview)
      }
  )

  return { changePreviewMode }
}

export { useEditorAction }
