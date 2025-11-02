import './globals.css'

export const metadata = {
  title: 'Jira Project Management',
  description: 'Microservices-based project management system'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}

