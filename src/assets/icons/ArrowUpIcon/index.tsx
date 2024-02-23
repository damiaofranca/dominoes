import { SVGProps } from "react";

const ArrowUpIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		width="42px"
		height="42px"
		{...props}
	>
		<path d="M21 38.5a17.5 17.5 0 1 1 0-34.999A17.5 17.5 0 0 1 21 38.5Zm.354-25.896a.5.5 0 0 0-.708 0l-7.542 7.542a.5.5 0 0 0 .353.854H17a.5.5 0 0 1 .5.5v6a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 .5-.5v-6a.5.5 0 0 1 .5-.5h3.543a.5.5 0 0 0 .354-.854l-7.543-7.542Z" />
	</svg>
);
export default ArrowUpIcon;
