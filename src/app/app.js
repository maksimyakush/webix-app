import moviesData from "../data/moviesData.js";

const menuPopup = {
  view: "popup",
  id: "menuPopup",
  body: {
    view: "list",
    autoheight: 1,
    template: "#id#",
    data: ["Settings", "Log Out"]
  }
};

const myAppToolbar = {
  view: "toolbar",
  template: "My App!",
  css: "webix_dark",
  height: 50,
  elements: [
    { view: "label", label: "My App" },
    {
      view: "button",
      type: "icon",
      icon: "wxi-user",
      label: "Profile",
      inputWidth: 100,
      align: "right",
      popup: "menuPopup"
    }
  ]
};

const mainList = {
  view: "list",
  template: "#title#",
  scroll: false,
  autoheight: true,
  css: "bg--grey",
  data: [
    { id: 1, title: "Dashboard" },
    { id: 2, title: "Users" },
    { id: 3, title: "Products" },
    { id: 4, title: "Locations" }
  ]
};

const connectedTemplate = {
  id: "connectedLabel",
  css: "connected",
  autoheight: 1,
  type: "clean",
  template: "<i class=\"fas fa-check\"></i><span>Connected</span>"
};

const filmsDatatable = {
  view: "datatable",
  id: "filmsDatatable",
  scroll: "y",
  data: moviesData,
  autoConfig: true,
  gravity: 2.5
};

const editFilmsForm = {
  view: "form",
  id: "editFilmsForm",
  autoheight: false,
  minWidth: 300,
  rules: {
    title: webix.rules.isNotEmpty,
    year: value => value > 1970 && value < 2019,
    votes: value => value < 100000,
    rating: value => value !== 0 && value !== ""
  },
  elements: [
    { type: "section", template: "EDIT FILMS" },
    {
      view: "text",
      label: "Title",
      name: "title",
      invalidMessage: "The title must be filled in"
    },
    {
      view: "text",
      label: "Year",
      name: "year",
      invalidMessage: "Enter year between 1970 and 2019"
    },
    {
      view: "text",
      label: "Rating",
      name: "rating",
      invalidMessage: "Rating cannot be empty or 0"
    },
    {
      view: "text",
      label: "Votes",
      name: "votes",
      invalidMessage: "Votes must be less than 100000"
    },
    {
      cols: [
        {
          view: "button",
          value: "Add new",
          type: "form",
          click: () => {
            const isValidated = $$("editFilmsForm").validate();
            if (isValidated) {
              $$("filmsDatatable").add($$("editFilmsForm").getValues());
              webix.message("The data is added");
              $$("editFilmsForm").clear();
            }
          }
        },
        {
          view: "button",
          value: "Clear",
          click: () => {
            $$("editFilmsForm").clear();
            $$("editFilmsForm").clearValidation();
          }
        }
      ]
    }
  ]
};

const copyrightTemplate = {
  id: "copyrightTemplate",
  autoheight: true,
  template:
    "<p class='copyright'>The software is provided by <a href='https://webix.com'>https://webix.com</a>. All rights reserved (c)</p>"
};

webix.ui({
  rows: [
    myAppToolbar,
    {
      cols: [
        { css: "bg--grey", rows: [mainList, {}, connectedTemplate] },
        { view: "resizer" },
        filmsDatatable,
        editFilmsForm
      ]
    },
    copyrightTemplate
  ]
});

webix.ui(menuPopup);
