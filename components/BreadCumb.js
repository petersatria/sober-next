import Link from 'next/link'

const BreadCumb = (props) => {


	const { linkTo, linkPrev, linkRef } = props
	console.log('LINK', linkRef)

	return (
		<div className="wrapper-header">
			<div className="breadcumb-header">
				<Link href="/">Home</Link>
				<p className="bi bi-chevron-right"></p>
				{linkPrev && <><Link href={linkRef}>{linkPrev}</Link><p className="bi bi-chevron-right"></p></>}
				<p className="breadcumb-p">{linkTo}</p>
			</div>
		</div>
	)
}

export default BreadCumb