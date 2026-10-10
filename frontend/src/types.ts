
export type Website = {
  id: string;
  domain: string;
  category: string;
  blocked: boolean;
};

export type NavItem = {
  label: string;
  icon: "layout" | "globe" | "chart" | "settings";
};
