import moviesData from "../data/moviesData.js";

const myAppToolbar = {
  view: "toolbar",
  template: "My App!",
  height: 50,
  elements: [
    { view: "label", label: "My App" },
    {
      view: "button",
      type: "icon",
      icon: "wxi-user",
      label: "Profile",
      width: 114,
      inputWidth: 90
    },
  ],
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
    { id: 4, title: "Locations" },
  ],
};

const connectedLabel = {
  view: "label",
  id: "connectedLabel",
  css: "connected",
  height: 60
};

const filmsDatatable = {
  view: "datatable",
  scroll: "y",
  data: moviesData,
  autoConfig: true,
  gravity: 2.5,
};

const editFilmsForm = {
  view: "form",
  autoheight: false,
      elements: [
        { type: "section", template: "EDIT FILMS" },
        { view: "text", label: "Title" },
        { view: "text", label: "Year" },
        { view: "text", label: "Rating" },
        { view: "text", label: "Votes" },
        {
          cols: [
            { view: "button", value: "Add new", type: "form" },
            { view: "button", value: "Clear" },
          ],
        },
      ],
};

const copyrightLabel = {
  view: "label",
  id: "copyrightLabel",
  autoheight: true,
  align: "center",
};

webix.ui({
  rows: [
    myAppToolbar,
    {
      cols: [
        { css: "bg--grey", rows: [mainList, {}, connectedLabel] },
        { view: "resizer" },
        filmsDatatable,
        editFilmsForm
      ],
    },
    copyrightLabel,
  ],
});
$$("connectedLabel").setHTML("<i class=\"fas fa-check\"></i><span>Connected</span>");
$$("copyrightLabel").setHTML(
  "<p>The software is provided by <a href='https://webix.com'>https://webix.com</a>. All rights reserved</p>",
);
