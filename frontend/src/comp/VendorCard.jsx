function VendorCard({ vendor }) {
  return (
    <div className="bb-vendors-img fade-tab-panel">
      <a href="#" className="bb-vendor-init">
        <i className="ri-arrow-right-up-line"></i>
      </a>
      <img alt={`vendors-img-${vendor.id}`} src={vendor.mainImage} />
      <div className="vendors-local-shape">
        <div className="inner-shape"></div>
        <img alt={`vendor-${vendor.id}`} src={vendor.vendorImage} />
      </div>
    </div>
  );
}

export default VendorCard;