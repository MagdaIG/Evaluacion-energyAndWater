document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
        const base = "http://127.0.0.1:3000/v1"
        fetch(`${base}/categoria_servicio`)
            .then(res => res.json())
            .then(servicios => {
                    console.log(servicios)
                }
            )
        const teamContainer = document.getElementById('team-container');
        const teamContainerTitulo = document.getElementById('team-container-titulo');
        const teamContainerParrafo = document.getElementById('team-container-parrafo');

        function teamGen(imagen) {
            return `<div class="col-md-6 col-sm-6 team-item mb-30">
        <div class="team-thumb">
            <img class="w-100" src="${imagen.imagen}" alt="">
        </div>
        <div class="team-content">
            <div class="team-information">
                <h5 class="team-name mt-0 mb-0">${imagen.nombre}</h5>
            </div>
            <div class="team-social">
                <ul class="styled-icons icon-team-list icon-bordered icon-circled">
                    <li><a class="social-link" href="https://www.instagram.com/energyandwatercl/" target="_blank"><i class="fab fa-instagram"></i></a></li>
                    <li><a target="_blank" class="social-link" href="https://wa.me/56930835203?text=Hola quiero un presupuesto"><i class="fab fa-whatsapp"></i></a></li>
                </ul>
            </div>
        </div>
    </div>`;
        }

        fetch(`${base}/equipo`)
            .then(res => res.json())
            .then(equipo => {
                equipo.forEach(eq => {
                    const imagen = eq.imagenes && eq.imagenes.length > 0 ? eq.imagenes[0] : undefined
                    if (imagen !== undefined) {
                        const teamHTML = teamGen(imagen);
                        teamContainer.innerHTML += teamHTML;
                    }
                    if (eq.tipo === 'parrafo') {
                        teamContainerParrafo.innerHTML = `<p>${eq.texto}</p>`
                    }
                    if (eq.tipo === 'titulo') {
                        teamContainerTitulo.innerHTML = `<h2>${eq.texto}</h2>`
                    }
                });
            })
            .catch(error => {
                console.error('Error fetching equipo:', error);
            });

        fetch(`${base}/historia`)
            .then(res => res.json())
            .then(historias => {
                const parrafo1 = document.getElementById('parrafo1');
                const parrafo2 = document.getElementById('parrafo2');

                const parrafos = historias.filter(historia => historia.tipo === 'parrafo')

                parrafo1.innerText = parrafos[0].texto;
                parrafo2.innerText = parrafos[1].texto;

            })
            .catch(error => {
                console.error('Error fetching historia:', error);
            });

        function preguntaFrecuente(id, pregunta, respuesta) {
            return `<div class="accordion-item bg-lightest">
                    <h2 class="accordion-header" id="heading${id}">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${id}" aria-expanded="false" aria-controls="collapse${id}">
                            ${pregunta}
                        </button>
                    </h2>
                    <div id="collapse${id}" class="accordion-collapse collapse" aria-labelledby="heading${id}" data-bs-parent="#accordionPanelsStayOpenExample">
                        <div class="accordion-body">
                            ${respuesta}
                        </div>
                    </div>
                </div>`;
        }

        const acordion = document.getElementById('accordionPanelsStayOpenExample');

        fetch(`${base}/pregunta_frecuente`)
            .then(res => res.json())
            .then(preguntas => {
                console.log(preguntas);
                preguntas.forEach(pregunta => {
                    acordion.innerHTML += preguntaFrecuente(pregunta.id, pregunta.pregunta, pregunta.respuesta)
                })

            })
            .catch(error => {
                console.error('Error pregunta frecuente:', error);
            });

        function genServicio(titulo, imagen, texto) {
            return `<div class="col-md-6 col-lg-6 col-xl-6">
                            <div class="service-item">
                                <div class="service-thumb">
                                    <img class="w-100" style="max-height: 250px"
                                         src="${imagen}" alt="">
                                </div>
                                <div class="service-content bg-lightest">
                                    <h3 class="service-title">${titulo}</h3>
                                    <p class="mb-0">${texto}</p>
                                </div>
                                <div class="read-more-button d-flex">
                                    <div class="button-text"><a href="#contact">Contáctanos</a></div>
                                    <div class="button-link ms-auto">
                                        <a href="#contact">
                                            <div class="fa fa-arrow-right"></div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>`
        }

        const serviciosContainer = document.getElementById('servicios');

        fetch(`${base}/categoria_servicio`)
            .then(res => res.json())
            .then(servicios => {
                console.log(serviciosContainer)
                servicios.forEach(servicio => {
                    serviciosContainer.innerHTML += genServicio(servicio.nombre, servicio.imagen, servicio.texto)
                })

            })
            .catch(error => {
                console.error('Error fetching servicio:', error);
            });
    }

}