function GradientOne() {
  const startColor = "red";
  const stopColor = "black";
  const idKeySuffix = "_" + startColor + "_" + stopColor;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 557 588" fill="none">
      <g clip-path={`url(#clip_gradient_2022${idKeySuffix})`}>
        <rect width="557" height="588" fill="none"></rect>
        <path
          d="M514.129 89.7773C432.778 94.2356 259.384 48.5808 188.165 75.7628C116.945 102.945 -1.99289 24.3082 -28.2276 111.592C-54.4623 198.875 -169.645 229.901 -169.645 229.901L-157.794 -70.5365C-156.946 -92.0149 -137.588 -107.969 -116.343 -104.698L548.333 -2.35597C562.171 -0.225281 573.791 9.80182 574.379 23.7906C575.441 49.0666 567.89 86.831 514.129 89.7773Z"
          fill={`url(#paint_gradient_linear_2022${idKeySuffix})`}
        ></path>
      </g>
      <defs>
        <linearGradient
          id={`paint_gradient_linear_2022${idKeySuffix}`}
          x1="560.5"
          y1="1.5"
          x2="117.261"
          y2="255.144"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color={stopColor}></stop>
          <stop offset="1" stop-color={startColor}></stop>
        </linearGradient>
        <clipPath id={`clip_gradient_2022${idKeySuffix}`}>
          <rect width="557" height="588" fill="none"></rect>
        </clipPath>
      </defs>
    </svg>
  );
}
export default GradientOne;
