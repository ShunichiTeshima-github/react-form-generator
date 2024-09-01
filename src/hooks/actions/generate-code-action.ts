import { useRecoilCallback } from 'recoil'

import { generatedCodeAtom } from '@/stores/generated-code-atom'

const generateCodeAction = () => {
  const changeGeneratedCode = useRecoilCallback(
    ({ set }) =>
      (generatedCode: string) => {
        set(generatedCodeAtom, generatedCode)
      }
  )

  return { changeGeneratedCode }
}

export { generateCodeAction }
