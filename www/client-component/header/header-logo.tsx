/* eslint-disable max-len */
type HeaderLogoPropsType = {
    className?: string;
};

export function HeaderLogo(props: HeaderLogoPropsType): JSX.Element {
    const {className} = props;

    return (
        <svg
            className={className}
            height="612px"
            version="1.1"
            viewBox="30.6 90 550.561 612"
            width="550.561px"
            x="0px"
            xmlns="http://www.w3.org/2000/svg"
            y="0px"
        >
            <path
                d="M483.025,303.244L483.025,303.244c-9.682-27.731-35.62-47.334-66.101-47.334h-0.119h-56.061V90l-23.548,3.347
		c-53.43,7.65-95.027,34.784-123.714,80.445c-20.679,32.991-30.242,69.448-34.664,96.581c-30.72,23.667-57.495,56.299-79.608,96.94
		c-18.647,34.306-34.066,74.588-45.9,119.65C33.349,563.104,30.72,626.217,30.6,628.847V702h41.238v-71.719
		c0.478-10.639,13.507-242.888,138.059-331.46l7.292-5.14l1.195-8.845c6.335-46.02,27.731-121.922,101.123-145.23v157.662h97.299
		h0.119c12.432,0,23.069,8.009,26.895,19.125v0.239c16.495,48.53,44.705,109.371,88.812,137.939l-13.268,49.725
		c-9.323,35.023-40.88,60.483-78.293,60.483h-2.51h0.119c-36.936-1.076-75.424,3.705-114.392,14.344l-15.181,4.184V702h41.238
		v-87.139c23.668-5.856,50.801-9.203,78.652-9.203c2.988,0,5.856,0,8.845,0.119h-0.478h3.347c56.538,0,104.111-38.25,118.216-90.246
		l0.239-0.837l21.994-82.716l-16.376-7.052C534.305,411.897,505.139,368.627,483.025,303.244L483.025,303.244z"
            />
        </svg>
    );
}
