type SidebarItem = {
  title: string;
  link?: any;
  children?: any;
};
export const SidebarData: SidebarItem[] = [
  {
    title: "Dashboard",
    link: "/",
  },
  {
    title: "Companies",
    children: [
      { title: "View Companies", link: "/companies" },
      { title: "Add Company", link: "/company/add" },
    ],
  },
  {
    title: "Jobs",
    children: [
      { title: "View Jobs", link: "/jobs" },
      { title: "Add Job", link: "/job/add" },
    ],
  },
  {
    title: "Benefits",
    link: "/benefits",
  },

  {
    title: "Job Type",
    link: "/job-type",
  },
  {
    title: "Skills",
    link: "/skills",
  },
  {
    title: "Technologies",
    link: "/technologies",
  },
  {
    title: "Categories",
    link: "/categories",
  },
  {
    title: "Location",
    link: "/location",
  },
];
