export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="container px-4 py-8 md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex flex-col items-center gap-4 text-sm text-muted-foreground sm:flex-row">
            <p>
              &copy; {new Date().getFullYear()} Image Dash. All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <p>
              Made with ❤️ <a href="https://github.com/isixe">isixe</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
