(function () {

    "use strict";

    // =====================================================
    // CONFIGURACIÓN
    // =====================================================

    // URL DEL WEBHOOK DE MAKE
    const WEBHOOK_URL = "https://hook.us2.make.com/wl18cknohx6537wiq5x6m1kjjp3k5egb";

    // =====================================================
    // OBTENER EL SCRIPT QUE ESTÁ EJECUTÁNDOSE
    // =====================================================

    const scriptActual = document.currentScript;

    if (!scriptActual) {
        return;
    }


    // =====================================================
    // IDENTIFICADOR DE LA PÁGINA
    // =====================================================

    const idPagina =
        scriptActual.getAttribute("data-id");

    if (!idPagina) {

        console.warn(
            "Chispas Cuenta: falta el atributo data-id"
        );

        return;
    }


    // =====================================================
    // IDENTIFICAR AL VISITANTE
    // =====================================================

    let visitante;

    try {

        visitante =
            localStorage.getItem(
                "chispas_cuenta_visitante"
            );

        if (!visitante) {

            visitante =
                "v-" +
                crypto.randomUUID();

            localStorage.setItem(
                "chispas_cuenta_visitante",
                visitante
            );
        }

    } catch (error) {

        visitante =
            "v-" +
            Date.now() +
            "-" +
            Math.random()
                .toString(36)
                .substring(2, 10);
    }


    // =====================================================
    // ID ÚNICO DE LA VISITA
    // =====================================================

    const idVisita =
        "vis-" +
        Date.now() +
        "-" +
        Math.random()
            .toString(36)
            .substring(2, 10);


    // =====================================================
    // DATOS DE LA VISITA
    // =====================================================

const fechaHora = ahora.toLocaleString("es-AR", { timeZone: "America/Argentina/Buenos_Aires", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false

    const pagina =
        window.location.href;

    const referer =
        document.referrer || "directo";

    const userAgent =
        navigator.userAgent;


    // =====================================================
    // DATOS QUE SE ENVÍAN A MAKE
    // =====================================================

    const datos = {

        id_visita: idVisita,

        id_pagina: idPagina,

        fecha_hora: fechaHora,

        visitante: visitante,

        pagina: pagina,

        referer: referer,

        user_agent: userAgent

    };


    // =====================================================
    // ENVIAR VISITA A MAKE
    // =====================================================

    fetch(WEBHOOK_URL, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(datos),

        keepalive: true

    }).catch(function (error) {

        console.warn(
            "Chispas Cuenta: no se pudo registrar la visita.",
            error
        );

    });


    // =====================================================
    // LOGOTIPO CHISPAS CUENTA
    // =====================================================

    const logo = document.createElement("div");

    logo.innerHTML = `

        <svg
            width="135"
            height="38"
            viewBox="0 0 135 38"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Chispas Cuenta"
        >

            <!-- gráfica -->

            <polyline
                points="4,29 18,24 31,26 45,17 58,20 73,8"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />

            <!-- puntos de la gráfica -->

            <circle cx="18" cy="24" r="2"
                    fill="currentColor"/>

            <circle cx="45" cy="17" r="2"
                    fill="currentColor"/>

            <circle cx="73" cy="8" r="2.5"
                    fill="currentColor"/>


            <!-- chispas -->

            <text
                x="8"
                y="10"
                font-size="9"
            >✦</text>

            <text
                x="35"
                y="9"
                font-size="7"
            >✦</text>

            <text
                x="67"
                y="27"
                font-size="8"
            >✦</text>


            <!-- nombre -->

            <text
                x="82"
                y="16"
                font-family="Arial, sans-serif"
                font-size="10"
                font-weight="bold"
                fill="currentColor"
            >
                CHISPAS
            </text>

            <text
                x="82"
                y="28"
                font-family="Arial, sans-serif"
                font-size="10"
                fill="currentColor"
            >
                CUENTA
            </text>

        </svg>

    `;


    // =====================================================
    // ESTILO DEL LOGO
    // =====================================================

    logo.style.position = "fixed";
    logo.style.bottom = "10px";
    logo.style.right = "10px";
    logo.style.zIndex = "999999";

    logo.style.color = "#777";

    logo.style.opacity = "0.65";

    logo.style.fontFamily =
        "Arial, sans-serif";

    logo.style.pointerEvents =
        "none";


    // =====================================================
    // AGREGAR LOGO A LA PÁGINA
    // =====================================================

    document.body.appendChild(logo);


})();



})();
```
