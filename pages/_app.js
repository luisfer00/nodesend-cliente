import "../styles/globals.css";
import { Provider } from "react-redux";
import reduxStore from "../redux";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={reduxStore}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
