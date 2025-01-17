const input = document.getElementById('input')
const resultCard = document.getElementById('resultCard')
const countryName = document.getElementById('countryName')

let city = ''

const imageCardHandler = (data) => {
  const image = document.createElement('img')
  const condition = data.current.condition.text.toLowerCase().split(' ').join('_')

  const availableIcon = ['sunny', 'mist', 'clear', 'overcast', 'cloudy', 'partly_cloudy']

  let imgPath = availableIcon.includes(condition) ? `../images/${condition}.svg` : '../images/weather.svg'

  image.setAttribute('class', 'result-image')
  image.setAttribute('src', imgPath)
  image.setAttribute('alt', 'weather icon')

  return image
}

const divCardHandler = (data) => {
  const divCard = document.createElement('div')
  const tempCard = document.createElement('div')
  const tempDegreeUnit = document.createElement('sup')
  const feelsDegreeUnit = document.createElement('sup')
  const feelsCard = document.createElement('div')

  divCard.setAttribute('class', 'result-card')
  tempCard.setAttribute('class', 'result-card-temp text-light fw-medium text-center text-md-start')
  feelsCard.setAttribute('class', 'result-card-feels ps-md-2 fw-light text-center text-md-start')

  tempCard.innerHTML = Math.floor(data.current.temp_c)
  tempDegreeUnit.innerHTML = data.current.temp_c ? 'o' : ''

  feelsCard.innerHTML = `Feels ${data.current.feelslike_c}`
  feelsDegreeUnit.innerHTML = data.current.feelslike_c ? 'o' : ''

  tempCard.append(tempDegreeUnit)
  feelsCard.append(feelsDegreeUnit)

  divCard.append(tempCard, feelsCard)

  return divCard
}

const resultHandler = (data) => {
  resultCard.innerHTML = ''

  input.value = data.location.name

  countryName.style.visibility = 'visible'
  countryName.innerHTML = `Country : ${data.location.country}`

  const image = imageCardHandler(data)
  const divCard = divCardHandler(data)
  resultCard.append(image, divCard)
}

const fetchHandler = async (city) => {
  const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=0c80b2b56f1943ada19100744230103&q=${city}&aqi=no`)
  const data = await res.json()

  data.error ? resultCard.innerHTML = data.error.message : resultHandler(data)
}

document.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    city = input.value
    countryName.style.visibility = 'hidden'
    fetchHandler(city)
  }
})