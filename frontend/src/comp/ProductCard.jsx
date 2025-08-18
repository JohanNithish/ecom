import { Link } from "react-router-dom"

function ProductCard({ product, wishlist }) {
  const ImgSrc = import.meta.env.VITE_IMG;
  return (
  <div
    className="col-xl-3 col-md-4 col-6 mb-24 bb-product-box"
  >
    <div className="bb-pro-box" data-aos="fade-up"
                        data-aos-duration="500" data-aos-once="true"
                        data-aos-delay="600">
      <div className="bb-pro-img">
       {wishlist ? <div className="bb-wishlist">
        <span className="bb-remove-wish">
          <a><i className="ri-close-circle-fill"></i></a>
        </span>
        </div> : <span className="flags"><span>{product.deal}</span></span> } 
        
        <div className="inner-img">
          <img className="main-img" alt={product.productname} src={ImgSrc+product.images[0]} />
          <img className="hover-img" alt={product.productname} src={ImgSrc+product.images[1]} />
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
          <Link to={`/productdetails/`+product.url}>{product.category}</Link>
          <span className="bb-pro-rating">
            <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-line"></i>
          </span>
        </div>
        <h4 className="bb-pro-title"><Link to={`/productdetails/`+product.url}>{product.productname}</Link></h4>
        <div className="bb-price">
          <div className="inner-price">
            <span className="new-price">{`₹`+product.price[0].offerprice}</span>
              {product.price[0].mrp && <span className="old-price">{`₹`+product.price[0].mrp}</span>}
              {product.price[0].stock <= 0 ? (<span className="item-left">Out Of Stock</span>) : product.price[0].stock <= 25 ? (<span className="item-left">{product.price[0].stock} Left</span>) : null }
          </div>
          <span className="last-items">{product.price[0].metric}</span>
        </div>
      </div>
    </div>
  </div>


  )
}

export default ProductCard