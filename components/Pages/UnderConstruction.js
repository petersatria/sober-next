import styles from './UnderConstruction.module.css'
import backgroundImg from '../../public/images/pict-from-unsplash.jpg'

const UnderConstruction = () => {
	return (
		<div className="container-fluid">
			<div className="row d-flex text-center align-items-center">
				<div className="col p-0">
					<img className={`img-fluid `} src={backgroundImg} alt="pic" />
				</div>
				<div className="col p-5">
					<h1 className={`${styles.h1Tittle}`}>Coming soon!</h1>
					<p className={`${styles.pTittle}`}>
						We're working on our website.
						<br />
						Check us out on social media or subscribe to our emails while you wait.
						<br />
						Stay tuned for some exciting updates.
					</p>

				</div>
			</div>
		</div>
	)
}

export default UnderConstruction