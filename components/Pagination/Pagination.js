import { useRouter } from 'next/router'
import styles from './Pagination.module.css'

const Pagination = ({ props, category }) => {
	const router = useRouter()

	// console.log('props filter', filter)

	const currPage = router?.query?.page || 1
	const maxPage = props.maxPage
	const prevOne = parseInt(currPage) > 1 ? parseInt(currPage) - 1 : null
	const nextOne = parseInt(currPage) < maxPage ? parseInt(currPage) + 1 : null

	const currCategory = router.query.category ? category : undefined

	const removeQueryParam = (param) => {
		const { pathname, query } = router;
		const params = new URLSearchParams(query?.category);
		params.delete(param);
		router.replace(
			{ pathname, query: params.toString() },
			undefined,
			{ shallow: true }
		);
	};

	const onClickHandler = (page) => {
		console.log('router push', page)

		router.push({
			pathname: router.pathname,
			query: { page, category },
		});
	};

	return (
		<nav className={`${styles.nav}`}>
			<ul className={`${styles.wrapperPage}`}>
				{/* <li className="page-item"><a className="page-link" onClick={() => { onClickNext(1, 2) }} >First</a></li> */}
				<li className={`${parseInt(currPage) === 1 ? `${styles.disabled}` : null}`}>
					<button className="" onClick={() => { onClickHandler(parseInt(currPage) - 1) }} disabled={parseInt(currPage) === 1 ? true : false}>
						Previous
					</button>
				</li>
				{parseInt(currPage) > 2 &&
					<li className="">
						<a className={styles.dotted} onClick={() => { onClickHandler(parseInt(currPage) - 1) }}>...</a>
					</li>}
				{parseInt(currPage) > 1 &&
					<li className="">
						<a className={styles.pageNumber} onClick={() => { onClickHandler(prevOne) }} >{prevOne}</a>
					</li>}
				<li className={` ${currPage === currPage ? `${styles.active}` : null}`}>
					<a className={` ${styles.pageNumber}`} onClick={() => { onClickHandler(currPage, 2) }} >{currPage}</a>
				</li>
				{parseInt(currPage) < maxPage &&
					<li className="">
						<a className={styles.pageNumber} onClick={() => { onClickHandler(nextOne) }} >{nextOne}</a>
					</li>}
				{parseInt(currPage) < maxPage - 1 &&
					<li className="">
						<a className={styles.dotted} onClick={() => { onClickHandler(parseInt(currPage) + 1) }}>...</a>
					</li>}
				<li className={` ${parseInt(currPage) === maxPage ? `${styles.disabled}` : null}`}>
					<button className="" onClick={() => { onClickHandler(parseInt(currPage) + 1) }} disabled={parseInt(currPage) === maxPage ? true : false}>Next</button>
				</li>
				{/* <li className="page-item"><a className="page-link" onClick={() => { onClickNext(maxPage, 2) }} >Last</a></li> */}
			</ul>
		</nav>
	)
}

export default Pagination