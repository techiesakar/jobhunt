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
  company_name: string;
  agent_name: string;
  company_email: string;
  company_phone: string;
  image: "string";
};

export type CompanyFormType = Omit<CompanyType, "id">;

export type JobType = {
  id: string;
  name: "";
  job_phone: "";
  job_email: "";
  company_name: "";
  job_types: [];
  job_categories: [];
  job_skills: [];
  job_technologies: [];
  job_benefits: [];
  job_locations: [];
  job_salary: "";
  job_experience: "";
  job_desc: "";
  who_to_apply: "";
  vacancy_deadline: "";
  job_image: [];
};
