import { Link } from "@remix-run/react";
import Footer from "./Footer";

export default function NotFound() {
  return (
    <div>
      <div className="h-[80vh] flex flex-col centered space-y-12">
        <h1 className="text-8xl font-display">404: Page Not Found</h1>
        <Link to="/" className="clickableLink text-4xl">
          Take me home!
        </Link>
      </div>
      <Footer />
    </div>
  );
}
