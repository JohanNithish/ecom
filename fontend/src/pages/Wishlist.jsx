import Breadcrumb from "../comp/Breadcrum";
import ProductCard from "../comp/ProductCard";

const products = [
    {
      id: 1,
      category: 'Sauces',
      title: 'Tomato Ketchup Pack',
      newPrice: '$9',
      oldPrice: '$10',
      weight: '500g',
      rating: [1, 1, 1, 1, 0],
      image: '/src/img/new-product/8.jpg',
      hoverImage: '/src/img/new-product/back-8.jpg',
      flag: 'New',
    },
    {
      id: 2,
      category: 'Vegetable',
      title: 'America Capcicum',
      newPrice: '$4',
      oldPrice: '$10',
      weight: '500g',
      rating: [1, 0, 0, 0, 0],
      image: '/src/img/new-product/21.jpg',
      hoverImage: '/src/img/new-product/21.jpg',
      flag: 'Sale',
    },
    {
      id: 3,
      category: 'Vegetable',
      title: 'Organic Banana',
      newPrice: '$9',
      oldPrice: '$10',
      weight: '6pcs',
      rating: [1, 1, 1, 1, 1],
      image: '/src/img/new-product/24.jpg',
      hoverImage: '/src/img/new-product/24.jpg',
      flag: '',
    },
    {
      id: 4,
      category: 'Vegetable',
      title: 'Red organic Onion',
      newPrice: '$10',
      oldPrice: '$15',
      weight: '5kg',
      rating: [1, 1, 1, 1, 0],
      image: '/src/img/new-product/19.jpg',
      hoverImage: '/src/img/new-product/19.jpg',
      flag: 'New',
    }
  ];
const Wishlist = () => (
    <>
    <Breadcrumb page={"Wishlist"} />
  <section className="section-wishlist padding-tb-50">
    <div className="container">
      <div className="mb-minus-24 bb-wish-rightside row">
                      {products.map((product) => (
                        <ProductCard key={product.id} product={product} wishlist={true} />
                      ))}
      </div>
    </div>
  </section>
  </>
);

export default Wishlist;
