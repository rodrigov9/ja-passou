function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

const exceptions = [
  'de',
  'da',
  'do',
  'das',
  'dos',
  'e',
  'em',
  'na',
  'no',
  'nas',
  'nos',
  'a',
  'o',
  'as',
  'os',
  'por',
  'com',
  'para'
]

const acronyms = ['CP']

export function formatName(name: string) {
  return name
    .toLowerCase()
    .replace(/(^|[\s-.])([\wÀ-ÿ]+)/g, (_match, separator, word, offset) => {
      if (acronyms.includes(word.toUpperCase()))
        return separator + word.toUpperCase()

      if (
        offset === 0 ||
        (separator === '-' && word.length === 1) ||
        !exceptions.includes(word)
      ) {
        return separator + capitalize(word)
      }

      return separator + word
    })
}
