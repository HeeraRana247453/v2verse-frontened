import Header from '../components/Layout/Header';
import Hero from '../components/Route/Hero/Hero';
import Categories from '../components/Route/Categories/Categories';
import BestDeals from '../components/Route/BestDeals/BestDeals';
import FeaturedProduct from '../components/Route/FeaturedProduct/FeaturedProduct';
import Sponsored from '../components/Route/Sponsored.jsx';
import Footer from '../components/Layout/Footer.jsx';
import MostPopularEvent from './MostPopularEvent.jsx';
import Banner from '../components/Route/Hero/Banner.jsx';


const HomePage = () => {

  return (
    <div>
      <Header activeHeading={1} />
      {/* <Hero /> */}
      <Banner/>
      <Categories />
      <BestDeals />
      <MostPopularEvent/>
      <FeaturedProduct />
      <Sponsored />
      <Footer />
    </div>
  )
}
export default HomePage;