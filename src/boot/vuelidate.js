import * as methods from 'vuelidate/lib/validators'

export default ({ Vue }) => {
  Vue.prototype.$rules = {
    isValid: false,
    is (value, message) {
      message = message !== undefined ? message : false
      this.isValid = val => {
        let result
        switch (typeof value) {
          case 'string':
            result = String(val) === value
            break
          case 'number':
            result = Number(val) === value
            break
          default:
            result = val === value
        }
        return result
      }
      return this.isValid || message
    },
    required (message = false) {
      return val => {
        this.isValid = methods.required(val)
        return this.isValid || message
      }
    },
    length (length, message) {
      message = message !== undefined ? message : false
      return val => {
        this.isValid = val.length === length
        return this.isValid || message
      }
    },
    compare (compara, message) {
      message = message !== undefined ? message : false
      return val => {
        this.isValid = val === compara
        return this.isValid || message
      }
    },
    incluye (message) {
      message = message !== undefined ? message : false
      return val => {
        this.isValid = val.includes('{####}')
        return this.isValid || message
      }
    },
    minLength (length, message) {
      message = message !== undefined ? message : false
      return val => {
        this.isValid = methods.minLength(length)(val)
        return this.isValid || message
      }
    },
    maxLength (length, message) {
      message = message !== undefined ? message : false
      return val => {
        this.isValid = methods.maxLength(length)(val)
        return this.isValid || message
      }
    },
    minValue (value, message) {
      message = message !== undefined ? message : false
      return val => {
        this.isValid = methods.minValue(value)(val)
        return this.isValid || message
      }
    },
    maxValue (value, message) {
      message = message !== undefined ? message : false
      return val => {
        this.isValid = methods.maxValue(value)(val)
        return this.isValid || message
      }
    },
    between (min, max, message) {
      message = message !== undefined ? message : false
      return val => {
        this.isValid = methods.between(min, max)(val)
        return this.isValid || message
      }
    },
    alpha (message = false) {
      return val => {
        this.isValid = methods.alpha(val)
        return this.isValid || message
      }
    },
    alphaNum (message = false) {
      return val => {
        this.isValid = methods.alphaNum(val)
        return this.isValid || message
      }
    },
    numeric (message = false) {
      return val => {
        this.isValid = methods.numeric(val)
        return this.isValid || message
      }
    },
    integer (message = false) {
      return val => {
        this.isValid = methods.integer(val)
        return this.isValid || message
      }
    },
    decimal (message = false) {
      return val => {
        this.isValid = methods.decimal(val)
        return this.isValid || message
      }
    },
    email (message = false) {
      return val => {
        this.isValid = methods.email(val)
        return this.isValid || message
      }
    },
    url (message = false) {
      return val => {
        this.isValid = methods.ipAddress(val)
        return this.isValid || message
      }
    },
    or (...args) {
      let message = false
      if (typeof args[args.length - 1] === 'string') {
        message = args.pop()
      }
      return val => {
        this.isValid = methods.or(...args)(val)
        return this.isValid || message
      }
    },
    and (...args) {
      let message = false
      if (typeof args[args.length - 1] === 'string') {
        message = args.pop()
      }
      return val => {
        this.isValid = methods.and(...args)(val)
        return this.isValid || message
      }
    },
    not (rule, message = false) {
      return val => {
        this.isValid = methods.not(rule)(val)
        return this.isValid || message
      }
    }
  }
}
