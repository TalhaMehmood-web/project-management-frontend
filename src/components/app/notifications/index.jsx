import PageWrapper from "@/components/shared/molecules/page-wrapper";
import NotificatioRenderor from "./notification-renderor";

const GetAllNotifications = () => {
  return (
    <PageWrapper className=" flex-1 flex flex-col bg-white rounded-md my-2 shadow-custom-light  ">
      <NotificatioRenderor />
    </PageWrapper>
  );
};

export default GetAllNotifications;
