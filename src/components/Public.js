import { Link } from "react-router-dom";

const Public = () => {
  const content = (
    <section className="public">
      <header>
        <h1>
          Welcome to{" "}
          <span className="nowrap">CBE Maintainance Management System</span>
        </h1>
      </header>
      <main className="public__main">
        <p>
          Located in Beautiful Hawassa City, We provides a trained staff ready
          to meet your tech repair needs.
        </p>
        <address className="public__addr">
          CBEMMS
          <br />
          Hawassa Gafuma Branch
          <br />
          <a href="tel:+15555555555">(555) 555-5555</a>
        </address>
        <br />
      </main>
      <footer>
        <Link to="/login">Employee Login</Link>
      </footer>
    </section>
  );
  return content;
};
export default Public;
