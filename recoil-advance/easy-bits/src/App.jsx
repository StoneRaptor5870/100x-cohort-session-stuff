import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";
import { jobsAtom, messagingAtom, networkAtom, notificationAtom, totalNotifSelector } from "./store/atoms";
import PropTypes from 'prop-types';

function App() {
  return (
    <RecoilRoot>
      <MainApp />
    </RecoilRoot>
  )  
}

function MainApp() {
  const networkNotificationAtom = useRecoilValue(networkAtom);
  const jobsCount = useRecoilValue(jobsAtom);
  const notifCount = useRecoilValue(notificationAtom);
  const msgCount = useRecoilValue(messagingAtom);
  const totalNotifCount = useRecoilValue(totalNotifSelector); 

  return (
    <div style={{display: "flex", justifyContent: "space-around", margin: "50px"}}>
      <button>Home</button>

      <button>My Network ({networkNotificationAtom >= 100 ? "99+" : networkAtom})</button>
      <button>Jobs ({jobsCount})</button>
      <button>Messaging ({msgCount})</button>
      <button>Notification ({notifCount})</button>

      <ButtonUpdater>{totalNotifCount}</ButtonUpdater>
    </div>
  );
}

function ButtonUpdater({children}) {
  const setMsgCount = useSetRecoilState(messagingAtom);
  return (
    <button onClick={() => setMsgCount(c => c + 1)}>Me ({children})</button>
  )
}

ButtonUpdater.propTypes = {
  children: PropTypes.node.isRequired
};

export default App;
