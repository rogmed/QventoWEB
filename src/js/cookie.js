export class Cookie {

    constructor() { }

    // Crea una cookie con el nombre, valor y validez en horas
    createCookie(name, value, hours) {
        var expires = '',
            date = new Date();
        if (hours) {
            date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
            expires = '; expires=' + date.toGMTString();
        }
        document.cookie = name + '=' + value + expires + '; path=/';
    }

    // Devuelve el valor de la cookie por su nombre
    readCookie(name) {
        var nameEQ = name + '=',
            allCookies = document.cookie.split(';'),
            i,
            cookie;
        for (i = 0; i < allCookies.length; i += 1) {
            cookie = allCookies[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1, cookie.length);
            }
            if (cookie.indexOf(nameEQ) === 0) {
                return cookie.substring(nameEQ.length, cookie.length);
            }
        }
        return null;
    }
}
