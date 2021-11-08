import TomSelect from 'tom-select'

const setValue = (el, props) => {
  if (props.modelValue.length) {
    cash(el).val(props.modelValue)
  }
}

const init = (el, emit, computedOptions) => {
  el.TomSelect = new TomSelect(el, computedOptions)
  el.TomSelect.on('change', function(selectedItems) {
    console.log(selectedItems)
    emit('update:modelValue', selectedItems)
  })
}

const reInit = (el, props, emit, computedOptions) => {
  el.TomSelect.destroy()
  setValue(el, props)
  init(el, emit, computedOptions)
}

export { setValue, init, reInit }
