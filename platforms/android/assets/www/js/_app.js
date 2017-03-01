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































//The directory to store data
var store;

//Used for status updates
var $status;

//URL of our asset
// var assetURL = "http://expresionotaku.com/wp-content/uploads/2016/11/manga-store.jpg";
var assetURL = "http://freshware.es/pruebas/app/new_expresion_otaku.zip";
var assetURL2 = "http://freshware.es/pruebas/app/new_expresion_otaku2.zip";
var assetURL3 = "http://freshware.es/pruebas/app/new_expresion_otaku3.zip";
var assetURL4 = "http://freshware.es/pruebas/app/new_expresion_otaku4.zip";

//File name of our important data file we didn't ship with the app
var fileName = "new_expresion_otaku3.zip";

function startDownload() {
	$status = document.querySelector("#status");

	$status.innerHTML = "Checking for data file.";

	// store = cordova.file.dataDirectory;
	store = cordova.file.documentsDirectory;

	// store2 = cordova.file.applicationDirectory + "prueba_archivos/";
	// alert('Antes del resolveLocalFileSystemURL - linea 28');

	//Check for the file. 
	// La funcón se define así: window.resolveLocalFileSystemURL(url, successCallback, errorCallback);
	// Así qu eusaremos el success para cuando tengamos un archivo y el error para descargarlo
	window.resolveLocalFileSystemURL(store + fileName, appStart, downloadAsset);
	// download(assetURL, store, fileName)



	/**
	 * Starter vars.
	 */
	var index = 0;
	var i;

	/**
	 * Need cordova.file plugin.
	 * $ cordova plugin add org.apache.cordova.file
	 * 
	 * To get all urls see https://github.com/apache/cordova-plugin-file/blob/master/README.md#where-to-store-files
	 * 
	 */
	var localURLs    = [
	  // cordova.file.cacheDirectory,
	  // cordova.file.applicationDirectory,
	  // cordova.file.applicationStorageDirectory,
	  // cordova.file.dataDirectory,
	  cordova.file.documentsDirectory,
	  // cordova.file.externalApplicationStorageDirectory,
	  // cordova.file.externalCacheDirectory,
	  // cordova.file.externalRootDirectory,
	  // cordova.file.externalDataDirectory,
	  // cordova.file.sharedDirectory,
	  // cordova.file.syncedDataDirectory
	];

	/**
	 * Recursive function for file entry.
	 */
	var addFileEntry = function (entry) {
	  var dirReader = entry.createReader();
	  dirReader.readEntries(
	    function (entries) {
	      var fileStr = "";
	      var i;
	      for (i = 0; i < entries.length; i++) {
	        if (entries[i].isDirectory === true) {
	          // Recursive -- call back into this subdirectory
	          addFileEntry(entries[i]);
	        } else {
	          alert('full path: ' + entries[i].fullPath);
	          index++;

	          entries[i].remove();
	        }
	      }
	    },
	    function (error) {
	      alert("readEntries error: " + error.code);
	    }
	  );
	};

	/**
	 * Directory error.
	 */
	var addError = function (error) {
	  alert("getDirectory error: " + error.code);
	};

	/**
	 * Loop through the array.
	 */
	for (i = 0; i < localURLs.length; i++) {
	  if (localURLs[i] === null || localURLs[i].length === 0) {
	    continue; // skip blank / non-existent paths for this platform
	  }
	  window.resolveLocalFileSystemURL(localURLs[i], addFileEntry, addError);
	}
}

function downloadAsset() {
	// alert('dentro del downloadAsset - linea 111')

	
	var url = "http://freshware.es/pruebas/app/prueba.json";
	$.getJSON( url, {
		// tags: "mount rainier",
		// tagmode: "any",
		format: "json"
	})
	.done(function( data ) {
		// alert('Hemos leído el json - linea 121')

		var images = data['folders']['images'];
		var array_images = $.map(images, function(el) { return el });

		descargarImagenes(array_images);

		// $.each(images, function( index, value ) {
		//     console.log(value['file']);
		// 	alert('Estamos leyendo el contenido de la variable images - linea 128')
		//     alert(value['file']);
			
		// 	fileTransfer[index] = new FileTransfer();

		// 	fileTransfer[index].download(url, store + fileName, 
		// 		function(entry) {
		// 			alert("Ha funcionado y hemos descargado un archivo - Linea 135");
		// 			appStart();
		// 		}, 
		// 		function(err) {
		// 			alert("Error - Linea 139");
		// 			// console.dir(err);
		// 			document.getElementById("texto").innerHTML=err.target;
		// 		});
		// });
	})
	.fail(function( jqxhr, textStatus, error ) {
	    var err = textStatus + ", " + error;
	    console.log( "Request Failed: " + err );
	    alert( "Ha ido muy mal la lectura del json: " + err );
	});

}

function descargarImagenes(array_images)
{
	// alert('dentro de descargarImages - Linea 157')
	if (! (array_images.length === 0))
	{
		// alert('array_images.length > 0 - Linea 160')
		var fileTransfer = new FileTransfer();

		var storeComplete = store + array_images[0]['file'].split('/').pop();

		fileTransfer.download(array_images[0]['file'], storeComplete, 
			function(entry) {
				// alert("Ha funcionado y hemos descargado un archivo - Linea 165");
				// appStart();

				$('.contenedor-textos').prepend('<p class="text-warning">Array de contenido (num elements = ' + array_images.length + '):' + array_images + '</p>');
				$('.contenedor-textos').prepend('<p class="text-warning">:' + array_images + '</p>');

				$('.contenedor-textos').prepend('<p class="text-success">Añadido archivo: ' + array_images[0]['file'] + ' en dirección: ' + storeComplete + '</p>');
				$('.contenedor-textos').prepend('<p class="text-info">Array de contenido:\n' + array_images + '</p>');
				$('.contenedor-textos').prepend('<img src="' + storeComplete + '" width="100%"  height="auto" >');

				$('.contenedor-textos').prepend('<hr>');

				array_images.shift();

				descargarImagenes(array_images);
			}, 
			function(err) {
				alert("Error - Linea 173");
				// console.dir(err);
				document.getElementById("texto").innerHTML=err.target;
			}
		);
	}
	else
	{
		alert('fin de las descargas - Linea 180');
	}
}

//I'm only called when the file exists or has been downloaded.
function appStart() {
	alert('dentro del appStart - linea 185')
	$status.innerHTML = "App ready!";
			// alert(cordova.file.dataDirectory);
			// document.getElementById("prueba").src=store + fileName;

			// removeFile();
}

// remove file system entry
        function removeFile() {
	        alert('hola mundo');
        	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, fail);
        }

        function onFileSystemSuccess(fileSystem) {
	        // alert('name: ' + fileSystem.name);
	        // alert('root.name: ' + fileSystem.root.name);
	    }

	    function fail(error) {
	        alert(error.code);
	    }

// function download(URL, Folder_Name, File_Name) {
// //step to request a file system 
//     window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemSuccess, fileSystemFail);

// 	function fileSystemSuccess(fileSystem) {
// 	    var download_link = encodeURI(URL);
// 	    ext = download_link.substr(download_link.lastIndexOf('.') + 1); //Get extension of URL

// 	    var directoryEntry = fileSystem.root; // to get root path of directory
// 	    directoryEntry.getDirectory(Folder_Name, { create: true, exclusive: false }, onDirectorySuccess, onDirectoryFail); // creating folder in sdcard
// 	    var rootdir = fileSystem.root;
// 	    var fp = rootdir.fullPath; // Returns Fulpath of local directory

// 	    fp = fp + "/" + Folder_Name + "/" + File_Name + "." + ext; // fullpath and name of the file which we want to give
// 	    // download function call
// 	    filetransfer(download_link, fp);
// 	}

// 	function onDirectorySuccess(parent) {
// 	    // Directory created successfuly
// 	}

// 	function onDirectoryFail(error) {
// 	    //Error while creating directory
// 	    alert("Unable to create new directory: " + error.code);
// 	}

// 	function fileSystemFail(evt) {
// 	    //Unable to access file system
// 	    alert(evt.target.error.code);
// 	}
// }

// function filetransfer(download_link, fp) {
// 	var fileTransfer = new FileTransfer();
// 	// File download function with URL and local path
// 	fileTransfer.download(download_link, fp,
//             function (entry) {
//                 alert("download complete: " + entry.fullPath);
//             },
// 			function (error) {
// 				//Download abort errors or download failed errors
// 				alert("download error source " + error.source);
// 				//alert("download error target " + error.target);
// 				//alert("upload error code" + error.code);
// 			}
//     );
// }