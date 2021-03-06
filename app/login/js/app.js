$(document).ready(function () {

  $.validator.addMethod("regx", function (value, element, regexpr) {
    return regexpr.test(value);
  });

  $('form.loginForm').validate({
    debug: true,
    rules: {
      email: {
        required: true,
        regx: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      },
      contrasena: {
        required: true
      }
    },
    messages: {
      email: "Por favor ingresa un correo valido",
      contrasena: "Por favor ingresa tu contraseña"
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
      let json = JSON.stringify(jsonObj);
      $.ajax({
        method: "POST",
        url: "../server/php/controller/login.php",
        data: { "json": json }
      }).done(function (response) {
        var info = JSON.parse(response);
        if (info.msg == "success") {
          localStorage.usuario = JSON.stringify(info.usuario);
          localStorage.token = info.token;
          localStorage.Onboarding = "false";
          window.location = 'office.html';
        } else {
          console.log("Credenciales incorrectas");
          alert("Credenciales incorrectas");
        }
      }
        );
    }
  });

  $("form.registerForm").validate({
    debug: true,
    rules: {
      nombreUsuario: {
        required: true,
        regx: /^[a-zA-Z0-9_-\s]+$/
      },
      primerNombre: {
        required: true,
        regx: /^[a-zA-Z\s]+$/
      },
      apellidoPaterno: {
        required: true,
        regx: /^[a-zA-Z\s]+$/
      },
      email: {
        required: true,
        regx: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      },
      contrasena: {
        required: true,
        regx: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/
      }
    },
    messages: {
      nombreUsuario: "Por favor, introduce un usuario valido.",
      primerNombre: "Por favor, escribe tu nombre, recuerda que no se aceptan números",
      apellidoPaterno: "Por favor, escribe tus apellidos, recuerda que no se aceptan números",
      email: "Por favor ingresa un correo valido",
      contrasena: "Tu contraseña debe de tener una mayúscula, una minúscula y por lo menos un número",
      rePassword: "Las contraseñas no coinciden"
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
      let json = JSON.stringify(jsonObj);
      $.ajax({
        method: "POST",
        url: "../server/php/controller/registrarUsuario.php",
        data: { "json": json }
      }).done(function (response) {
        var info = JSON.parse(response);

        if (info.msg == "success") {
          localStorage.usuario = JSON.stringify(info.usuario);
          localStorage.token = info.token;
          localStorage.Onboarding = "true";
          window.location = 'office.html';
        }
        else {
          alert("No se pudo registar el usuario");
        }
      });
    }
  })

  $('div.links>a.login').click(function () {
    $('form.loginForm').show();
    $('form.registerForm').hide();
  });

  $('div.links>a.register').click(function () {
    $('form.loginForm').hide();
    $('form.registerForm').show();
  });
});
