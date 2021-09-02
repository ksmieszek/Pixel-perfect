//Variables
const htmlTag = document.querySelector("html");
const headerNavigationElements = document.querySelectorAll("[data-header-navigation-element]");
const headerModalOverlay = document.querySelector(".header-navigation-modal-overlay");
const headerInnerFoldingMenuToggleButtons = document.querySelectorAll("[data-header-inner-menu-folding-menu-toggle]");
const searchAreaDialogQuery = document.querySelector("#search-area-dialog-query");
const imageSwitcherImages = document.querySelectorAll("[data-image-switcher-image]");
const imageSwitcherLinks = document.querySelectorAll("[data-image-switcher-link]");
const contactFormField = document.querySelectorAll(".contact-form-field");

// Functions
function closeNavigationElements() {
  headerNavigationElements.forEach((item) => {
    item.dataset.elementActive = "false";
    htmlTag.dataset.disableScrolling = "false";
    headerModalOverlay.dataset.elementVisible = "false";
    //after hiding menu
    const timeout = window.innerWidth >= 1024 ? 0 : 300;
    setTimeout(() => {
      closeAllHeaderInnerFoldingMenus();
      closeAllHeaderInnerMenus();
      closeAllHeaderInnerMenuToggle();
    }, timeout);
  });
}

function closeAllHeaderInnerMenus() {
  const HeaderInnerMenus = document.querySelectorAll("[data-header-inner-menu-visible]");
  HeaderInnerMenus.forEach((item) => (item.dataset.headerInnerMenuVisible = "false"));
}

function closeAllHeaderInnerMenuToggle() {
  const HeaderInnerMenuToggle = document.querySelectorAll(".header-outer-menu-button");
  HeaderInnerMenuToggle.forEach((item) => item.classList.remove("active"));
}

function closeAllHeaderInnerFoldingMenus() {
  headerInnerFoldingMenuToggleButtons.forEach((item) => {
    item.dataset.headerInnerMenuFoldingMenuToggle = "false";
  });
}

function handleFormFieldsChange() {
  this.value == "" ? this.classList.remove("has-value") : this.classList.add("has-value");
}

function handleFooterMenu(e) {
  e.target.classList.toggle("unfold");
}

// Event Listeners
headerModalOverlay.addEventListener("click", closeNavigationElements);
searchAreaDialogQuery.addEventListener("keyup", handleFormFieldsChange);

//if burger or search icon was clicked
headerNavigationElements.forEach((item) =>
  item.addEventListener("click", function () {
    const elementOpened = this.dataset.elementActive == "false";
    closeNavigationElements();
    closeAllHeaderInnerMenuToggle();
    //set true or false
    this.dataset.elementActive = elementOpened;
    htmlTag.dataset.disableScrolling = elementOpened;
    headerModalOverlay.dataset.elementVisible = elementOpened;
    //focus on input if search element were chosen
    if (this.dataset.headerNavigationElement == "header-search") searchAreaDialogQuery.focus();
    //after hiding menu
    const timeout = window.innerWidth >= 1024 ? 0 : 300;
    if (!elementOpened) {
      setTimeout(() => {
        closeAllHeaderInnerFoldingMenus();
        closeAllHeaderInnerMenus();
      }, timeout);
    }
    window.scrollTo(0, 0);
  })
);

document.querySelectorAll("[data-header-outer-menu-item]").forEach((item) =>
  item.addEventListener("click", (e) => {
    const isOpened = e.currentTarget.querySelector("[data-header-inner-menu-visible]").dataset.headerInnerMenuVisible == "false";
    if (e.target.dataset.headerInnerMenuToggle != undefined) {
      document.querySelector(".header-search-button").dataset.elementActive = "false"; //menu and search view cannot be visible at once on 1024px of window width and above
      closeAllHeaderInnerMenus();
      closeAllHeaderInnerFoldingMenus();
      closeAllHeaderInnerMenuToggle();
      if (isOpened) {
        e.currentTarget.querySelector("[data-header-inner-menu-visible]").dataset.headerInnerMenuVisible = "true";
        htmlTag.dataset.disableScrolling = "true";
        headerModalOverlay.dataset.elementVisible = "true";
        //if hamburger doesnt exist, then after showing inner menu, immediately open first folding submenu
        if (document.querySelector("[data-element-active]").dataset.elementActive == "false") {
          if (e.currentTarget.querySelector("[data-header-inner-menu-folding-menu-toggle]"))
            e.currentTarget.querySelector("[data-header-inner-menu-folding-menu-toggle]").dataset.headerInnerMenuFoldingMenuToggle = "true";
        }
        item.querySelector(".header-outer-menu-button").classList.add("active");
      } else {
        if (window.innerWidth >= 1024) {
          const headerMenu = document.querySelector("[data-header-navigation-element=header-menu]");
          if (headerMenu.dataset.elementActive == "false") {
            htmlTag.dataset.disableScrolling = "false";
            headerModalOverlay.dataset.elementVisible = "false";
          }
        }
      }
    }
  })
);

headerInnerFoldingMenuToggleButtons.forEach((item) =>
  item.addEventListener("click", () => {
    const elementOpened = item.dataset.headerInnerMenuFoldingMenuToggle == "false";
    closeAllHeaderInnerFoldingMenus(); //closes previous opened submenus
    item.dataset.headerInnerMenuFoldingMenuToggle = elementOpened;
  })
);

document.querySelector("#search-area-cancel").addEventListener("click", () => {
  closeNavigationElements();
  setTimeout(() => {
    searchAreaDialogQuery.classList.remove("has-value");
  }, 300);
});

imageSwitcherLinks.forEach((item) =>
  item.addEventListener("click", function (e) {
    e.preventDefault();
    //deactivate all elements
    imageSwitcherImages.forEach((item) => (item.dataset.elementVisible = "false"));
    imageSwitcherLinks.forEach((item) => (item.dataset.elementVisible = "false"));
    //show chosen element
    document.querySelector(`[data-image-switcher-image][data-id='${this.dataset.id}']`).dataset.elementVisible = "true";
    this.dataset.elementVisible = "true";
  })
);

contactFormField.forEach((item) => {
  const formField = item.querySelector("input, select, textarea");
  if (formField) formField.addEventListener("change", handleFormFieldsChange);
});

document.querySelectorAll("[data-footer-folding-menu-toggle]").forEach((item) => item.addEventListener("click", handleFooterMenu));
