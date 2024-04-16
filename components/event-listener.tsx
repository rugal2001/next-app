import httpClientReq from "@/lib/http-client-req";

const EventListener = (
  myData,
  responseId,
  eventType,
) => {
  const submitActivity = async () => {
    const currentUrl = window.location.href;
    // console.log({ currentUrl });
    try {
      const insertedData = {
        functionId: responseId,
        submitTime: Date.now(),
        user: myData,
        eventType,
        pageUrl: currentUrl,
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
