const getPathParts = (path) => path ? path.split('/') : []

const findNestedPath = (data, path) => {
  const parts = getPathParts(path)
  let current = data

  for (const part of parts) {
    if (current[part] === undefined) return null
    current = current[part]
  }

  return current
}

const createPath = (data, path, value = []) => {
  const parts = getPathParts(path)
  let current = data

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i]
    
    if (i === parts.length - 1) {
      current[part] = value
      return
    }

    if (current[part] === undefined) {
      current[part] = {}
    }
    current = current[part]
  }
}

const confirmAction = (message) => window.confirm(message)

const promptName = (defaultValue = '') => window.prompt('Enter name:', defaultValue)

export { getPathParts, findNestedPath, createPath, confirmAction, promptName }