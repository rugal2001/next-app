import Main from "@/layouts/main-layout";
import AuthLayout from "@/layouts/auth-layout";
import Stepper from './Stepper'

function Home() {
  return <>
  <div className="grid items-center justify-center h-screen gap-10 bg-gray-900">
    <Stepper/>
  </div>
  </>;
}

Home.GetLayout = function GetLayout(Page) {
  return (
    <AuthLayout>
      {Page}
      {/* <Main>{Page}</Main> */}
    </AuthLayout>
  );
};

export default Home;
