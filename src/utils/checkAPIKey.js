const checkAPIKey = (key_header, key_local) => {
  if (key_header === key_local) {
    return true
  }
  return false
}

export default checkAPIKey
