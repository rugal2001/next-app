import httpClientReq from "@/lib/http-client-req";

const EventListener = (
  myData,
  post,
  eventType,
) => {
  console.log('create event =>',Date.now())
  console.log('==================================')
  const submitActivity = async () => {
    // const currentUrl = window.location.href;
    // console.log({ currentUrl });
    try {
      const insertedData = {
        post:post,
        submitTime: Date.now(),
        eventType,
        user: myData,
      };
      const response = await httpClientReq.post("/activity", insertedData);
    } catch (error) {
      console.error(error);
    }
  };
  submitActivity();

  return (
    <>
      <div className=""></div>
    </>
  );
};

export default EventListener;

/**function myFunction(...params) {
  // Treat each parameter individually
  params.forEach((param, index) => {
    console.log("Parameter", index + 1, ":", param);
  });
}

// Call the function with multiple arguments
myFunction(1, "hello", true);
 */
