import { Link } from "next/link"
import styles from './PageNotFound.module.css'

const PageNotFound = () => {
	return (
		<div className={`container my-5 ${styles.content}`}>
			<div className="row d-flex text-center align-items-center">
				<h1 className={styles.h1Tittle}>404</h1>
				<h2 className={styles.h2Tittle}>OOPS! NOTHING WAS FOUND</h2>
				<p className={styles.pTittle}>WE ARE SORRY, BUT THE PAGE YOU REQUESTED WAS NOT FOUND</p>
				{/* <Link href="/" className={styles.backHome}>Back to Home</Link> */}
			</div>
		</div>
	)
}

export default PageNotFound
