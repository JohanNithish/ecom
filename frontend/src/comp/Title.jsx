import React from 'react';

function Title(props) {
  return (
    <div className={`section-title ${props.center ? 'bb-center' : 'bb-deal'}`} data-aos="fade-up"
                        data-aos-duration="500" data-aos-once="true"
                        data-aos-delay="500">
      <div className="section-detail">
        <h2 className="bb-title">
          {props.main} {props.special && <span>{props.special}</span>}
        </h2>
        {props.sub && <p>{props.sub}</p>}
      </div>
      {props.children && <>{props.children}</>}
    </div>
  );
}

export default Title;
