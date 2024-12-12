const getPathParts = (path) => path ? path.split('/') : []

const traversePath = (data, path, callback) => {
  const newData = { ...data }
  const parts = getPathParts(path)
  
  if (parts.length === 0) {
    return callback(newData, null, null)
  }

  let current = newData
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i]
    const isLast = i === parts.length - 1

    if (isLast) {
      return callback(current, part, newData)
    }
    current = current[part]
  }

  return newData
}

const confirmAction = (message) => window.confirm(message)

const promptName = (defaultValue = '') => window.prompt('Enter name:', defaultValue)

export { getPathParts, traversePath, confirmAction, promptName } 