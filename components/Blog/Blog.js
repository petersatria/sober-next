import Image from "next/future/image"
import Link from "next/link"
import styles from '../../styles/Blog.module.css'

const Blog = (props) => {
	const { blog } = props
	const date = new Date(blog.timestamp)
	const dateConvert = () => {
		return <p>{`${date.getDate()}.${date.getMonth()} ${date.getFullYear()}`}</p>
	}

	return (
		<article className="row my-5">
			<div className="col-6 d-flex flex-row justify-content-center">
				<Link href={`/blogs/${blog._id}`} >
					<img quality={30} width={500} height={500} placeholder="blur" blurDataURL={"base64"} className={`${styles.blogImg} ${styles.cursorPointer}`} src={blog.image} alt="" />
				</Link>
			</div>
			<div className="col-6 py-3 px-4 d-flex flex-column justify-content-between ">
				<div className="row d-flex flex-row">
					<div className={`col-3 pe-0 ${styles.smallTitle}`}>{dateConvert(date)}</div>
					<div className={`col-3 pe-0 ${styles.smallTitle}`}>{blog.category}</div>
				</div>
				<div className="my-2">
					<Link href={`/blogs/${blog._id}`} >
						<h2 className={`${styles.title} ${styles.cursorPointer}`}>{blog.title}</h2>
					</Link>
				</div>
				<div>
					<p className={`${styles.contentSum}`}>{blog.content}</p>
				</div>
				<div>
					<Link href={`/blogs/${blog._id}`} >
						<a className={`${styles.more} ${styles.cursorPointer}`}>Read More</a>
					</Link>
				</div>
			</div>
		</article>
	)
}

export default Blog