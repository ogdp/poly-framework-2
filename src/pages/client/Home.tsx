import Header from "../../components/client/Header";
import Footer from "../../components/client/Footer";
type Props = {};

const Home = (props: Props) => {
  return (
    <section>
      <Header />
      <main>
        <h1 className="text-3xl font-bold">
          <i className="fa-brands fa-twitter"></i>Home !
        </h1>
      </main>
      <Footer />
    </section>
  );
};

export default Home;
