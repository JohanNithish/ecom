import React from 'react';
const Image = ({ src, alt = '', className = '' }) => {
  return new URL(`${src}`, import.meta.url).href;
};

export default Image;
