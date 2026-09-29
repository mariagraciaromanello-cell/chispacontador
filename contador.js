```javascript
(function () {

    "use strict";

    // =====================================================
    // CONFIGURACIÓN
    // =====================================================

    // URL DEL WEBHOOK DE MAKE
    const WEBHOOK_URL = "https://hook.us2.make.com/wl18cknohx6537wiq5x6m1kjjp3k5egb";


    // =====================================================
    // OBTENER EL ID DE LA PÁGINA
    // =====================================================

    const scriptActual =
        document.currentScript;

    if (!scriptActual) {
        return;
    }

    const idPagina =
        scriptActual.getAttribute("data-id");


    // Si no existe identificador, no hacemos nada
    if (!idPagina) {
        console.warn(
            "Contá tus visitas: falta data-id"
        );
        return;
    }


    // =====================================================
    // CREAR / RECUPERAR IDENTIFICADOR DEL VISITANTE
    // =====================================================

    let visitante;

    try {

        visitante =
            localStorage.getItem(
                "conta_visitas_visitante"
            );

        if (!visitante) {

            visitante =
                "v-" +
                crypto.randomUUID();

            localStorage.setItem(
                "conta_visitas_visitante",
                visitante
            );
        }

    } catch (error) {

        // Si el navegador bloquea localStorage,
        // generamos igualmente un identificador.

        visitante =
            "v-" +
            Date.now() +
            "-" +
            Math.random()
                .toString(36)
                .substring(2, 10);
    }


    // =====================================================
    // IDENTIFICADOR ÚNICO DE LA VISITA
    // =====================================================

    const idVisita =
        "vis-" +
        Date.now() +
        "-" +
        Math.random()
            .toString(36)
            .substring(2, 10);


    // =====================================================
    // FECHA Y HORA
    // =====================================================

    const fechaHora =
        new Date().toISOString();


    // =====================================================
    // PÁGINA VISITADA
    // =====================================================

    const pagina =
        window.location.href;


    // =====================================================
    // DE DÓNDE PROVIENE EL VISITANTE
    // =====================================================

    const referer =
        document.referrer || "directo";


    // =====================================================
    // NAVEGADOR / DISPOSITIVO
    // =====================================================

    const userAgent =
        navigator.userAgent;


    // =====================================================
    // DATOS PARA MAKE
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
    // ENVIAR AL WEBHOOK
    // =====================================================

    fetch(WEBHOOK_URL, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(datos),

        keepalive: true

    })

    .catch(function (error) {

        // El contador es invisible para el visitante.
        // Si falla el envío, no interrumpimos la página.

        console.warn(
            "Contá tus visitas: no se pudo registrar la visita.",
            error
        );

    });


})();
```
