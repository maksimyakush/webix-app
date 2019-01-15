import { startCompare, stripHTML, getRandomNumber, getRandomUser } from "../helpers/helpers.js";

webix.protoUI({ name: "editlist" }, webix.EditAbility, webix.ui.list);

const clearForm = () => {
  webix.confirm({
    title: "Clear",
    text: "Are you sure you want to clear form?",
    callback(result) {
      if (result) {
        $$("editFilmsForm").clear();
        $$("filmsDatatable").unselectAll();
        $$("editFilmsForm").clearValidation();
      }
    }
  });
};

const saveForm = () => {
  if (!$$("editFilmsForm").validate()) return;
  const id = $$("editFilmsForm").getValues().id;
  if (!id) {
    webix.message("The data is added");
  } else {
    webix.message("The data is updated");
  }
  $$("editFilmsForm").save();
  $$("filmsDatatable").unselectAll();
  $$("editFilmsForm").clearValidation();
  $$("editFilmsForm").clear();
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
    {
      id: "category",
      header: ["Category", { content: "selectFilter" }],
      options: [
        { id: 1, value: "Drama" },
        { id: 2, value: "Fiction" },
        { id: 3, value: "Comedy" },
        { id: 4, value: "Horror" }
      ],
      sort: "string"
    },

    {
      id: "votes",
      header: ["Votes", { content: "textFilter", compare: startCompare }],
      sort: "int"
    },
    {
      id: "rating",
      header: ["Rating", { content: "textFilter", compare: startCompare }],
      sort: "string"
    },
    { id: "year", header: ["Year"], sort: "int" },
    { title: "Button", template: "<i class='webix_icon wxi-trash removeItem'></i>", width: 46 }
  ],
  rightSplit: 1,
  leftSplit: 1,
  select: true,
  onClick: {
    removeItem(e, id) {
      this.remove(id);
      return false;
    }
  },
  scheme: {
    $change(obj) {
      obj.rating = obj.rating.replace(",", ".");
      obj.votes = obj.votes.replace(",", "");
      obj.category = getRandomNumber(1, 5);
    }
  }
};

const selectorSegmented = {
  view: "segmented",
  id: "selectorSegmented",
  inputWidth: 300,
  options: [
    { id: 1, value: "All" },
    { id: 2, value: "Older" },
    { id: 3, value: "Modern" },
    { id: 4, value: "New" }
  ],
  on: {
    onChange() {
      $$("filmsDatatable").filterByAll();
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
          value: "Save",
          type: "form",
          click: saveForm
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
    },
    {
      view: "button",
      value: "Add User",
      type: "form",
      width: 150,
      click() {
        $$("usersList").add(getRandomUser());
      }
    }
  ]
};

const usersList = {
  view: "editlist",
  id: "usersList",
  select: true,
  editable: true,
  editaction: "dblclick",
  editor: "text",
  template:
    "<div class='list-row'>#name# from #country# (age #age#) <i class='webix_icon wxi-close removeUserItem'></i></div>",
  editValue: "name",
  rules: {
    name: webix.rules.isNotEmpty
  },
  url: "/users",
  onClick: {
    removeUserItem(e, id) {
      this.remove(id);
    }
  },
  scheme: {
    $init(obj) {
      if (obj.age < 26) obj.$css = "bg--yellow";
    }
  }
};

const usersChart = {
  view: "chart",
  id: "usersChart",
  type: "bar",
  border: true,
  value: "#country#",
  xAxis: {
    template: "#id#",
    title: "Users per country"
  },
  yAxis: {
    start: 0,
    end: 10,
    step: 2
  }
};

const productsTree = {
  view: "treetable",
  id: "productsTree",
  select: true,
  editable: true,
  editaction: "dblclick",
  scroll: "y",
  rules: {
    title: webix.rules.isNotEmpty,
    price: value => value >= 0 && webix.rules.isNotEmpty(value)
  },
  ready() {
    this.openAll();
  },
  columns: [
    {
      id: "id",
      header: ""
    },
    {
      id: "title",
      header: "Title",
      template: " {common.treetable()} #title#",
      fillspace: true,
      editor: "text"
    },
    {
      id: "price",
      header: "Price",
      width: 200,
      editor: "text"
    }
  ],
  url: "/products"
};

const aside = { css: "bg--grey", rows: [mainList, {}, connectedTemplate] };
const main = {
  gravity: 4,
  cells: [
    {
      id: "Dashboard",
      cols: [{ rows: [selectorSegmented, filmsDatatable], gravity: 2.5 }, editFilmsForm]
    },
    { id: "Users", rows: [{ rows: [usersToolbar, usersList] }, usersChart] },
    { id: "Products", rows: [productsTree] },
    { id: "Locations", template: "Locations" }
  ]
};

webix.ui({ rows: [myAppToolbar, { cols: [aside, { view: "resizer" }, main] }, copyrightTemplate] });
webix.ui(menuPopup);

$$("usersChart").sync($$("usersList"), function () {
  this.group({
    by: "country",
    map: {
      country: ["country", "count"]
    }
  });
});

$$("editFilmsForm").bind($$("filmsDatatable"));

$$("filmsDatatable").registerFilter(
  $$("selectorSegmented"),
  {
    columnId: "year",
    compare(value, filter, item) {
      if (filter == 1) return value;
      if (filter == 2) return value < 1990;
      if (filter == 3) return value >= 1990 && value < 2000;
      if (filter == 4) return value >= 2000;
    }
  },
  {
    getValue(node) {
      return node.getValue();
    },
    setValue(node, value) {
      node.setValue(value);
    }
  }
);

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
