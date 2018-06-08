const fs = require('fs')

const randomizeBuzzwords = (buzzwords) => {
  const newBuzzwords = [...buzzwords]
  for(let i = 0; i < newBuzzwords.length; i++){
    let j = Math.floor(Math.random() * newBuzzwords.length)
    let temp = newBuzzwords[j]
    newBuzzwords[j] = newBuzzwords[i]
    newBuzzwords[i] = temp
  }
  return newBuzzwords
}


const formatBuzzwords = () => {
  const buzzwords = JSON.parse(fs.readFileSync(process.cwd() + '/buzzwords.json','utf-8'))
  const formattedBuzzwords = []
  const categories = Object.keys(buzzwords)
  categories.map(category => {
    formattedBuzzwords.push({
      category: category.toLowerCase(),
      words: randomizeBuzzwords(buzzwords[category].map(buzzword => buzzword.toLowerCase()))
    })
  })
  return {
    status: 'Success',
    data: formattedBuzzwords
  }
}

module.exports = {
  formatBuzzwords
}
