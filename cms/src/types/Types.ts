export type BenefitType = {
  id: string;
  name: string;
};

export type BenefitFormType = Omit<BenefitType, "id">;

export type CategoryType = {
  id: string;
  name: string;
  image: any;
  desc: string;
};

export type CategoryFormType = Omit<CategoryType, "id">;

export type JobTypeType = {
  id: string;
  name: string;
};

export type JobTypeFormType = Omit<JobTypeType, "id">;
export type LocationType = {
  id: string;
  name: string;
};

export type LocationFormType = Omit<LocationType, "id">;
export type SkillType = {
  id: string;
  name: string;
  type: string;
};

export type SkillFormType = Omit<SkillType, "id">;

export type TechnologyType = {
  id: string;
  name: string;
};

export type TechnologyFormType = Omit<TechnologyType, "id">;

export type CompanyType = {
  id: string;
  company_name: "";
  ceo_name?: "";
  agent_name: "";
  company_phone: "";
  company_email: "";
  date_founded?: "";
  total_employee?: "";
  benefits?: [];
  categories?: [];
  technologies?: [];
  description?: "";
  locations?: [];
  image: [];

  facebook?: "";
  instagram?: "";
  youtube?: "";
  twitter?: "";
  tiktok?: "";
  linkedin?: "";
  github?: "";
  pinterest?: "";
  thread?: "";
};

export type CompanyFormType = Omit<CompanyType, "id">;

export type JobType = {
  id: string;
  name: "";
  job_phone: "";
  job_email: "";
  company: {
    company_name: "";
  };
  jobtypes: [];
  categories: [];
  skills: [];
  technologies?: [];
  benefits?: [];
  locations: [];
  job_salary: "";
  job_experience: "";
  job_desc: "";
  who_to_apply: "";
  vacancy_deadline: "";
  job_image?: [];
};

export type JobFormType = Omit<JobType, "id">;
