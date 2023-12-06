import { Button } from "@/components/ui/button";
import { BsArrowLeft } from "react-icons/bs";
import ErrorImage from "@assets/images/error-404.png";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center ">
      <div className="flex flex-col gap-6 justify-center items-center  w-11/12 text-center">
        <img src={ErrorImage} className="max-w-[300px]" alt="Error 404 Image" />
        <h1 className="hunt-h1">
          404: The page you are looking for isn’t here
        </h1>
        <p className="hunt-para">
          You either tried some shady route or you came here by mistake.
          Whichever it is, try using the navigation
        </p>
        <Button type="button" className=" bg-blue-600 p-4 rounded-lg">
          <Link to="/" className="flex items-center gap-2">
            <BsArrowLeft /> Go back to dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
};
export default NotFound;
