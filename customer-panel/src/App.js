import { Routes, Route } from "react-router-dom";
// Customer Panel
import LandingPage from "./routes/landing-page/landing-page.component";
import UserProfile from "./routes/user-profile/user-profile.component";
import CollectionHomepage from "./routes/collection/collection-homepage.component";
import OrderHistory from "./routes/order-history/order-history.component";
import ProducPage from "./routes/product-page/product-page.component";
import CartPage from './routes/cart-page/cart-page.component';
import LoginPage from './routes/user-profile/loginpage.component';

// CSS
import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons'
import BottomNav from "./component/bottom-nav/bottom-nav.component";

library.add(fas, far, fab);

function App() {
  return (
    <div>
      <Routes>
        {/* Customer */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<CartPage/>} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/collection-page" element={<CollectionHomepage />} />
        <Route path="/product-page" element={<ProducPage />} />
        <Route path="/bitmoji-collection" element={<OrderHistory />} />
        <Route path="/ancient-textile-print-fusion" element={<OrderHistory />} />
        <Route path="/modest-collection" element={<OrderHistory />} />
      </Routes>
      <BottomNav />
    </div>
  );
}

export default App;
