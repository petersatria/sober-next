import Head from './Head'
const Page = ({ children, ...props }) => {
	return (
		<>
			<Head {...props} />
			<main>
				{children}
			</main>
		</>
	)
}

export default Page;
