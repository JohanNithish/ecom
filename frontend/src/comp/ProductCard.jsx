import { NavLink } from "react-router-dom"

function ProductCard({ product, wishlist }) {
  return (
  <div
    className="col-xl-3 col-md-4 col-6 mb-24 bb-product-box"
    style={{ animationDelay: '200ms' }}
  >
    <div className="bb-pro-box" data-aos="fade-up"
                        data-aos-duration="500" data-aos-once="true"
                        data-aos-delay="600">
      <div className="bb-pro-img">
       {wishlist ? <div className="bb-wishlist">
        <span className="bb-remove-wish">
          <a><i className="ri-close-circle-fill"></i></a>
        </span>
        </div> : <span className="flags"><span>{product.flag}</span></span> } 
        
        <div className="inner-img">
          <img className="main-img" alt={product.title} src={product.image} />
          <img className="hover-img" alt={product.title} src={product.hoverImage} />
        </div>
        <ul className="bb-pro-actions">
          <li className="bb-btn-group"><a title="Wishlist" href="/wishlist"><i className="ri-heart-line"></i></a></li>
          <li className="bb-btn-group"><a title="Quick View" href="#" data-bs-toggle="modal" data-bs-target="#bry_quickview_modal"><i className="ri-eye-line"></i></a></li>
          <li className="bb-btn-group"><a title="Compare" href="/compare"><i className="ri-repeat-line"></i></a></li>
          <li className="bb-btn-group"><a title="Add To Cart" href="/cart"><i className="ri-shopping-bag-4-line"></i></a></li>
        </ul>
      </div>
      <div className="bb-pro-contact">
        <div className="bb-pro-subtitle">
          <a href="/shop">{product.category}</a>
          <span className="bb-pro-rating">
            {product.rating.map((star, i) => (
              <i key={i} className={star ? 'ri-star-fill' : 'ri-star-line'}></i>
            ))}
          </span>
        </div>
        <h4 className="bb-pro-title"><NavLink to="/product">{product.title}</NavLink></h4>
        <div className="bb-price">
          <div className="inner-price">
            <span className="new-price">{product.newPrice}</span>
            {product.oldPrice && <span className="old-price">{product.oldPrice}</span>}
            {product.outOfStock && <span className="item-left">Out Of Stock</span>}
          </div>
          {product.weight && <span className="last-items">{product.weight}</span>}
        </div>
      </div>
    </div>
  </div>


  )
}

export default ProductCard