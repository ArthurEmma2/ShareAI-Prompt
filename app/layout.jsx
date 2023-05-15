import  '@styles/globals.css';

export const metadata = {
    title : "ShareAI-Prompt",
    description : "Share your basic prompt with your friends"
}


function RootLayout({children}) {
  return (
   <html lang="en">
    <body>
        <div className="main">
            <div className="gradient" />
        </div>
        <main className="app">
            {/* <Header /> */}
            {children}
        </main>
    </body>
   </html>
  )
}

export default RootLayout