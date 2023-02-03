
// ****** Traigo menu(tags, login), burger btn
const menu_tags =document.querySelector('.tags')
const menu_login =document.querySelector('.login')

const burgerButton = document.querySelector('#burger-button')

// ***** objetos con la match-media***

//su atributo matches estará en true o false
const screen_767 = window.matchMedia('screen and (max-width: 767px)')
const screen_580 = window.matchMedia('screen and (max-width: 580px)')


// ******* Valido si tengo o no el btn ******

// listener por su cambiar el watchmedia (i.e., resize)
screen_767.addListener(validation_767) 
screen_580.addListener(validation_580) 

// ejecuto al menos 1 vez al cargar pag
validation_767(screen_767) 
validation_580(screen_580) 

// Si tengo el btmn, le agrego iteractividad
//agregi eventos para 767
function validation_767(event) {
    //quito 580
    menu_tags.classList.add('is-active')
    menu_login.classList.add('is-active')
    burgerButton.removeEventListener('click', toggleButton_580)
    if (event.matches) {
        burgerButton.addEventListener('click', toggleButton_767)
    }
    else {
        burgerButton.removeEventListener('click', toggleButton_767)
    }
}

function validation_580(event) {
    //apago767
    menu_tags.classList.add('is-active')
    menu_login.classList.add('is-active')
    if (event.matches) {
        burgerButton.addEventListener('click', toggleButton_580)
    }
    else {
        burgerButton.removeEventListener('click', toggleButton_580)
    }
}

// ********** Interactividad Boton********
function toggleButton_767() {
    if (menu_login.classList.contains('is-active')){
        menu_login.classList.remove('is-active')
    }
    else{
        menu_login.classList.add('is-active')
    }
}

function toggleButton_580() {
    console.log('gola');
    if (menu_tags.classList.contains('is-active')){
        menu_login.classList.remove('is-active')
        menu_tags.classList.remove('is-active')
    }
    else{
        menu_login.classList.add('is-active')
        menu_tags.classList.add('is-active')
    }
}