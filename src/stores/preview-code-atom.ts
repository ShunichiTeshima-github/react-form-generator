import { ComponentModel } from '@/shared/models/generator'
import { atom } from 'recoil'
import { recoilAtomKeys } from '@/stores'

export const previewCodeAtom = atom<ComponentModel>({
  key: recoilAtomKeys.PREVIEW_CODE,
  default: { elements: {} }
})
