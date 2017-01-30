document.addEventListener("deviceready", init, false);

function init()
{
	navigator.splashscreen.hide();

	// this.CordovaView.DisableBouncyScrolling = true;
 //    this.CordovaView.Loaded += CordovaView_Loaded;
	
	$('#startMainDownload').on('click', function() {
		$(this).empty();
		$(this).html('<span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> Descargando...');
		$(this).removeClass('btn-success');
		$(this).addClass('btn-warning');

		startDownload();
	})

	// $('#completeImgModal').modal('show');

	var toggles = document.querySelectorAll(".c-hamburger");

	for (var i = toggles.length - 1; i >= 0; i--)
	{
		var toggle = toggles[i];
		toggleHandler(toggle);
	};

	function toggleHandler(toggle) {
		toggle.addEventListener( "click", function(e) {
			e.preventDefault();
			(this.classList.contains("is-active") === true) ? this.classList.remove("is-active") : this.classList.add("is-active");
		});
	}
}


$(window).on('load', function() {
	console.log('HOLA MUNDO!!')
	$('.c-hamburger').on('click', function(){
		if ($('#menu').length)
		{
			quitarMenu();
		}
		else
		{
			cargarMenu();
		}
	})
});


function cargarMenu()
{
	$('body').append('<div id="menu">' +
						'<div class="container text-center">' +
						'</div>' +
					 '</div>');

	var wait_menu = setInterval(function() {
		if ($('#menu').length)
		{
			clearInterval(wait_menu);

			$.getJSON('/../assets/content.json', function(data) {
				// Después de cargar el JSON creamos un
				// objeto que lo contenga. Le llamamos "items"
				var items = [];
				$.each( data, function(key, val) {
					items[key] = val;
				});

				// Cargamlos el contenido de la página que hay en el JSON
				// dependiendo del idioma y la página.
				var current_lang = localStorage.getItem("lang");

				$.each(items.language, function(lang, language) {
					if (lang == current_lang)
					{
						var seccion = language.index.seccion;

						$.each(seccion, function(indice, valor) {
							$.each(valor, function(index, val) {
								$('#menu .container').append('<div class="row menu_seccion' + (indice + 1) + '">' +
																'<div class="col-xs-12">' +
																	'<ul></ul>' +
																'</div>' +
															 '</div>');

								if (index == 'menu')
								{
									$.each(val.links, function(key, value) {
										$('.menu_seccion' + (indice + 1)).find('ul').append('<li><a href="/' + val.folder + '/' + key + '.html">' + value + '</a></li>');
									})
								}
								else
								{
									$('.menu_seccion' + (indice + 1)).find('.col-xs-12').prepend('<h2><a href="#" class="menu_link_toggle">' + valor.h1 + '</a></h2>');
								}
							});
						});
					}
				});

				$('#menu').append('<div class="menu_footer">' +
									'<div class="row">' +
										'<div class="col-xs-4 text-left">' +
											'<a href="' + window.location.protocol + '//' + window.location.host + '/' + '">HOME</a>' +
										'</div>' +
										'<div class="col-xs-4 text-center">' +
											'<img src="../img/common/logo_gales.png">' +
										'</div>' +
										'<div class="col-xs-4 text-right">' +
											'<a class="language_menu" href="#">IDIOMA: ESPAÑOL</a>' +
										'</div>' +
									'</div>' +
								  '</div>');

				// El link de seleccionar el idioma en el menú
				$('.language_menu').on('click', function(e) {
					e.preventDefault();
					cargarSeleccionDeIdioma();
				})
			});

			$('#menu').fadeIn('fast', function() {
				$('.menu_link_toggle').on('click', function(e) {
					e.preventDefault();

					$(this).parents('.col-xs-12').find('ul').addClass('slideToggle')

					$('#menu').find('ul').each(function() {
						if ($(this).hasClass('slideToggle'))
						{
							$(this).slideToggle('fast', function() {
								if ($(this).css('display') == 'none')
								{
									$(this).removeClass('slideToggle');
								}
							});
						}
					})
					// $(this).parents('.col-xs-12').find('ul').slideToggle('fast');
				})
			});
		}
	});
}

function quitarMenu()
{
	$('#menu').fadeOut('fast', function() {
		$('#menu').remove();
	})
}

/**
 * [cargarSeleccionDeIdioma para mostrar el menú de idiomas]
 * @return {null} 
 */
function cargarSeleccionDeIdioma()
{
	$('body').append('<div id="sel_language">' +
						'<div class="close_btn">' +
							'<img src="../../img/common/close.png" alt="Krion">' +
						'</div>' +
						'<div class="container">' +
							'<div class="row">' +
								'<div class="col-xs-12">' +
									'<ul class="row text-center">' +
										'<li class="col-xs-12">' +
											'<h2>' +
												'<a href="#" class="sel_language_link" data-lang="es">Español</a>' +
											'</h2>' +
										'</li>' +
										'<li class="col-xs-12">' +
											'<h2>' +
												'<a href="#" class="sel_language_link" data-lang="en">English</a>' +
											'</h2>' +
										'</li>' +
										'<li class="col-xs-12">' +
											'<h2>' +
												'<a href="#" class="sel_language_link" data-lang="fr">Français</a>' +
											'</h2>' +
										'</li>' +
										'<li class="col-xs-12">' +
											'<h2>' +
												'<a href="#" class="sel_language_link" data-lang="it">Italiano</a>' +
											'</h2>' +
										'</li>' +
										'<li class="col-xs-12">' +
											'<h2>' +
												'<a href="#" class="sel_language_link" data-lang="pt">Português</a>' +
											'</h2>' +
										'</li>' +
										'<li class="col-xs-12">' +
											'<h2>' +
												'<a href="#" class="sel_language_link" data-lang="de">Deutsch</a>' +
											'</h2>' +
										'</li>' +
										'<li class="col-xs-12">' +
											'<h2>' +
												'<a href="#" class="sel_language_link" data-lang="ru">Pусский</a>' +
											'</h2>' +
										'</li>' +
										'<li class="col-xs-12">' +
											'<h2>' +
												'<a href="#" class="sel_language_link" data-lang="zh">汉语</a>' +
											'</h2>' +
										'</li>' +
									'</ul>' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>');

	var lang_page = setInterval(function() {
		if ($('#sel_language').length)
		{
			$('#sel_language').fadeIn('fast');

			$('.sel_language_link').on('click', function(e) {
				e.preventDefault();

				if (localStorage.getItem("lang") != $(this).data('lang'))
				{
					console.log(localStorage.getItem("lang") + ' - ' + $(this).data('lang'))
					localStorage.setItem("lang", $(this).data('lang'));
				}

				// $('#sel_language').remove();
				location.reload();
			});

			$('.close_btn').on('click', function(e) {
				e.preventDefault();
				$('#sel_language').fadeOut('fast', function() {
					$('#sel_language').remove();
				})
			})
		}
	})
}