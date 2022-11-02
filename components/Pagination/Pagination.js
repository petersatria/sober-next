import { useRouter } from 'next/router'
import styles from './Pagination.module.css'

const Pagination = ({ props }) => {
	const router = useRouter()

	const currPage = router?.query?.page || 1
	const maxPage = props.maxPage
	const prevOne = parseInt(currPage) > 1 ? parseInt(currPage) - 1 : null
	const nextOne = parseInt(currPage) < maxPage ? parseInt(currPage) + 1 : null

	const onClickHandler = (page) => {
		router.push({
			pathname: router.pathname,
			query: { page },
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