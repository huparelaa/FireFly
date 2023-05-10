import './diseño.scss';
import { Footer } from './Footer.js';
import { Header } from './Header';
import { HeroBanner } from './HeroBanner';
import { Content } from './Content';
const Home = () => {
    return (
        <div>   
            <div className='block'> 
                <div className="fireflies">
                    {Array.from({ length: 30 }).map((_, index) => (
                        <div className={`firefly firefly-${index + 1}`} key={index}></div>
                    ))}
                </div>
                <Header />
                <HeroBanner />
            </div>
            <div>
                <Content/>
            </div>
            <Footer />
        </div>
    );
};

export default Home;