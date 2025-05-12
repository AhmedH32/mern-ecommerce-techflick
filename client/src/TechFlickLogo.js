export const TechFlickLogo = ({ className, color = "#0d6efd" }) => (
  <svg 
    className={className}
    viewBox="0 0 100 100" 
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="TechFlick Logo"
  >
    {/* Circular container */}
    <circle cx="50" cy="50" r="45" stroke={color} strokeWidth="6" />
    
    {/* TF Letters */}
    <g fill={color}>
      
      <rect x="23" y="25" width="30" height="10" rx="2" />
      <rect x="33" y="25" width="10" height="40" rx="2" /> 
      
      {/* F */}
     
      <rect x="57" y="33" width="22" height="10" rx="2" />
      <rect x="57" y="51" width="18" height="10" rx="2" />
      <rect x="50" y="33" width="10" height="45" rx="2" />
   
    </g>
  </svg>
);
export default TechFlickLogo