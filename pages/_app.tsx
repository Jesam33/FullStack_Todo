import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import Link from "next/link";
import { wrapper } from "@/lib/store";

function App({ Component, pageProps }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(pageProps);

  return (
    <section className=" bg-slate-400 w-full p-5 overflow-hidden h-full items-center justify-center">
      <nav className="justify-center w-fit mx-auto flex ">
        {/* <h1 className="text-2xl mb-5">SSR Todo🎯</h1> */}
        <ul className="flex gap-5">
          <button className="bg-slate-900 px-4 md:p-4 text-white rounded-[10px] text-[14px]">
            <Link href="/">Add Todo </Link>
          </button>
          <button className="bg-slate-900 p-2 md:p-4 text-white rounded-[10px] text-[14px]">
            <Link href="/todo">Your Todos </Link>
          </button>
        </ul>
      </nav>
      <main className="">
       
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </main>
    </section>
  );
}

export default wrapper.withRedux(App);
