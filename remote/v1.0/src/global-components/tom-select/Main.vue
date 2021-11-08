<template>
  <select v-select="{ props, emit, computedOptions }" class="tom-select">
    <slot></slot>
  </select>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { setValue, init, reInit } from './index'

export default defineComponent({
  directives: {
    select: {
      mounted(el, { value }) {
        setValue(el, value.props)
        init(el, value.emit, value.computedOptions)
      },
      updated(el, { value }) {
        setValue(el, value.props)
        reInit(el, value.props, value.emit, value.computedOptions)
      }
    }
  },
  props: {
    options: {
      type: Object,
      default() {
        return {}
      }
    },
    modelValue: {
      type: [String, Number, Array],
      default: ''
    }
  },
  setup(props, context) {
    const computedOptions = computed(() => {
      let options = {
        ...props.options,
        plugins: {
          dropdown_input: {},
          ...props.options.plugins
        }
      }

      if (Array.isArray(props.modelValue)) {
        options = {
          persist: false,
          create: true,
          onDelete: function(values) {
            return confirm(
              values.length > 1
                ? 'Are you sure you want to remove these ' +
                    values.length +
                    ' items?'
                : 'Are you sure you want to remove "' + values[0] + '"?'
            )
          },
          ...options,
          plugins: {
            remove_button: {
              title: 'Remove this item'
            },
            ...options.plugins
          }
        }
      }

      return options
    })

    return {
      props,
      ...context,
      computedOptions
    }
  }
})
</script>
