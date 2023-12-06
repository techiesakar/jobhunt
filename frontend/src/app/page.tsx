import EmployeeSeek from "@/components/page-components/home/employeeseek/EmployeeSeek";
import Hero from "@/components/page-components/home/hero/Hero";
import NewsLetter from "@/components/page-components/home/newsletter/NewsLetter";
import Companies from "@/components/ui/company/Companies";
import Categories from "@/components/page-components/home/categories/Categories";
import FilterSearch from "@/components/page-components/home/filter-search/FilterSearch";
import CallToAction from "@/components/page-components/home/cto/CallToAction";
import QuickSearch from "@/components/page-components/home/quick-search/QuickSearch";
import BenefitContextProvider from "@/hoc/context/BenefitContextProvider";
import JobtypeContextProvider from "@/hoc/context/JobTypeContextProvider";
import SkillContextProvider from "@/hoc/context/SkillContextProvider";
import TechnologyContextProvider from "@/hoc/context/TechnologyContextProvider";
import LocationContextProvider from "@/hoc/context/LocationContextProvider";
import CategoryContextProvider from "@/hoc/context/CategoryContextProvider";
import JobContextProvider from "@/hoc/context/JobContextProvider";
import CompanyContextProvider from "@/hoc/context/CompanyContextProvider";

export default async function Home() {
  return (
    <>
      <CompanyContextProvider>
        <JobContextProvider>
          <CategoryContextProvider>
            <LocationContextProvider>
              <TechnologyContextProvider>
                <SkillContextProvider>
                  <JobtypeContextProvider>
                    <BenefitContextProvider>
                      <FilterSearch />
                      <CallToAction />
                      <Categories />
                      <Companies />
                      <QuickSearch />
                    </BenefitContextProvider>
                  </JobtypeContextProvider>
                </SkillContextProvider>
              </TechnologyContextProvider>
            </LocationContextProvider>
          </CategoryContextProvider>
        </JobContextProvider>
      </CompanyContextProvider>
    </>
  );
}
