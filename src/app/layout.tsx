import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // add weights you use
  variable: "--font-poppins",
});


export const metadata: Metadata = {
  title: "AI Nutrient Reporting Tool",
  description: "Generate detailed nutritional reports for feed ingredients using AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}>
        <header className="pb-6 bg-white lg:pb-0 sticky top-0 z-50 border-b border-gray-200 shadow-sm">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">

            <nav className="flex items-center justify-between h-16 lg:h-20">
              <div className="flex-shrink-0">
                <a href="/" title="" className="flex">
                  <p className="text-2xl font-bold text-green-500">AI Nutrient Reporting Tool</p>
                </a>
              </div>

              <button type="button" className="inline-flex p-2 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100">

                <svg className="block w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
                </svg>


                <svg className="hidden w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="hidden lg:flex lg:items-center lg:ml-auto lg:space-x-10">
                <a href="#" title="" className="text-base font-medium text-black transition-all duration-200 hover:text-green-600 focus:text-green-600"> Features </a>

                <a href="#" title="" className="text-base font-medium text-black transition-all duration-200 hover:text-green-600 focus:text-green-600"> Solutions </a>

                <a href="#" title="" className="text-base font-medium text-black transition-all duration-200 hover:text-green-600 focus:text-green-600"> Resources </a>

                <a href="#" title="" className="text-base font-medium text-black transition-all duration-200 hover:text-green-600 focus:text-green-600"> Pricing </a>
              </div>

              <a href="/mixes" title="" className="items-center justify-center hidden px-4 py-2 ml-10 text-base font-semibold text-white transition-all duration-200 bg-green-600 border border-transparent rounded-md lg:inline-flex hover:bg-green-700 focus:bg-green-700" role="button"> View All Mix </a>
            </nav>
            <nav className="pt-4 pb-6 bg-white border border-gray-200 rounded-md shadow-md lg:hidden">
              <div className="flow-root">
                <div className="flex flex-col px-6 -my-2 space-y-1">
                  <a href="#" title="" className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-green-600 focus:text-green-600"> Features </a>

                  <a href="#" title="" className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-green-600 focus:text-green-600"> Solutions </a>

                  <a href="#" title="" className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-green-600 focus:text-green-600"> Resources </a>

                  <a href="#" title="" className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-green-600 focus:text-green-600"> Pricing </a>
                </div>
              </div>

              <div className="px-6 mt-6">
                <a href="/mixes" title="" className="inline-flex justify-center px-4 py-2 text-base font-semibold text-white transition-all duration-200 bg-green-600 border border-transparent rounded-md tems-center hover:bg-green-700 focus:bg-green-700" role="button"> View All Mix </a>
              </div>
            </nav>
          </div>
        </header>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
