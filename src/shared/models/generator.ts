export interface SelectOption {
  name: string
  value: string
}

export interface RadioOption {
  name: string
  value: string
}

export interface ElementModel {
  type: string
  displayName: string
  displayOrder: number
  selectList: SelectOption[]
  radioSettings: RadioOption[]
  radioInitialValue: string
}

export interface ComponentModel {
  elements: {
    [x: string]: ElementModel
  }
}

export interface GeneratorModel {
  paths: { [x: string]: ComponentModel }
}
