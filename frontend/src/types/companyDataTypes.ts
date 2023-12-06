export type companyDataTypes = {
  title: string;
  content: string;
  image: string;
  link: string;
  tags: {
    tagName: string;
  }[];
  jobs?: {
    title: string;
    salary: string;
    link?: string;

    tags: {
      tagName: string;
    }[];
    date_posted: string;
  }[];
};
