import React from 'react';

const Hamburger = () => {
  return (
    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
      <path className="inline-flex" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
      <path className="hidden" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

export default Hamburger;