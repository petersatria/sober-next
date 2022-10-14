import Link from 'next/link'

const BreadCumb = ({ linkTo }) => {

	return (
		<div className="wrapper-header">
			<div className="breadcumb-header">
				<Link href="/">Home</Link>
				<p className="bi bi-chevron-right"></p>
				{linkTo.name && <><Link href="/products/">Product List</Link><p className="bi bi-chevron-right"></p></>}
				<p className="breadcumb-p">{linkTo.name || linkTo}</p>
			</div>
		</div>
	)
}

export default BreadCumb