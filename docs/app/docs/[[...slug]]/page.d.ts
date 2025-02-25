export default function Page(props: {
	params: Promise<{
		slug?: string[];
	}>;
}): Promise<import('react').JSX.Element>;
export declare function generateStaticParams(): Promise<any>;
export declare function generateMetadata(props: {
	params: Promise<{
		slug?: string[];
	}>;
}): Promise<{
	title: any;
	description: any;
}>;
