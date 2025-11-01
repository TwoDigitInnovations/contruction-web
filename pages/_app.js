import "../styles/globals.css";
import Layout from "@/Components/Layout";
import Toaster from "@/Components/toaster";
import Loader from "@/Components/loader";
import { useEffect, useState, createContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LocationProvider } from "@/Components/context/LocationContext";

export const Context = createContext();
export const userContext = createContext();

function App({ Component, pageProps }) {
  const [initial, setInitial] = useState({});
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});

  const [toasts, setToast] = useState({
    type: "",
    message: "",
    id: new Date().getTime()
  });

  useEffect(() => {
    setOpen(open);
  }, [open]);

  useEffect(() => {
    setToast(toasts);
    if (!!toasts.message) {
      setTimeout(() => {
        setToast({ type: "", message: "", id: new Date().getTime() });
      }, 5000);
    }
  }, [toasts]);

  useEffect(() => {
    getUserDetail();
  }, []);

  const getUserDetail = async () => {
    const user = localStorage.getItem("userDetail");

    if (user) {
      setUser(JSON.parse(user));
    }
  };

  return (
    <>
      <LocationProvider>
        <userContext.Provider value={[user, setUser]}>
          <Context.Provider value={[initial, setInitial]}>
            <ToastContainer containerId={new Date().getTime()} />
            <Layout loader={setOpen} toaster={(t) => toast(t.message)} open={open}>
             <Loader open={open} />
              <Component
                {...pageProps}
                loader={setOpen}
                open={open}
                toaster={(t) => toast(t.message)}
                organization={initial}
                user={user}
              />
            </Layout>
          </Context.Provider>
        </userContext.Provider>
      </LocationProvider>

    </>
  );
}
// export default App;
export default App;
