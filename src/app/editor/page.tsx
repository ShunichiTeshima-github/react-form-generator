'use client'

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '@/components/ui/resizable'
import { ScrollArea } from '@/components/ui/scroll-area'
import Setter from './components/setter'
import CodeView from './components/code-view'
import Preview from './components/preview'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
import { useEditorAction } from '@/hooks/actions/use-editor-action'
import { isPreviewAtom } from '@/stores'
import { RecoilRoot, useRecoilValue } from 'recoil'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import StateCodeView from './components/state-code-view'

export default function Editor() {
  // state
  const isPreviewMode = useRecoilValue(isPreviewAtom)

  // action
  const { changePreviewMode } = useEditorAction()
  // const { changeGeneratorDocuments, changeDefaultGeneratorDocuments } =
  //   generatorDocumentsAction()

  // useEffect(() => {
  //   const mockDocument: GeneratorModel = {
  //     paths: {
  //       '/work': {
  //         elements: {
  //           name: {
  //             type: 'input',
  //             displayName: '氏名'
  //           },
  //           title: {
  //             type: 'input',
  //             displayName: 'タイトル'
  //           }
  //         }
  //       }
  //     }
  //   }
  //   changeDefaultGeneratorDocuments(mockDocument)
  // }, [])

  useEffect(() => {}, [changePreviewMode])

  return (
    <RecoilRoot>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>
          <ScrollArea className="h-screen">
            <Setter></Setter>
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          <ScrollArea className="h-screen">
            <Tabs defaultValue="JSX_PREVIEW" className="w-[70%]">
              <TabsList className="w-150px">
                <TabsTrigger value="JSX_PREVIEW">Preview</TabsTrigger>
                <TabsTrigger value="JSX_CODE">Code</TabsTrigger>
                <TabsTrigger value="STATE_CODE">StateCode</TabsTrigger>
              </TabsList>
              <TabsContent value="JSX_PREVIEW">
                <Preview></Preview>
              </TabsContent>
              <TabsContent value="JSX_CODE">
                <CodeView></CodeView>
              </TabsContent>
              <TabsContent value="STATE_CODE">
                <StateCodeView></StateCodeView>
              </TabsContent>
            </Tabs>
            {/* {isPreviewMode ? <Preview></Preview> : <CodeView></CodeView>} */}
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </RecoilRoot>
  )
}
