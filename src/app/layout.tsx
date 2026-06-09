import './globals.css'

export const metadata = {
  title: 'Circus Maximus',
  description: 'Ancient Roman Interactive World',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}