import { atom } from 'recoil'

import { recoilAtomKeys } from '@/stores'
import { GeneratorModel } from '@/shared/models/generator'

export const generatorDocumentsAtom = atom<GeneratorModel>({
  key: recoilAtomKeys.DOCUMENTS_CODE,
  default: { paths: {} }
})
