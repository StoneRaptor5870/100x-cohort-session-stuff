import { Suspense } from "react";
import {
  RecoilRoot,
  useRecoilValue,
} from "recoil";
import { notifications, totalNotificationSelector } from "./store/adqAtoms.js";

function AsyncDataQueries() {
  return (
    <RecoilRoot>
      <Suspense fallback={<div>Loading...</div>}>
        <MainApp />
      </Suspense>
    </RecoilRoot>
  );
}

function MainApp() {
  const networkCount = useRecoilValue(notifications)
  const totalNotificationCount = useRecoilValue(totalNotificationSelector);

  return (
    <div style={{display: "flex", justifyContent: "space-around", margin: "50px"}}>
      <button>Home</button>
      
      <button>My network ({networkCount.network >= 100 ? "99+" : networkCount.network})</button>
      <button>Jobs {networkCount.jobs}</button>
      <button>Messaging ({networkCount.messaging})</button>
      <button>Notifications ({networkCount.notifications})</button>

      <button>Me ({totalNotificationCount})</button>
    </div>
  )
}

export default AsyncDataQueries;
