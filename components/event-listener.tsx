import httpClientReq from "@/lib/http-client-req";

const EventListener = (
  eventType,
  myData,
  post,
  onUpdateEvent,
  oldData=null,
  comment=null,
) => {
  console.log({myData,post,eventType})
  
  const submitActivity = async () => {
   
    try {
      const insertedData = {
        eventType:eventType,
        oldData,
        user: myData,
        post:post,   
        comment  
      };
      const response = await httpClientReq.post("/activity", insertedData);
      onUpdateEvent();
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
