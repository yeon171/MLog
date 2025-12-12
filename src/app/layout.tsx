import './globals.css'
import Header from '@/components/layout/Header'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
