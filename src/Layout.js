import Header from "./components/Header";
import "./css/style.css";

function Layout({ children }) {
  return (
    <div className="wrap">
      <Header />
      {children}
    </div>
  );
}

export default Layout;
