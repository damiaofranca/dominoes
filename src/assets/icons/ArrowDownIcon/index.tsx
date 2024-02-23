import { SVGProps } from "react";

const ArrowDownIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		width="42px"
		height="42px"
		fill="currentColor"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M21 3.5a17.5 17.5 0 1 0 0 35 17.5 17.5 0 0 0 0-35Zm.354 25.896a.5.5 0 0 1-.708 0l-7.542-7.542a.5.5 0 0 1 .353-.854H17a.5.5 0 0 0 .5-.5v-6a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 .5.5v6a.5.5 0 0 0 .5.5h3.543a.5.5 0 0 1 .353.854l-7.542 7.542Z" />
	</svg>
);
export default ArrowDownIcon;
