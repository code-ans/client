import Router from 'vue-router'

function getValue (value) {
  return typeof value === 'number' ? value.toString() : value
}

Router.prototype.hasMatched = function ({name, params}) {
  const route = this.app.$route
  const hasMatched = route.matched.findIndex(
    route => route.name === name
  ) !== -1

  if (!hasMatched || !params) return hasMatched

  for (let key in params) {
    if (
      getValue(params[key]) !==
      getValue(route.params[key])
    ) {
      return false
    }
  }

  return true
}

export default Router
