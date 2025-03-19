document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault() //previne o comportamento padrão do formulário de enviar

    let input = document.querySelector('#searchInput').value

    if (input !== '') {
        clearInfo()
        showWarning('Carregando...') //mostra o aviso que está carregando

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid={api-key}&units=metric&lang=pt_br`

        const results = await fetch(url)
        const json = await results.json()

        if (json.cod === '404') {
            clearInfo()
            showWarning('Cidade não encontrada!')
        } else {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                wind: json.wind.speed,
                windAngle: json.wind.deg,
            })
        }

    } else {
        clearInfo()
    }
})

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg
}

function showInfo(json) {
    showWarning('')
    document.querySelector('.resultado').style.display = 'block'
    document.querySelector('.titulo').innerHTML = `${json.name} - ${json.country}`
    document.querySelector('.tempInfo').innerHTML = `${json.temp}<sup>°C</sup>`
    document.querySelector('.ventoInfo').innerHTML = `${json.wind} <span>km/h</span>`
    document.querySelector('.temp img').src = `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle - 90}deg)`

}

function clearInfo() {
    showWarning('')
    document.querySelector('.resultado').style.display = 'none'
}
