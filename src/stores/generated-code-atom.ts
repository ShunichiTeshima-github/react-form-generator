import { atom } from 'recoil'

import { recoilAtomKeys } from '@/stores'

export const generatedCodeAtom = atom<string>({
  key: recoilAtomKeys.GENERATED_CODE,
  default: ''
})
