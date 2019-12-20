module.exports = {
  arrayUnique (array) {
    let temp = []
    let index = []
    let l = array.length
    for (let i = 0; i < l; i++) {
      for (let j = i + 1; j < l; j++) {
        if (array[i] === array[j]) {
          i++
          j = i
        }
      }
      temp.push(array[i])
      index.push(i)
    }
    return temp
  }
}
