import { Provider } from "react-redux";
import { store } from "../redux/store";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";

import "@/styles/globals.css";
import "@/styles/auth.css";

// export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
// 	getLayout?: (page: ReactElement) => ReactNode;
// };

// type AppPropsWithLayout = AppProps & {
// 	Component: NextPageWithLayout;
// };

function MyApp({ Component, pageProps }:any) {
	// const getLayout = Component.getLayout ?? ((page: any) => page);

	return (

		<Provider store={store}>
			{/* {getLayout(<Component {...pageProps} />)} */}
			<Component {...pageProps} />
		</Provider>
	);
}

export default MyApp;
