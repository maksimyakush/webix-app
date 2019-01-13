import { sortVotes, startCompare, stripHTML } from "../helpers/helpers.js";

const addItem = () => {
  if (!$$("editFilmsForm").validate()) return;

  const strippedFromHTMLFormData = stripHTML(webix.copy($$("editFilmsForm").getValues()));
  strippedFromHTMLFormData.rating = strippedFromHTMLFormData.rating.replace(".", ",");
  $$("filmsDatatable").add(strippedFromHTMLFormData);
  webix.message("The data is added");
  $$("editFilmsForm").clear();
};

const clearForm = () => {
  webix.confirm({
    title: "Clear",
    text: "Are you sure you want to clear form?",
    callback(result) {
      if (result) {
        $$("editFilmsForm").clear();
        $$("editFilmsForm").clearValidation();
      }
    }
  });
};

const updateForm = () => {
  if (!$$("filmsDatatable").getSelectedId()) {
    webix.message("Please, select row to update!");
    return;
  }
  if (!$$("editFilmsForm").validate()) return;

  const strippedFromHTMLFormData = stripHTML(webix.copy($$("editFilmsForm").getValues()));
  strippedFromHTMLFormData.rating = strippedFromHTMLFormData.rating.replace(".", ",");
  $$("filmsDatatable").updateItem($$("filmsDatatable").getSelectedId(), strippedFromHTMLFormData);
  webix.message("The data is updated");
};

const deleteItem = () => {
  if (!$$("filmsDatatable").getSelectedId()) {
    webix.message("Select row to delete!");
    return;
  }
  $$("filmsDatatable").remove($$("filmsDatatable").getSelectedId());
};

const menuPopup = {
  view: "popup",
  id: "menuPopup",
  body: {
    view: "list",
    autoheight: 1,
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
  id: "mainList",
  scroll: false,
  autoheight: true,
  select: true,
  ready() {
    this.select("Dashboard");
  },
  on: {
    onAfterSelect(id) {
      $$(id).show();
    }
  },
  data: ["Dashboard", "Users", "Products", "Locations"]
};

const connectedTemplate = {
  id: "connectedLabel",
  css: "connected",
  autoheight: 1,
  type: "clean",
  template: "<i class='webix_icon wxi-check'></i><span>Connected</span>"
};

const filmsDatatable = {
  view: "datatable",
  id: "filmsDatatable",
  scroll: "y",
  url: "/data",
  hover: "films-datatable--hover",
  columns: [
    {
      id: "rank",
      header: ["Rank", { content: "textFilter", compare: startCompare }],
      width: 64,
      sort: "int",
      css: { "background-color": "#F4F5F9" }
    },
    {
      id: "title",
      header: ["Title", { content: "textFilter" }],
      fillspace: 1,
      sort: "string"
    },
    { id: "year", header: ["Year", { content: "textFilter", compare: startCompare }], sort: "int" },
    {
      id: "votes",
      header: ["Votes", { content: "textFilter", compare: startCompare }],
      template: obj => obj.votes.replace(",", ""),
      sort: sortVotes
    },
    {
      id: "rating",
      header: ["Rating", { content: "textFilter", compare: startCompare }],
      sort: "string"
    },
    { title: "Button", template: "<i class='webix_icon wxi-trash removeItem'></i>", width: 46 }
  ],
  rightSplit: 1,
  leftSplit: 1,
  select: true,
  gravity: 2.5,
  onClick: {
    removeItem(e, id) {
      this.remove(id);
      return false;
    }
  },
  on: {
    onAfterSelect(id) {
      const data = webix.copy(this.getItem(id));
      data.votes = data.votes.replace(/,/g, "");
      data.rating = data.rating.replace(",", ".");
      $$("editFilmsForm").setValues(data);

      console.log($$("editFilmsForm").getValues(data));
    }
  }
};

const editFilmsForm = {
  view: "form",
  id: "editFilmsForm",
  autoheight: false,
  minWidth: 300,
  rules: {
    title: webix.rules.isNotEmpty,
    year: value => value >= 1970 && value <= 2019,
    rating: value => value != 0 && webix.rules.isNotEmpty(value),
    votes: value => value < 100000 && webix.rules.isNotEmpty(value),
    rank: webix.rules.isNotEmpty
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
      type: "number",
      invalidMessage: "Enter year between 1970 and 2019"
    },
    {
      view: "text",
      label: "Rating",
      name: "rating",
      type: "number",

      invalidMessage: "Rating cannot be empty or 0"
    },
    {
      view: "text",
      label: "Votes",
      name: "votes",
      type: "number",

      invalidMessage: "Votes must be less than 100000"
    },
    {
      view: "text",
      label: "Rank",
      name: "rank",
      type: "number",

      invalidMessage: "Rank cannot be empty"
    },
    {
      cols: [
        {
          view: "button",
          value: "Add new",
          type: "form",
          click: addItem
        },
        {
          view: "button",
          value: "Delete",
          click: deleteItem
        },
        {
          view: "button",
          value: "Update",
          click: updateForm
        },
        {
          view: "button",
          value: "Clear",
          click: clearForm
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

const aside = { css: "bg--grey", rows: [mainList, {}, connectedTemplate] };

const usersToolbar = {
  view: "toolbar",
  elements: [
    {
      view: "text",
      on: {
        onTimedKeyPress() {
          const value = this.getValue().toLowerCase();
          $$("usersList").filter(obj => obj.name.toLowerCase().indexOf(value) == 0);
        }
      }
    },
    {
      view: "button",
      value: "Sort asc",
      type: "form",
      width: 150,
      click() {
        $$("usersList").data.sort("name", "asc");
      }
    },
    {
      view: "button",
      value: "Sort desc",
      type: "form",
      width: 150,
      click() {
        $$("usersList").data.sort("name", "desc");
      }
    }
  ]
};

const usersList = {
  view: "list",
  id: "usersList",
  select: true,
  url: "/users",
  template:
    "<div class='list-row'>#name# from #country# <i class='webix_icon wxi-close removeUserItem'></i></div>",
  onClick: {
    removeUserItem(e, id) {
      this.remove(id);
    }
  },
  ready() {
    let counter = 0;
    $$("usersList").data.each((obj) => {
      if (counter <= 4) {
        obj.$css = "bg--orange";
        counter += 1;
      }
    });
  }
};

const usersChart = {
  view: "chart",
  id: "usersChart",
  type: "bar",
  value: "#age#",
  border: true,
  tooltip: {
    template: "#name# from #country#"
  },
  xAxis: {
    template: "'#age#",
    title: "Age"
  },
  url: "/users"
};

const productsTree = {
  view: "treetable",
  id: "productsTree",
  select: true,
  scroll: "y",
  columns: [
    {
      id: "id",
      header: ""
    },
    {
      id: "title",
      header: "Title",
      template: " {common.treetable()} #title#",
      fillspace: true
    },
    {
      id: "price",
      header: "Price",
      width: 200
    }
  ],
  url: "/products"
};

const main = {
  gravity: 4,
  cells: [
    { id: "Dashboard", cols: [filmsDatatable, editFilmsForm] },
    { id: "Users", rows: [{ rows: [usersToolbar, usersList] }, usersChart] },
    { id: "Products", rows: [productsTree] },
    { id: "Locations", template: "Locations" }
  ]
};

webix.ui({
  rows: [myAppToolbar, { cols: [aside, { view: "resizer" }, main] }, copyrightTemplate]
});

webix.ui(menuPopup);

$$("productsTree").openAll();
$$("usersChart").sync($$("usersList"));

// ///////////////////////////////////// data.votes format for server
// dataToAdd.votes = dataToAdd.votes
//   .split("")
//   .filter(item => item !== ".")
//   .reverse()
//   .reduce((acc, item, i, arr) => {
//     if ((i + 1) % 3 === 0 && i !== arr.length - 1) {
//       return [...acc, item, ","];
//     }
//     return [...acc, item];
//   }, [])
//   .reverse()
//   .join("");
