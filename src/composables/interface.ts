export interface IBreadcrumb {
  text: string;
  href?: string;
  to?: object;
}

export interface IBreadcrumbCollapsed extends IBreadcrumb {
  ellipsis?: boolean;
}
export interface IBreadcrumbDropdown extends IBreadcrumb {
  dropdown?: boolean;
}
