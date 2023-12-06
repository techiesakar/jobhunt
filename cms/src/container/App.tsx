import Layout from "@/hoc/Layout";
import Categories from "@/pages/categories/Categories";
import ViewCompanies from "@/pages/companies/ViewCompanies";
import AddCompany from "@/pages/companies/AddCompany";
import Dashboard from "@/pages/dashboard/Dashboard";
import NotFound from "@/pages/error/NotFound";
import JobType from "@/pages/jobType/JobType";
import Location from "@/pages/location/Location";
import Benefits from "@/pages/benefits/Benefits";
import Skills from "@/pages/skills/Skills";
import Technologies from "@/pages/technologies/Technologies";
import { Routes, Route } from "react-router-dom";
import ViewJobs from "@/pages/jobs/ViewJobs";
import AddJob from "@/pages/jobs/AddJob";
import SignIn from "@/pages/signin/SignIn";
import ProtectedRoute from "@/hoc/ProtectedRoute";

const routes = [
  { path: "/", component: Dashboard },
  { path: "/companies", component: ViewCompanies },
  { path: "/company/add", component: AddCompany },
  { path: "/benefits", component: Benefits },
  { path: "/jobs", component: ViewJobs },
  { path: "/job/add", component: AddJob },
  { path: "/job-type", component: JobType },
  { path: "/skills", component: Skills },
  { path: "/technologies", component: Technologies },
  { path: "/categories", component: Categories },
  { path: "/location", component: Location },
];

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Route>
        </Route>
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
