import Image from "next/future/image"
import Link from "next/link"
import styles from '../../styles/Blog.module.css'

const BlogRelated = (props) => {
	const { blog } = props

	return (
		<article className="row my-5 ">
			<div className="card h-100 border-0">
				<Link href={`/blogs/${blog._id}`} >
					<Image quality={30} width={360} height={174} placeholder="blur" blurDataURL={"base64"} className={`${styles.blogImgRelated} ${styles.cursorPointer}`} src={blog.image} alt="" />
				</Link>
				<div className="my-3 text-center card-body">
					<Link href={`/blogs/${blog._id}`} >
						<h2 className={`${styles.smallTitle} ${styles.smallTitleRelated} ${styles.cursorPointer}  `}>{blog.title}</h2>
					</Link>
				</div>
			</div>
		</article>
	)
}

export default BlogRelated