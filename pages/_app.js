import "../styles/globals.css";
import Layout from "@/Components/Layout";
import Toaster from "@/Components/toaster";
import Loader from "@/Components/loader";
import { useEffect, useState, createContext } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const Context = createContext();
export const userContext = createContext();

function App({ Component, pageProps }) {
  const [initial, setInitial] = useState({});
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});
  const [serviceDetails, setServiceDetails] = useState({});
  const [toasts, setToast] = useState({
    type: "",
    message: "",
    id: new Date().getTime()
  });
  const router = useRouter();

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
    console.log("drfdtftfyfgyhftgytgfygf", user);
    if (user) {
      setUser(JSON.parse(user));
      // router.push("/");
    }
    // else {
    //   if (router.route !== "/login" && router.route !== "/signup") {
    //     router.push("/login");
    //   }
    // }
  };

  return (
    <>
     
        <userContext.Provider value={[user, setUser]}>
          <Context.Provider value={[initial, setInitial]}>
              <ToastContainer containerId={new Date().getTime()} />
              {/* <Loader open={open} /> */}

              {/* <div className="fixed right-5 top-20 min-w-max z-50">
            {!!toast.message && (
              <Toaster type={toast.type} message={toast.message} />
            )}
          </div> */}

              <Layout loader={setOpen} toaster={(t) => toast(t.message)} open={open}>

                {/* <Loader open={open} /> */}
                {/* <div className="fixed right-5 top-20 min-w-max">
              {!!toast.message && (
                <Toaster type={toast.type} message={toast.message} />
              )}
            </div> */}
                {/* <Home /> */}
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
        </>
  );
}
// export default App;
export default App;
