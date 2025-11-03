export const employeeIndexTableConfig = {
  features: "Karyawan",
  showToolbar: true,
  toolbar: {
    showSearch: true,
    showFilter: true,
    showAction: true,
    filters: ["date", "status"],
    actions: ["add", "export", "sync"],
  },
  showPagination: true,
  showSort: true,
};

export const employeeInventoriesTableConfig = {
  features: "Inventaris",
  showToolbar: true,
  toolbar: {
    showSearch: true,
    showFilter: false,
    showAction: false,
    filters: [],
    actions: [],
  },
  showPagination: true,
  showSort: true,
};

export const employeeEducationsDetailTableConfig = {
  features: "Pendidikan",
  showToolbar: true,
  toolbar: {
    showSearch: true,
    showFilter: false,
    showAction: false,
    filters: [],
    actions: ["add", "export", "import"],
  },
  showPagination: true,
  showSort: true,
};

export const employeeEducationsEditTableConfig = {
  features: "Pendidikan",
  showToolbar: true,
  toolbar: {
    showSearch: false,
    showFilter: false,
    showAction: true,
    filters: [],
    actions: ["add"],
  },
  showPagination: false,
  showSort: false,
};

// Todo Config Table 20/10/2025 (prior-mode):
// - Restructure /components/columns -> /components/features/columns|...
// - Actions row config + for url
// - Actions menu config + for url
// - DataTable implementation UI on edit/show
// - DataTable implementation multiple-function on show for pagination-relation feature
// - Sort header config

// - Filter panel config base on context data (features)


