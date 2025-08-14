import { faHomeAlt, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function AdminHeader({page}) {
  return (
    <>
    <div className="breadcrumb">
    <div className="bb-breadcrumb-inner d-flex">
      <div className="admin-breadcrums">
<ul className="bb-breadcrumb-list"><li className="bb-breadcrumb-item"><Link to="/admin/home" className="text-decoration-none clr-theme" data-discover="true"><FontAwesomeIcon icon={faHomeAlt}/> Home</Link></li><li><i className="ri-arrow-right-double-fill"></i></li><li className="bb-breadcrumb-item active">{page}</li></ul>
      </div>
      <div className="d-flex gap-2   align-items-center">
        <FontAwesomeIcon icon={faUserCircle} className="clr-theme" />
        <h6 className="mb-0"> <span className="fs-small">Hi, </span>Admin</h6>
      </div>
    </div>
    </div>
    </>
  )
}

export default AdminHeader