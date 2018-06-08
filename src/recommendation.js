const fs = require('fs')


const calculateAttributeScore = (user, database) => {
  return database.reduce((count, attribute, i) => {
    return user.includes(attribute) ? count + 10 - i : count
  }, 0)
}

const sortStrainsBasedOnRating = (strainList) => {
  return strainList.sort((a,b) => {
    return b.rating * b.totalScore - a.rating * a.totalScore
  })
}

const extractBuzzwords = (incomingBuzzwords) => {
  const values = {effects: [], flavor: []}
  incomingBuzzwords.forEach(buzzword => {
    console.log(buzzword, values)
    values[buzzword.category].push(buzzword.word)
  })
  return values
}

const recommendation = (userBuzzwords) => {
  const values = extractBuzzwords(userBuzzwords)
  const allStrains =  JSON.parse(fs.readFileSync(process.cwd() + '/strains2.json','utf-8'))
  const selectedStrains = []
  const strainScores = []

  allStrains.forEach(strain => {
    let effects = calculateAttributeScore(values.effects, strain.effects)
    let flavor = calculateAttributeScore(values.flavor, strain.flavor)

    const totalScore = effects + flavor

    if(selectedStrains.length < 10){
      selectedStrains.push({...strain,totalScore})
      strainScores.push(totalScore)
    } else {
      const indexOfLowestNumber  = strainScores.indexOf(Math.min(...strainScores))
      if( totalScore > strainScores[indexOfLowestNumber] ){
        strainScores[indexOfLowestNumber] = totalScore
        selectedStrains[indexOfLowestNumber] = {...strain,totalScore}
      }
    }
  })

  return sortStrainsBasedOnRating(selectedStrains)

  return false
}

module.exports = {
  recommendation
}
