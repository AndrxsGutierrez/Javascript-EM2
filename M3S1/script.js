for (let i = 1; i <= 5; i++) {
    const nombre = prompt('Ingrese su nombre por favor').trim()
    if (nombre == "") {
        alert(`Tienes que ingresar algo, te quedan ${5 - i} intentos`)
        continue
    }

    const age = Number(prompt('Ingrese su edad por favor'))
    if (isNaN(age) || age <= 0 ) {
        alert(`Solo se permiten numeros y numeros positivos, te quedan ${5 - i} intentos`)
        continue
    }

    if (age < 18) {
        alert(`Hola ${nombre}, tienes ${age} años eres menor de edad. ¡Sigue aprendiendo y disfrutando del código!`)
        break
    } else  {
        alert(`Hola ${nombre}, tienes ${age} años eres mayor de edad. ¡Prepárate para grandes oportunidades en el mundo de la programación!`)
        break
    }
}

