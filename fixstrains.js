const fs = require('fs')

const updatedStrains = JSON.parse(fs.readFileSync(process.cwd() + '/strains.json','utf-8')).map(strain => {
  return {
    name: strain.name,
    url: strain.url,
    category: strain.category.toLowerCase(),
    effects: strain.effects.map(word => word.toLowerCase()),
    flavor: strain.flavors.map(word => word.toLowerCase()),
    symbol: strain.symbol,
    rating: strain.rating
  }
})


fs.writeFile('strains2.json', JSON.stringify(updatedStrains) , err => {
  if(err) throw err
  console.log('donezo')
})
