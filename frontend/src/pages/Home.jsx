import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion, AnimatePresence } from 'framer-motion';
import {
  faTv,
  faMobileAlt,
  faTshirt,
  faBook,
  faUtensils,
  faChevronDown,
  faChevronUp,
  faLaptop,
  faStore,
  faHeart,
  faHome,
  faGamepad,
  faBaby,
  faEllipsisH,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

// ---------------------
//       CATEGORIES
// ---------------------

const categories = [
  {
    name: 'Official Stores',
    icon: faStore,
    subcategories: [
      'Phones & Accessories (Samsung, Tecno, Infinix, iPhone, Fire/Nord, Oraimo)',
      'Electronics (Vitron, Vision Plus, TCL, Hisense, Mibrochoice)',
      'Appliances (Nunix, Ramtons, Hotpoint, Mika)',
      'Home (Solarmax, Nunix, Anyour, Reberry, Miniso)',
      'Health & Beauty (Garnier, Nivea, Maybelline, MAC, Nice & Lovely)',
      'Computing (Hp, Lenovo, Dell, Canon, Asus)',
      'Fashion (Adidas, Ecko Unltd)',
      'Baby Products (Huggies)',
      'Grocery (Coca Cola)',
    ],
  },
  {
    name: 'Phones & Tablets',
    icon: faMobileAlt,
    subcategories: [
      'Mobile Phones (Smartphones, iOS Phones, Feature Phones, Smartphones under 10k, Feature phones under 2,000)',
      'Accessories (Bluetooth Headsets, Smart Watches, Cases & Sleeves, Portable Powerbanks, etc.)',
      'Tablets (Tablet Accessories, Tablet Bags & Covers)',
      'Top Smartphone Brands (Samsung, Xiaomi, Nokia, iPhone, Infinix, Huawei, Oppo)',
    ],
  },
  {
    name: 'TVs & Audio',
    icon: faTv,
    subcategories: ['LED TVs', 'Smart TVs', 'Home Theatre', 'Speakers', 'Sound Bars', 'DVD Players'],
  },
  {
    name: 'Appliances',
    icon: faLaptop,
    subcategories: ['Microwaves', 'Blenders', 'Mixers', 'Toasters', 'Vacuum Cleaners'],
  },
  {
    name: 'Health & Beauty',
    icon: faHeart,
    subcategories: ['Makeup', 'Skincare', 'Hair Care', 'Fragrances'],
  },
  {
    name: 'Home & Office',
    icon: faHome,
    subcategories: ['Furniture', 'Bedding', 'Decor', 'Office Supplies'],
  },
  {
    name: 'Fashion',
    icon: faTshirt,
    subcategories: ['Men', 'Women', 'Kids', 'Accessories'],
  },
  {
    name: 'Computing',
    icon: faLaptop,
    subcategories: ['Laptops', 'Desktops', 'Components', 'Accessories'],
  },
  {
    name: 'Gaming',
    icon: faGamepad,
    subcategories: ['Consoles', 'Games', 'Accessories'],
  },
  {
    name: 'Supermarket',
    icon: faUtensils,
    subcategories: ['Fresh Produce', 'Snacks', 'Beverages', 'Bakery', 'Dairy', 'Household Essentials'],
  },
  {
    name: 'Baby Products',
    icon: faBaby,
    subcategories: ['Diapers', 'Feeding', 'Toys', 'Baby Care'],
  },
  {
    name: 'Other Categories',
    icon: faEllipsisH,
    subcategories: ['Misc 1', 'Misc 2', 'Misc 3'],
  },
  {
    name: 'Electronics',
    icon: faTv,
    subcategories: ['Televisions', 'Refrigerators', 'Cookers', 'Air Conditioners', 'Washing Machines', 'Laptops', 'Cameras'],
  },
  {
    name: 'Mobiles',
    icon: faMobileAlt,
    subcategories: ['Smartphones', 'Feature Phones', 'Accessories'],
  },
  {
    name: 'Cloths',
    icon: faTshirt,
    subcategories: ['Men', 'Women', 'Kids', 'Accessories'],
  },
  {
    name: 'Books',
    icon: faBook,
    subcategories: ['Fiction', 'Non-Fiction', 'Educational', 'Comics', 'Magazines'],
  },
  {
    name: 'Food & Supermarket',
    icon: faUtensils,
    subcategories: ['Fresh Produce', 'Snacks', 'Beverages', 'Bakery', 'Dairy', 'Household Essentials'],
  },
];

// ---------------------
//       SIDEBAR COMPONENT
// ---------------------

function Sidebar() {
  const [expanded, setExpanded] = useState({});

  const toggleCategory = (categoryName) => {
    setExpanded((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }));
  };

  return (
    <nav
      className="w-full md:w-64 bg-white shadow-xl rounded-lg p-4 transition-all duration-500 ease-in-out overflow-y-auto"
      style={{ maxHeight: '70vh' }}
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Categories</h2>
      <ul>
        {categories.map((category, index) => (
          <li key={index} className="mb-3">
            <button
              onClick={() => toggleCategory(category.name)}
              className="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded transition-colors duration-200 focus:outline-none"
              aria-expanded={expanded[category.name] ? 'true' : 'false'}
            >
              <div className="flex items-center">
                <FontAwesomeIcon icon={category.icon} className="mr-3 text-blue-500" />
                <span className="font-medium text-gray-700">{category.name}</span>
              </div>
              <FontAwesomeIcon
                icon={expanded[category.name] ? faChevronUp : faChevronDown}
                className="text-gray-500"
              />
            </button>
            {expanded[category.name] && (
              <ul className="mt-2 ml-6 border-l border-gray-200 pl-4 transition-all duration-500 ease-in-out">
                {category.subcategories.map((sub, idx) => (
                  <li
                    key={idx}
                    className="py-1 text-gray-600 hover:text-blue-600 cursor-pointer transition-colors duration-200"
                  >
                    {sub}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

// ---------------------
//  RECOMMENDED PRODUCTS SLIDER
// ---------------------

function RecommendedProducts() {
  const images = [
    {
      src: 'https://via.placeholder.com/800x400?text=Flash+Sale+1',
      alt: 'Flash Sale 1',
    },
    {
      src: 'https://via.placeholder.com/800x400?text=Flash+Sale+2',
      alt: 'Flash Sale 2',
    },
    {
      src: 'https://via.placeholder.com/800x400?text=Flash+Sale+3',
      alt: 'Flash Sale 3',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play slider
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [images.length]);

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative mt-8 bg-white p-6 rounded-lg shadow-xl transition-transform duration-300 hover:scale-105">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Recommended Products</h2>
      <div className="relative w-full h-64 overflow-hidden rounded-lg">
        {images.map((image, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
      {/* Slider Controls */}
      <button
        onClick={goPrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-all duration-300"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <button
        onClick={goNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-all duration-300"
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
}

// ---------------------
//      PRODUCT CARD (Newly Added)
// ---------------------

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-blue-600 font-bold mt-2">{product.price}</p>
        <button
          onClick={onAddToCart}
          className="mt-4 w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

// Sample products array for the new product grid
const products = [
  {
    id: 1,
    name: "Premium Headphones",
    price: "$299.99",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: "$199.99",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 3,
    name: "Wireless Speaker",
    price: "$149.99",
    image:
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=500&q=60",
  },
];

// ---------------------
//       HOME PAGE
// ---------------------

function HomeImproved() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Banner */}
        <section className="relative rounded-xl overflow-hidden">
          <img
            src="https://via.placeholder.com/1200x400?text=Hero+Banner"
            alt="Hero Banner"
            className="w-full h-96 object-cover transition-transform duration-500 ease-out hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
            <div className="ml-12 text-white transform transition-all duration-700 ease-in-out hover:scale-105">
              <h2 className="text-4xl font-bold mb-4">Summer Sale</h2>
              <p className="text-xl mb-6">Up to 50% off on selected items</p>
              <button className="bg-blue-600 px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 animate-bounce">
                Shop Now
              </button>
            </div>
          </div>
        </section>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <aside className="md:w-1/4">
            <Sidebar />
          </aside>
          {/* Main Content */}
          <section className="md:w-3/4 space-y-6">
            <h1 className="text-4xl font-extrabold text-gray-800">Welcome to UniShop</h1>
            <p className="text-lg text-gray-600">
              Explore our extensive range of products and enjoy exclusive deals!
            </p>
            <RecommendedProducts />
          </section>
        </div>

        {/* NEW: Featured Products Section */}
        <section className="mt-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => console.log('Added product', product.id)}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomeImproved;
