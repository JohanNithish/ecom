import { Link } from 'react-router-dom'; // Only needed if you're using React Router

const Breadcrumb = ({page}) => {
  return (
    <section className="section-breadcrumb margin-b-50">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="bb-breadcrumb-inner row">
              
              <div className="col-md-6 col-sm-12">
                <h2 className="bb-breadcrumb-title">{page}</h2>
              </div>

              <div className="col-md-6 col-sm-12">
                <ul className="bb-breadcrumb-list">
                  <li className="bb-breadcrumb-item">
                    {/* Use <Link> if using React Router, otherwise keep <a> */}
                    <Link to="/">Home</Link>
                    {/* or <Link to="/">Home</Link> */}
                  </li>
                  <li><i className="ri-arrow-right-double-fill"></i></li>
                  <li className="bb-breadcrumb-item active">{page}</li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Breadcrumb;
