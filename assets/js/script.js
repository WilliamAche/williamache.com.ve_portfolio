$(function () {
  /** =====================
   *  Cambio de imágenes al hacer click
   ====================== */
  const imagenes = [
    "./assets/images/my-avatar.png",
    "./assets/images/avatar2.png",
    "./assets/images/avatar3.png",
    "./assets/images/avatar4.png",
  ];
  let index = 0;

  $("#avatar").on("click", function () {
    index = (index + 1) % imagenes.length;
    $(this).attr("src", imagenes[index]);
  });

  /** =====================
   *  Función para alternar clase .active
   ====================== */
  const elementToggleFunc = (elem) => elem.toggleClass("active");

  /** =====================
   *  Sidebar (versión móvil)
   ====================== */
  const $sidebar = $("[data-sidebar]");
  const $sidebarBtn = $("[data-sidebar-btn]");

  $sidebarBtn.on("click", function () {
    elementToggleFunc($sidebar);
  });

  /** =====================
   *  Select personalizado + Filtros
   ====================== */
  const $select = $("[data-select]");
  const $selectItems = $("[data-select-item]");
  const $selectValue = $("[data-selecct-value]"); // ojo: revisa el HTML, parece haber un typo en "selecct"
  const $filterBtn = $("[data-filter-btn]");
  const $filterItems = $("[data-filter-item]");

  $select.on("click", function () {
    elementToggleFunc($(this));
  });

  // Evento en cada item del select
  $selectItems.on("click", function () {
    let selectedValue = $(this).text().toLowerCase();
    $selectValue.text($(this).text());
    elementToggleFunc($select);
    filterFunc(selectedValue);
  });

  // Función de filtrado
  function filterFunc(selectedValue) {
    $filterItems.each(function () {
      let $item = $(this);
      if (selectedValue === "all" || selectedValue === $item.data("category")) {
        $item.addClass("active");
      } else {
        $item.removeClass("active");
      }
    });
  }

  // Filtros para pantallas grandes
  let $lastClickedBtn = $filterBtn.first();
  $filterBtn.on("click", function () {
    let selectedValue = $(this).text().toLowerCase();
    $selectValue.text($(this).text());
    filterFunc(selectedValue);

    $lastClickedBtn.removeClass("active");
    $(this).addClass("active");
    $lastClickedBtn = $(this);
  });

  /** =====================
   *  Validación formulario de contacto
   ====================== */
  const $form = $("[data-form]");
  const $formInputs = $("[data-form-input]");
  const $formBtn = $("[data-form-btn]");

  $formInputs.on("input", function () {
    if ($form[0].checkValidity()) {
      $formBtn.removeAttr("disabled");
    } else {
      $formBtn.attr("disabled", true);
    }
  });

  /** =====================
   *  Navegación de páginas
   ====================== */
  const $navigationLinks = $("[data-nav-link]");
  const $pages = $("[data-page]");

  $navigationLinks.on("click", function () {
    let pageName = $(this).text().toLowerCase();

    $pages.each(function (i) {
      let $page = $(this);
      if (pageName === $page.data("page")) {
        $page.addClass("active");
        $navigationLinks.eq(i).addClass("active");
        window.scrollTo(0, 0);
      } else {
        $page.removeClass("active");
        $navigationLinks.eq(i).removeClass("active");
      }
    });
  });
});

$(function () {
  const $avatar = $("#avatar");
  const $bubble = $("#avatar-bubble");

  // Mostrar la burbuja inicialmente (si quieres que empiece oculta, quita esta línea)
  $bubble.addClass("show");

  // Hacer que el click en la burbuja dispare el click del avatar
  $bubble.on("click", function (e) {
    e.preventDefault();
    // dispara el click real sobre la imagen para reutilizar la lógica existente
    $avatar.trigger("click");
    // opcional: ocultar la burbuja tras el primer click para no molestar
    // $bubble.fadeOut(200, function () {
    //   $bubble.remove();
    // });
  });

  // Opcional: ocultar la burbuja después de X segundos si no hacen nada (ej. 5s)
  setTimeout(function () {
    if ($bubble.length)
      $bubble.fadeOut(2828, function () {
        $bubble.remove();
      });
  }, 5000);
});
