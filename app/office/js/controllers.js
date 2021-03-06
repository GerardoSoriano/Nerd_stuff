angular.module('app')
    .controller('mainController', ['$scope', '$rootScope', function ($scope, $rootScope) {

        var tourObj = {};

        $scope.startOnboarding = function() {
            hopscotch.startTour(tourObj);
        }

        if (localStorage.getItem("usuario") != null) {
            $rootScope.usuario = JSON.parse(localStorage.usuario);
            console.log($rootScope.usuario);
        } else {
            // window.location.href = "login.html";
            console.log("No tiene un usuario");
        }

        $(document).ready(function () {

            // Define the tour!
            var tour = {
                id: "hello-hopscotch",
                steps: [
                    {
                        title: "Bienvenido",
                        content: "Hola, estás en tu cuenta de Nerd Stuff, éste es el menú, yo seré tu acompañante en ésta guia.",
                        target: document.querySelector("#menu-tooltip"),
                        placement: "right"
                    },
                    {
                        title: "Inicio",
                        content: "En ésta sección podrás ver informacion de tu cuenta, como invitados, puntos acumulados y fechas limite",
                        target: document.querySelector("#dashboard-tooltip"),
                        placement: "bottom"
                    },
                    {
                        title: "Sección para comprar",
                        content: "En ésta sección podrás comprar todos los productos que quieras organizados en cada categoria",
                        target: document.querySelector("#comprar-tooltip"),
                        placement: "right"
                    },
                    {
                        title: "Mi cuenta",
                        content: "En tu cuenta podrás ver y editar tu información personal.",
                        target: document.querySelector("#cuenta-tooltip"),
                        placement: "right"
                    },
                    {
                        title: "Historial de compras",
                        content: "En historial tienes un registro de tus ultimas compras, organizadas por fecha y con información detallada del producto y su precio individual y total, así como sus untos acumulados.",
                        target: document.querySelector("#historial-tooltip"),
                        placement: "right"
                    },
                    {
                        title: "Mis invitados",
                        content: 'En la sección invitados, tienes la libertad de invitar a nuevos miembros de la comunidad de Nerd Stuff, para aumentar el tamaño del grupo. Dichos miembros invitados se añadirán como tus "Hijos", y "Nietos" en caso de que ellos también inviten.',
                        target: document.querySelector("#invitados-tooltip"),
                        placement: "right"
                    },
                    {
                        title: "Salir",
                        content: 'Si estás satisfecho con el servicio, y/o deseas cerrar sesión, éste botón te será de ayuda.',
                        target: document.querySelector("#salir-tooltip"),
                        placement: "right"
                    },
                    {
                        title: "Ayuda",
                        content: 'En caso de volver a necesitar ayuda, puedes llamarme para volver a darte una guia rápida.',
                        target: document.querySelector("#help-tooltip"),
                        placement: "top"
                    }
                ],
                showPrevButton: true,
                scrollTopMargin: 100,
                i18n: {
                    nextBtn: "siguiente",
                    prevBtn: "anterior",
                    doneBtn: "finalizar"
                }
            };
            tourObj = tour;

            if(localStorage.Onboarding == "true")
                hopscotch.startTour(tour);
                
        });

    }])

    .controller('menuController', ['$scope', function ($scope) {
        $scope.menuOnClick = function ($event) {
            var element = $event.target;
            console.log($(element).parent().get(0));
            $("ul.sections a").each(function () {
                $(this).removeClass("current");
            })
            $(element).parent().addClass("current");
        }

        $scope.salirOnClick = function () {
            localStorage.usuario = "";
            window.location.href = "login.html";
        };
    }])

    .controller('headerController', ['$scope', function ($scope) {
        $scope.headerOnClick = function ($event) {
            if (($('.profilePicture').hasClass('.-profScaleMin')) || ($('.profilePicture').hasClass('.-profScaleMax'))) {
                $('.profilePicture -profScaleMin').toggleClass('.profilePicture -profScaleMax');
            } else {
                $('.profilePicture').addClass('.-profScaleMin')
            }
            if ($('.menu').hasClass('-min')) {
                $('div[class^="menu"]').toggleClass('menu menu -min');

                $('.menu').animate({
                    width: '+=190px'
                }, 500, function () {
                    // Animation complete.

                });
                $('.header').animate({
                    'padding-left': 270
                }, 500);
                $('.content').animate({
                    'padding-left': 280
                }, 500);
            } else {
                $('.menu').animate({
                    width: '-=190px'
                }, 500, function () {
                    $('div[class^="menu"]').toggleClass('menu menu -min');

                });
                $('.header').animate({
                    'padding-left': 70
                }, 500);
                $('.content').animate({
                    'padding-left': 50
                }, 500);

            }

            $('div[class^="header"]').toggleClass('header header -Hmin');
            $('div[class~="content"]').toggleClass('content content -Cmin');
        }
    }])

    .controller("treeController", ['$scope', '$http', function ($scope, $http) {
        $scope.usuarios = "";

        $http({
            url: '../server/php/controller/otros/misInvitados.php',
            method: "POST",
            data: { 'token': localStorage.getItem("token") }
        }).then(function (response) {
            $scope.usuarios = response.data;
            console.log(response.data);
        });

        $scope.colapse = function ($event) {
            var element = $event.target;
            var test = $(element).closest(".person");
            console.log(element);
            console.log(test);
        }

        $.validator.addMethod("regx", function (value, element, regexpr) {
            return regexpr.test(value);
        });

        var token = localStorage.getItem("token");

        $('form.emailForm').validate({
            debug: true,
            rules: {
                nombre: {
                    required: true,
                    regx: /^[a-zA-Z\s]+$/
                },
                email: {
                    required: true,
                    regx: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                }
            },
            messages: {
                nombre: {
                    required: "El nombre es requerido",
                    regx: "Introduce un nombre valido"
                },
                email: {
                    required: "El correo es requerido",
                    regx: "Por favor ingresa un correo valido"
                }
            },
            invalidHandler: function (event, validator) {
                var errors = validator.numberOfInvalids();
                if (errors) {
                    var message = errors == 1
                        ? 'Tienes un campo que no cumple con lo requerido'
                        : 'Tienes ' + errors + ' campos que no cumplen con lo requerido';
                    alert(message);
                }
            },
            submitHandler: function (form) {
                let jsonObj = {};
                $(form).find(".toJson").each(function (key, value) {
                    jsonObj[$(value).attr("name")] = $(value).val();
                });
                jsonObj['token'] = token;
                let json = JSON.stringify(jsonObj);
                $('.toJson').val('');
                $.ajax({
                    method: "POST",
                    url: "../server/php/controller/sendEmail.php",
                    data:
                    {
                        "json": json,
                        'token': localStorage.getItem("token")
                    }
                }).done(function (response) {
                    var info = JSON.parse(response);
                    console.log(info);
                }
                    );
            }
        });
    }])

    .controller("historialController", ['$scope', '$http', function ($scope, $http) {
        $scope.compras = "";

        $http({
            url: '../server/php/controller/otros/comprasPorUsuario.php',
            method: "POST",
            data: { 'token': localStorage.getItem("token") }
        }).then(function (response) {
            var todasCompras = response.data;
            var compras = {};
            var total = 0;

            console.log(todasCompras);

            for (let i = 0; i < todasCompras.length; i++) {
                var idCompra = todasCompras[i].idCompra;

                if (compras[idCompra] == undefined)
                    compras[idCompra] = [];

                compras[idCompra].push(todasCompras[i]);
            }

            for (var index in compras) {
                let totalCompra = 0;
                let totalPuntos = 0;
                var compra = compras[index];

                if (compras[index].totalCompra == undefined)
                    compras[index].totalCompra = 0;

                if (compras[index].totalPuntos == undefined)
                    compras[index].totalPuntos = 0;

                for (let i = 0; i < compra.length; i++) {
                    compras[index].totalCompra += compra[i].costo * compra[i].cantidad;
                    compras[index].totalPuntos += compra[i].puntaje * compra[i].cantidad;
                }
            }

            $scope.compras = compras;
            console.log($scope.compras);
        });
    }])

    .controller("finalizarCompra", ['$scope', '$http', function ($scope, $http) {
        $scope.productos = [];
        $scope.puntos = 0;
        $scope.iva = 0;
        $scope.total = 0;

        $scope.$watch('productos', function (newValue, oldValue) {
            console.log("update model");
        });

        $scope.init = function () {
            var productos = JSON.parse(localStorage.compra);
            var puntos = 0;
            var iva = 0;
            var total = 0;

            for (let i = 0; i < productos.length; i++) {
                productos[i].totalPuntuaje = productos[i].puntaje * productos[i].quantity;
                productos[i].costoTotal = productos[i].costo * productos[i].quantity;
                total += productos[i].costoTotal
                puntos += productos[i].totalPuntuaje;
            }

            iva = total * 0.16;

            $scope.productos = productos;
            $scope.puntos = puntos;
            $scope.iva = iva
            $scope.total = total;
        };

        $scope.finalizarCompra = function () {
            //Logica para finalizar la compra, mandar a llamar el servicio
            let jsonObj = {}

            jsonObj['productos'] = $scope.productos;
            jsonObj['token'] = localStorage.getItem("token");;

            let json = JSON.stringify(jsonObj);

            console.log(json);
            $.ajax({
                method: "POST",
                url: "../server/php/controller/finalizarCompra.php",
                data: { "json": json }
            }).done(function (response) {
                if (response == 'success') {
                    window.location.href = '#comprar';
                }
            });
            //Mostrarle algo al usuario que diga que ya se finalizó la compra
            console.log("finalizar compra");

            console.log($scope.productos);
        };
    }])

    .controller("comprasController", ['$scope', '$http', function ($scope, $http) {
        $scope.compras = "";
        $scope.categories = "";
        $scope.firstSlick = true;
        $scope.productosCarrito = [];
        $scope.item = 1;

        var cartWrapper = $('.cd-cart-container');
        var cartBody = cartWrapper.find('.body')
        var cartList = cartBody.find('ul').eq(0);
        var cartTotal = cartWrapper.find('.checkout').find('span');
        var cartTrigger = cartWrapper.children('.cd-cart-trigger');
        var cartCount = cartTrigger.children('.count')
        var addToCartBtn = $('.cd-add-to-cart');
        var undo = cartWrapper.find('.undo');
        var undoTimeoutId;

        $http({
            url: '../server/php/controller/comprar.php',
            method: "POST",
            data: { 'token': localStorage.getItem("token") }
        }).then(function (response) {
            $scope.compras = response.data;
            console.log($scope.compras);

            $http({
                url: '../server/php/controller/productosPorCategoria.php',
                method: "POST",
                data: { 'token': localStorage.getItem("token") }
            }).then(function (response) {
                $scope.categories = response.data;
                console.log($scope.categories);
                $(".category").addClass('hide');
            });
        });

        $scope.$on('Last-Elem-Event', function (event) {
            $(".category").addClass('hide');
            $(".category.categoria").removeClass('hide');
        });

        $scope.productoClick = function (elemento) {
            //Actualizamos el modelo
            $scope.productosCarrito.push(elemento);

            //Actualizamos el carrito
            addToCart(elemento);
        }

        $scope.cartTrigger = function () {
            toggleCart();
        }

        $scope.deleteClick = function (product) {
            var index = $scope.productosCarrito.indexOf(product);
            if (index > -1) {
                $scope.productosCarrito.splice(index, 1);
                removeProduct(product, index);
            }
        }

        $scope.cartListChange = function (product, item) {
            var index = $scope.productosCarrito.indexOf(product);
            if (index > -1) {
                $scope.productosCarrito[index].quantity = item;
                console.log($scope.productosCarrito);
                quickUpdateCart();
            }
        }

        $scope.categoriaClick = function ($event) {
            var element = $event.target;
            var categoryName = $(element).text();
            categoryName = categoryName.trim();

            $(".category").addClass('hide');
            $(".category#" + categoryName).removeClass('hide');
            $(".navBar li").removeClass("current");
            $(element).closest("li").addClass("current");
        };

        $(".cd-cart footer").on("click", function () {
            console.log("footer click");

            compra = $scope.productosCarrito;

            for (var i = 0; i < compra.length; i++) {
                if (compra[i].quantity == undefined)
                    compra[i].quantity = 1;
            }

            localStorage.compra = JSON.stringify(compra);

        });

        function toggleCart(bool) {
            var cartIsOpen = (typeof bool === 'undefined') ? cartWrapper.hasClass('cart-open') : bool;

            if (cartIsOpen) {
                cartWrapper.removeClass('cart-open');
                //reset undo
                clearInterval(undoTimeoutId);
                undo.removeClass('visible');
                cartList.find('.deleted').remove();

                setTimeout(function () {
                    cartBody.scrollTop(0);
                    //check if cart empty to hide it
                    if (Number(cartCount.find('li').eq(0).text()) == 0) cartWrapper.addClass('empty');
                }, 500);
            } else {
                cartWrapper.addClass('cart-open');
            }
        }

        function addToCart(trigger) {
            var cartIsEmpty = cartWrapper.hasClass('empty');

            updateCartCount(cartIsEmpty);
            updateCartTotal(trigger.costo, true);
            cartWrapper.removeClass('empty');
        }

        function quickUpdateCart() {
            var quantity = 0;
            var price = 0;

            cartList.children('li:not(.deleted)').each(function () {
                var singleQuantity = Number($(this).find('select').val());
                quantity = quantity + singleQuantity;
                price = price + singleQuantity * Number($(this).find('.price').text().replace('$', ''));
            });

            cartTotal.text(price.toFixed(2));
            cartCount.find('li').eq(0).text(quantity);
            cartCount.find('li').eq(1).text(quantity + 1);
        }

        function removeProduct(product, index) {
            var productQuantity = 1;

            if (product.quantity != undefined)
                productQuantity = product.quantity;

            productTotPrice = product.costo * productQuantity;

            updateCartTotal(productTotPrice, false);
            updateCartCount(true, -productQuantity);
        }

        function updateCartCount(emptyCart, quantity) {
            if (typeof quantity === 'undefined') {
                var actual = Number(cartCount.find('li').eq(0).text()) + 1;
                var next = actual + 1;

                if (emptyCart) {
                    cartCount.find('li').eq(0).text(actual);
                    cartCount.find('li').eq(1).text(next);
                } else {
                    cartCount.addClass('update-count');

                    setTimeout(function () {
                        cartCount.find('li').eq(0).text(actual);
                    }, 150);

                    setTimeout(function () {
                        cartCount.removeClass('update-count');
                    }, 200);

                    setTimeout(function () {
                        cartCount.find('li').eq(1).text(next);
                    }, 230);
                }
            } else {
                var actual = Number(cartCount.find('li').eq(0).text()) + quantity;
                var next = actual + 1;

                cartCount.find('li').eq(0).text(actual);
                cartCount.find('li').eq(1).text(next);
            }
        }

        function updateCartTotal(price, bool) {
            bool ? cartTotal.text((Number(cartTotal.text()) + Number(price)).toFixed(2)) : cartTotal.text((Number(cartTotal.text()) - Number(price)).toFixed(2));
        }
    }])

    .controller("cuentaController", ['$scope', '$http', '$rootScope', 'Upload', function ($scope, $http, $rootScope, Upload) {

        $scope.usuario = JSON.parse(localStorage.usuario);

        $scope.uploadPic = function (file) {
            $('form.updateForm').validate({
                debug: true,
                rules: {
                    primerNombre: {
                        required: true
                    },
                    segundoNombre: {
                        required: false
                    },
                    apellidoPaterno: {
                        required: true
                    },
                    apellidoMaterno: {
                        required: false
                    },
                    email: {
                        required: true
                    },
                    contrasena: {
                        required: true
                    }
                },
                messages: {
                    primerNombre: {
                        required: "Tu primer nombre debe de ser especificado"
                    },
                    apellidoPaterno: {
                        required: "Necesitamos aunque sea un apellido tuyo"
                    },
                    email: {
                        required: "Necesitamos un correo para poder contactar"
                    },
                    contrasena: {
                        required: "Para modificar cambios, necesitas introducir de nuevo tu contraseña"
                    }
                },
                invalidHandler: function (event, validator) {
                    var errors = validator.numberOfInvalids();
                    if (errors) {
                        var message = errors == 1
                            ? 'Tienes un campo que no cumple con lo requerido'
                            : 'Tienes ' + errors + ' campos que no cumplen con lo requerido';
                        alert(message);
                    }
                }
            });

            if ($('form.updateForm').valid()) {
                var jsonObj = {};
                $('form.updateForm').find(".toJson").each(function (key, value) {
                    jsonObj[$(value).attr("name")] = $(value).val();
                });
                var json = JSON.stringify(jsonObj);
                Upload.upload({
                    url: '../server/php/controller/modificarPerfil.php',
                    data: {
                        image: file,
                        token: localStorage.token,
                        jsonDatos: json
                    }
                }).then(function (resp) {
                    // file is uploaded successfully
                    var usuario = JSON.parse(localStorage.usuario);
                    var jsonUsuario = JSON.parse(json);
                    usuario.primerNombre = jsonUsuario.primerNombre;
                    usuario.segundoNombre = jsonUsuario.segundoNombre;
                    usuario.apellidoPaterno = jsonUsuario.apellidoPaterno;
                    usuario.apellidoMaterno = jsonUsuario.apellidoMaterno;
                    usuario.email = jsonUsuario.email;

                    localStorage.usuario = JSON.stringify(usuario);
                    $rootScope.usuario = usuario;
                    $scope.usuario = usuario;

                    console.log($scope.usuario);
                    console.log(resp.data);
                    location.reload();
                });
            }

        };

        $scope.uploadCreditCard = function () {
            $('form.creditCardForm').validate({
                debug: true,
                rules: {
                    formaPago: {
                        required: true
                    }
                },
                messages: {
                    formaPago: {
                        required: "Tienes que especificar una forma de pago"
                    }
                },
                invalidHandler: function (event, validator) {
                    var errors = validator.numberOfInvalids();
                    if (errors) {
                        var message = errors == 1
                            ? 'Tienes un campo que no cumple con lo requerido'
                            : 'Tienes ' + errors + ' campos que no cumplen con lo requerido';
                        alert(message);
                    }
                }
            });

            if ($('form.creditCardForm').valid()) {
                //a la espera de ver como funcionara lo de la tarjeta de credito
            }
        }
    }]);
