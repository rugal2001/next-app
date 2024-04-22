import AuthLayout from "@/layouts/auth-layout";
import Main from "@/layouts/main-layout";


function Home() {
  

  return (
    <>
      <div className='bo-step-done'>
        STEP 1
    </div>
    <div className='bo-step-active'>
        STEP 2
    </div>
    <div className='bo-step-todo'>
        STEP 3
    </div>
    </>
  );
}

Home.GetLayout = function GetLayout(Page) {
  return (
    <AuthLayout>
      <Main>{Page}</Main>
    </AuthLayout>
  );
};

export default Home;
