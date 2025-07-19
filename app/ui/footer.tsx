export function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      <p>&copy; {new Date().getFullYear()} Iron Peak Fitness</p>
      <p>
        Follow us on{" "}
        <a href="https://twitter.com" className="text-blue-400">
          Twitter
        </a>
        ,{" "}
        <a href="https://facebook.com" className="text-blue-400">
          Facebook
        </a>
        , and{" "}
        <a href="https://instagram.com" className="text-blue-400">
          Instagram
        </a>
      </p>
    </footer>
  );
}