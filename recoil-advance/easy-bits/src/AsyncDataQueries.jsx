import {
  RecoilRoot,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import { notifications, totalNotificationSelector } from "./store/adqAtoms.js";
import { useEffect } from "react";
import axios from "axios";

function AsyncDataQueries() {
  return (
    <RecoilRoot>
      <MainApp />
    </RecoilRoot>
  );
}

function MainApp() {
  const [networkCount, setNetworkCount] = useRecoilState(notifications)
  const totalNotificationCount = useRecoilValue(totalNotificationSelector);

  useEffect(() => {
    axios.get("https://sum-server.100xdevs.com/notifications")
      .then(res => {
        setNetworkCount(res.data)
        console.log(res.data);
      })
  }, [setNetworkCount])

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
