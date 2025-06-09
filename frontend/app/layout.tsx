import './globals.css'
import  Navbar  from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import Footer from '@/components/Footer'


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='h-full'>
      <body className='flex flex-col min-h-screen'>
         <Navbar />
            <div className="flex flex-1">
              <Sidebar />
                <main className="flex-grow">{children}</main>
            </div>
         <Footer />
      </body>
    </html>
  )
}