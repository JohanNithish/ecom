import { Link } from "react-router-dom"

function Footer() {
    return (
        <footer className="bb-footer margin-t-50" ><div className="footer-directory ">
        </div><div className="footer-container"><div className="footer-top padding-tb-50"><div className="container"><div className="m-minus-991 row"><div className="bb-footer-cat col-12 col-lg-3"><div className="bb-footer-widget bb-footer-company"><img className="bb-footer-logo" alt="footer logo" src="/img/logo-1.png" /><img className="bb-footer-dark-logo" alt="footer logo" src="/img/logo/logo.png" /><p className="bb-footer-detail">GreenCart is the biggest market of grocery products. Get your daily needs from our store.</p><div className="bb-app-store"><Link to="/" className="app-img"><img className="adroid" alt="apple" src="/img/android.png" /></Link><Link to="/" className="app-img"><img className="apple" alt="apple" src="/img/apple.png" /></Link></div></div>
        </div><div className="bb-footer-info col-12 col-lg-2"><div className="bb-footer-widget"><h4 className="bb-footer-heading">Category<div className="bb-heading-res"><i className="ri-arrow-down-s-line"></i></div>
        </h4><div className="bb-footer-links bb-footer-dropdown" ><ul className="align-items-center"><li className="bb-footer-link"><Link>Snacks</Link>
        </li><li className="bb-footer-link"><Link to="/product">Juice</Link>
            </li><li className="bb-footer-link"><Link to="/product">Chips</Link>
            </li><li className="bb-footer-link"><Link to="/product">Spices</Link>
            </li><li className="bb-footer-link"><Link to="/product">Sauces</Link>
            </li><li className="bb-footer-link"><Link to="/product">Fruit</Link></li></ul></div></div>
            </div><div className="bb-footer-account col-12 col-lg-2"><div className="bb-footer-widget"><h4 className="bb-footer-heading">Company<div className="bb-heading-res"><i className="ri-arrow-down-s-line"></i></div>
            </h4><div className="bb-footer-links bb-footer-dropdown" ><ul className="align-items-center"><li className="bb-footer-link"><Link to="/about">About us</Link>
            </li><li className="bb-footer-link"><Link to="/delivery">Delivery</Link>
                </li><li className="bb-footer-link"><Link to="/">Legal Notice</Link>
                </li><li className="bb-footer-link"><Link to="/">Terms &amp; conditions</Link>
                </li><li className="bb-footer-link"><Link to="/checkout">Secure payment</Link>
                </li><li className="bb-footer-link"><Link to="/contact">Contact us</Link></li></ul></div></div>
            </div><div className="bb-footer-service col-12 col-lg-2"><div className="bb-footer-widget"><h4 className="bb-footer-heading">Account<div className="bb-heading-res"><i className="ri-arrow-down-s-line"></i></div>
            </h4><div className="bb-footer-links bb-footer-dropdown" ><ul className="align-items-center"><li className="bb-footer-link"><Link to="/login/">Sign In</Link>
            </li><li className="bb-footer-link"><Link to="/cart">View Cart</Link>
                </li><li className="bb-footer-link"><Link to="/">Return Policy</Link>
                </li><li className="bb-footer-link"><Link to="/">Become a Vendor</Link>
                </li><li className="bb-footer-link"><Link to="/">Affiliate Program</Link>
                </li><li className="bb-footer-link"><Link to="/checkout/">Payments</Link></li></ul></div></div>
            </div><div className="bb-footer-cont-social col-12 col-lg-3"><div className="bb-footer-contact"><div className="bb-footer-widget"><h4 className="bb-footer-heading">Contact<div className="bb-heading-res"><i className="ri-arrow-down-s-line"></i></div>
            </h4><div className="bb-footer-links bb-footer-dropdown" ><ul className="align-items-center"><li className="bb-footer-link bb-foo-location"><span className="mt-15px"><i className="ri-map-pin-line"></i>
            </span><p>GreenCart E-Commerce Pvt. Ltd., 179MR, Avinashi Road, Peelamedu, Coimbatore, Tamil Nadu 641004.</p>
            </li><li className="bb-footer-link bb-foo-call"><span><i className="ri-whatsapp-line"></i>
            </span><Link href="tel:+918123456789">+91 81234 56789</Link>
                </li><li className="bb-footer-link bb-foo-mail"><span><i className="ri-mail-line"></i>
                </span><Link href="mailto:greencart@gmail.com">greencart@gmail.com</Link></li></ul></div></div>
            </div><div className="bb-footer-social"><div className="bb-footer-widget"><div className="bb-footer-links bb-footer-dropdown"><ul className="align-items-center"><li className="bb-footer-link"><Link to="/"><i className="ri-facebook-fill"></i></Link>
            </li><li className="bb-footer-link"><Link to="/"><i className="ri-twitter-fill"></i></Link>
                </li><li className="bb-footer-link"><Link to="/"><i className="ri-linkedin-fill"></i></Link>
                </li><li className="bb-footer-link"><Link to="/"><i className="ri-instagram-line"></i></Link></li></ul></div></div></div></div></div></div>
        </div><div className="footer-bottom"><div className="container"><div className="row"><div className="bb-bottom-info"><div className="footer-copy"><div className="footer-bottom-copy "><div className="bb-copy">Copyright © <span id="copyright_year">2025 </
        span><Link className="site-name" href="/">GreenCart</Link> all rights reserved.</div></div>
        </div><div className="footer-bottom-right"><div className="footer-bottom-payment d-flex justify-content-center"><div className="payment-link"><img alt="payment" src="/img/payment.png" /></div></div></div></div></div></div></div></div>
        </footer>
    )
}

export default Footer