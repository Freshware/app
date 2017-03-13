document.addEventListener("deviceready", init, false);

function init()
{
	StatusBar.hide();
	navigator.splashscreen.hide();

	FastClick.attach(document.body);

	// this.CordovaView.DisableBouncyScrolling = true;
	// this.CordovaView.Loaded += CordovaView_Loaded;
	
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

/**
 * [animacionOnLoad Para la animación en la que aparece desde abajo al cargar cada sección]
 * @return {[type]} [description]
 */
function animacionOnLoad()
{
	// $('body').css('margin-top', '30px');
	// // $('body').css('opacity', 0);
	// $('body').animate({
	// 	marginTop: 0,
	// 	opacity: 1
	// }, 1500);
}
animacionOnLoad();

function animacionOnExit()
{
	$('a').click(function(event){
	    event.preventDefault();

	    var href = $(this).attr('href');
	    //do whatever
	    if (href != '#' && href != '' && href != '#productos_filter')
	    {
	    	$('body').animate({
	    		opacity: 0
	    	}, {
	    		duration: 400,
	    		easing: 'easeInCirc',
	    		complete: function() {
	    			window.location.href = href;
	    		}
	    	})
	    }
	}); 
}

$(window).on('load', function() {
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