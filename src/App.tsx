import {AppRoutes} from "./routes";
import {useLocation} from "react-router-dom";
import {capitalizeString, getLastRoutePart, useDocumentTitle} from '../libs/lib-sync-wise-utils'
function App() {
  const pathname = useLocation().pathname;
  useDocumentTitle(
      'Sync Wise | ' + capitalizeString(getLastRoutePart(pathname))
  );
  return <AppRoutes  />;
}

export default App;
