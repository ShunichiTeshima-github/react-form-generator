import { useRecoilCallback } from 'recoil'
import { generatorDocumentsAtom } from '@/stores/generator-documents-atom'
import { ComponentModel, GeneratorModel } from '@/shared/models/generator'

const useGeneratorDocumentsAction = () => {
  //要素の追加・更新
  const changeGeneratorDocuments = useRecoilCallback(
    ({ snapshot, set }) =>
      async (generatorDocumentsCode: ComponentModel, prevKey: string) => {
        const currentDocuments: GeneratorModel = await snapshot.getPromise(
          generatorDocumentsAtom
        )
        const newObj = JSON.parse(JSON.stringify(currentDocuments))

        // 項目作成と項目修正の分岐
        if (prevKey) {
          delete newObj.paths['/work'].elements[prevKey]

          newObj.paths['/work'].elements[
            Object.keys(generatorDocumentsCode.elements)[0]
          ] = {
            type: generatorDocumentsCode.elements[
              Object.keys(generatorDocumentsCode.elements)[0]
            ].type,
            displayName:
              generatorDocumentsCode.elements[
                Object.keys(generatorDocumentsCode.elements)[0]
              ].displayName,
            displayOrder:
              generatorDocumentsCode.elements[
                Object.keys(generatorDocumentsCode.elements)[0]
              ].displayOrder,
            selectList:
              generatorDocumentsCode.elements[
                Object.keys(generatorDocumentsCode.elements)[0]
              ].selectList,
            radioSettings:
              generatorDocumentsCode.elements[
                Object.keys(generatorDocumentsCode.elements)[0]
              ].radioSettings
          }
        } else {
          const orderNumber =
            Object.keys(currentDocuments.paths['/work'].elements).length + 1

          newObj.paths['/work'].elements[
            Object.keys(generatorDocumentsCode.elements)[0]
          ] = {
            type: generatorDocumentsCode.elements[
              Object.keys(generatorDocumentsCode.elements)[0]
            ].type,
            displayName:
              generatorDocumentsCode.elements[
                Object.keys(generatorDocumentsCode.elements)[0]
              ].displayName,
            displayOrder: orderNumber,
            selectList:
              generatorDocumentsCode.elements[
                Object.keys(generatorDocumentsCode.elements)[0]
              ].selectList,
            radioSettings:
              generatorDocumentsCode.elements[
                Object.keys(generatorDocumentsCode.elements)[0]
              ].radioSettings
          }
        }
        console.log(newObj)
        set(generatorDocumentsAtom, newObj)
      }
  )

  //データの一括更新
  const setGeneratorDocuments = useRecoilCallback(
    ({ set }) =>
      (generatorDocumentsCode: GeneratorModel) => {
        set(generatorDocumentsAtom, generatorDocumentsCode)
      }
  )

  //要素の削除
  const deleteElementFromGeneratorDocuments = useRecoilCallback(
    ({ snapshot, set }) =>
      async (targetKey: string) => {
        const currentDocuments: GeneratorModel = await snapshot.getPromise(
          generatorDocumentsAtom
        )
        const newObj = JSON.parse(JSON.stringify(currentDocuments))

        delete newObj.paths['/work'].elements[targetKey]
        set(generatorDocumentsAtom, newObj)
      }
  )

  //　表示の入れ替え
  const changeDisplayOrder = useRecoilCallback(
    ({ snapshot, set }) =>
      async (dragOrder: number, dropOrder: number) => {
        const currentDocuments: GeneratorModel = await snapshot.getPromise(
          generatorDocumentsAtom
        )
        const newObj = JSON.parse(JSON.stringify(currentDocuments))
        Object.entries((newObj.paths['/work'] as ComponentModel).elements).map(
          ([_, element]) => {
            if (dragOrder === element.displayOrder) {
              element.displayOrder = dropOrder
            } else if (dropOrder === element.displayOrder) {
              element.displayOrder = dragOrder
            }
          }
        )
        set(generatorDocumentsAtom, newObj)
      }
  )

  return {
    changeGeneratorDocuments,
    setGeneratorDocuments,
    deleteElementFromGeneratorDocuments,
    changeDisplayOrder
  }
}

export { useGeneratorDocumentsAction }
