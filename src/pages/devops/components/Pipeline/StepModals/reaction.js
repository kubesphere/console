// import { get, set } from 'lodash'

import { orderBy, set, get, omit } from 'lodash'
// {
//   category: 'SCM',
//   name: 'switchCheckoutType',
//   display: 'Checkout Type',
//   type: 'radioGroup',
//   defaultValue: 'MANUAL_SET',
//   options: [
//     {
//       label: 'CODE_REPOSITORY',
//       value: 'CODE_REPOSITORY',
//     },
//     {
//       label: 'MANUAL_SET',
//       value: 'MANUAL_SET',
//     },
//   ],
//   reactions: [
//     {
//       target: 'url',
//       fulfill: {
//         state: {
//           display: '{{$self.value!=="CODE_REPOSITORY" ? "block" : "hidden"}}',
//         },
//       },
//     },
//     {
//       target: 'credentialsId',
//       fulfill: {
//         state: {
//           display: '{{$self.value!=="CODE_REPOSITORY" ? "block" : "none"}}',
//         },
//       },
//     },
//     {
//       target: 'codeRepository',
//       fulfill: {
//         state: {
//           display: '{{$self.value==="CODE_REPOSITORY" ? "block" : "none"}}',
//         },
//       },
//     },
//   ],
// },

export const defaultConfig = [
  {
    name: 'fromCodeRepository',
    type: 'importCodeRepo',
    reactions: JSON.stringify([
      {
        target: 'url',
        fulfill: {
          state: {
            value: '{{$context?.getRepoUrl?.($self.value)}}',
          },
        },
      },
      {
        target: 'credentialsId',
        fulfill: {
          state: {
            value: '{{$self.value?.secret}}',
          },
        },
      },
    ]),
  },
  {
    name: 'url',
    type: 'string',
    required: true,
    display: 'URL',
  },
  {
    name: 'credentialsId',
    type: 'secret',
    display: 'Credential Name',
  },
  {
    name: 'codeRepository',
    type: 'codeRepository',
    required: true,
    display: 'CODE_REPO',
  },
  {
    name: 'branch',
    type: 'string',
    required: true,
    display: 'Branch',
    defaultValue: 'master',
  },
]

export function runTemplate(template, values) {
  const reg = /^\s*\{\{([\s\S]*)\}\}\s*$/
  if (reg.test(template)) {
    const res = []
    const tmp = template.replace(reg, (_, expression) => {
      try {
        // eslint-disable-next-line
        const result = new Function('root', `with(root) {return ${expression}}`)(values)
        if (typeof result === 'object') {
          res.push(result)
          return `res[${res.length - 1}]`
        }
        return result
      } catch (error) {
        console.error('Error evaluating expression:', error)
        return 'undefined'
      }
    })
    // return undefined
    try {
      if (res.length) {
        // eslint-disable-next-line
    let re = new Function('root', `with(root) {return ${tmp}}`)({ res, ...values })
        return re
      }
      return tmp
    } catch (e) {
      return undefined
    }
  }
  return template
}

export class Reaction {
  state = {}

  values = {}

  config = []

  context = {}

  constructor(update, context = {}) {
    this.update = update
    this.context = context
    this.reactions = {
      display: this.handleDisplayChange.bind(this),
      value: this.handleChangeValue.bind(this),
    }
  }

  init = (_config, values) => {
    const config = _config.map(i => ({
      ...i,
      reactions: i.reactions ? JSON.parse(i.reactions) : [],
    }))
    this.config = config
    let idx = 0
    const state = []
    const v = {}
    const fns = []
    config.forEach(i => {
      if (get(values, i.name) !== undefined) {
        set(v, i.name, values[i.name])
      }
      state[i.name] = {
        order: idx++,
        display: 'block',
        value: get(values, i.name),
        reactions: i.reactions ?? [],
        'x-props': i,
      }
      fns.push(() => {
        this.handleValueChange(
          {
            key: i.name,
            value: get(values, i.name),
          },
          true
        )
      })
    })

    this.state = state
    this.values = v
    fns.forEach(fn => fn())
  }

  setValues = (k, v) => {
    if (v !== undefined) {
      set(this.values, k, v)
    } else {
      this.values = omit(this.values, k)
    }
  }

  handleValueChange = (kv, isInit = false) => {
    const { state } = this
    this.setValues(kv.key, kv.value)
    this.state[kv.key].value = kv.value
    const { reactions } = state[kv.key]
    reactions?.forEach(i => {
      this.getStateByReaction(i, state[kv.key], isInit)
    })
  }

  getStateByReaction = (reaction, self, isInit = false) => {
    const { target, fulfill } = reaction
    const fns = []

    Object.entries(fulfill.state).forEach(([key, temp]) => {
      if (!(isInit && key === 'value')) {
        const fn = this.reactions[key]
        const value = runTemplate(temp, { $self: self, $context: this.context })
        if (this.state[target]) {
          this.state[target][key] = value
          fn && fns.push(() => fn(target, value))
        }
      }
    })
    // this.state = state
    fns.forEach(fn => fn())
  }

  handleFieldValueChange = (key, value) => {
    if (!this.state[key]) {
      return
    }
    this.handleValueChange({ key, value })
    this.update?.()
  }

  handleChangeValue = (key, value) => {
    this.handleValueChange({ key, value })
  }

  handleDisplayChange = (key, value) => {
    if (value !== 'none') {
      this.handleValueChange({ key, value: this.state[key].value })
    } else {
      this.handleValueChange({ key, value: undefined })
    }
  }

  getValues = () => {
    return this.values
  }

  getFields = () => {
    return orderBy(Object.values(this.state), 'order').reduce((acc, cur) => {
      if (cur.display === 'block') {
        acc.push(cur['x-props'])
      }
      return acc
    }, [])
  }
}
