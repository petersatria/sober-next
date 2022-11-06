import Image from "next/future/image"
import Link from "next/link"
import styles from '../../styles/Blog.module.css'

const BlogPopular = (props) => {
	const { blog } = props
	const date = new Date(blog.timestamp)
	const dateConvert = () => {
		return <p>{`${date.getDate()}.${date.getMonth()} ${date.getFullYear()}`}</p>
	}

	return (
		<article className="row my-3">
			<div className="col-5 col-xl-4 d-flex flex-row justify-content-start">
				<Link href={`/blogs/${blog._id}`} >
					<img quality={30} width={500} height={500} placeholder="blur" blurDataURL={"base64"} className={`${styles.blogPopular} ${styles.cursorPointer}`} src={blog.image} alt="" />
				</Link>
			</div>
			<div className="col-7 col-xl-8 py-3 d-flex flex-column justify-content-between ">
				<Link href={`/blogs/${blog._id}`} >
					<h2 className={`${styles.title} ${styles.titlePopular} ${styles.cursorPointer}`}>{blog.title}</h2>
				</Link>
				<div className={`${styles.smallTitle} ${styles.smallPopular}`}>{dateConvert(date)}</div>

			</div>
		</article>
	)
}

export default BlogPopular