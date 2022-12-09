import { Button } from "@mui/material";
interface SvgIconProps extends React.SVGProps<SVGSVGElement> {}
const SortIcon = ({ children, ...props }: SvgIconProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      {...props}
    >
      <path
        d="M7 4a1 1 0 011 1v12.586l2.293-2.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L6 17.586V5a1 1 0 011-1zm9.293-.707a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L18 6.414V19a1 1 0 11-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414z"
        fillRule="evenodd"
        fill="currentColor"
      />
    </svg>
  );
};

export default SortIcon;
