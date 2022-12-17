import { Cookie } from './cookie.js';

export class Navbar {

    constructor() { }

    // Cargar navbar con email de usuario
    load(token) {
        $.get("nav.html", async function (data) {
            await $("#nav-placeholder").replaceWith(data);
            document.getElementById("user-tag").innerHTML = token.email;

            // Logout
            const logout = document.getElementById("logout");
            logout.addEventListener("click", function () {
                new Cookie().deleteAll();
                window.location.href = "index.html";
            });
        });
    }
}
