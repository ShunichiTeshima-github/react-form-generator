import { atom } from 'recoil'

import { recoilAtomKeys } from '@/stores'

export const isPreviewAtom = atom<boolean>({
  key: recoilAtomKeys.IS_PREVIEW,
  default: false
})
