import { GeneratorModel } from '../models/generator'

export class PageGenerator {
  document!: GeneratorModel
  page!: string

  constructor(document: GeneratorModel, page: string) {
    this.document = document
    this.page = page
  }

  public get elements() {
    return this.document.paths[this.page].elements
  }
}
