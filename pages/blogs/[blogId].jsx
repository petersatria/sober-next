import { useEffect, useState } from "react";
import Image from "next/future/image";
import styles from "../../styles/Blog.module.css";
import axios from "axios";
import BlogRelated from "../../components/Blog/BlogRelated";
import Link from "next/link";
import Page from "../../components/Page";
import BreadCumb from "../../components/BreadCumb";

const BlogDetail = (props) => {
  const [relatedBlogs, setRelatedBlogs] = useState("");
  const { blog, blogs } = props;
  const date = new Date(blog.timestamp);
  const dateConvert = () => {
    return (
      <p>{`${date.getDate()}.${date.getMonth()} ${date.getFullYear()}`}</p>
    );
  };

  // console.log("tags", tags)

  const shuffled = () => setRelatedBlogs(blogs.sort(() => 0.5 - Math.random()));

  useEffect(() => {
    shuffled();
  }, [blog]);

  const shuffle = () => blogs.sort(() => 0.5 - Math.random());

  console.log(shuffle(blogs));

  return (
    <Page title={blog?.title} description={blog?.title}>
      <div className="container my-5">
        <BreadCumb
          linkTo={blog.title}
          linkPrev={"All Blogs"}
          linkRef={"/blogs/"}
        />
        <div>
          <div className="row d-flex flex-row justify-content-center my-2">
            <div
              className={`col-4 text-end ${styles.smallTitle}`}
              style={{ color: "#bfbfc8" }}
            >
              {dateConvert(date)}
            </div>
            <div className={`col-4 ${styles.smallTitle}`}>{blog.category}</div>
          </div>
          <div className="my-3 text-center">
            <h2 className={`${styles.titleDetail}`}>{blog.title}</h2>
          </div>
          <div>
            <img
              quality={30}
              width={1600}
              height={900}
              placeholder="blur"
              blurDataURL={"base64"}
              className={styles.blogImgDetail}
              src={blog.image}
              alt=""
            />
          </div>
          <div className={`my-3 ${styles.contentWrapper}`}>
            <p className={`${styles.contentDetail}`}>{blog.content}</p>
          </div>
          <div className="my-5 d-flex justify-content-center">
            {blog.tag?.map((t) => {
              return (
                <div key={t} className={`mx-2 ${styles.tag}`}>
                  {t}
                </div>
              );
            })}
          </div>
        </div>
        <div className={`my-5 ${styles.borderBottom}`}></div>
        <div className="row d-flex justify-content-center text-center">
          <div className="col-4">
            {blogs &&
              shuffle(blogs)
                .slice(3, 4)
                .map((blog) => (
                  <Link key={blog._id} href={blog._id}>
                    <p className={`${styles.pagePost} ${styles.cursorPointer}`}>
                      PREVIOUS POST
                    </p>
                  </Link>
                ))}
          </div>
          {/* FIXXXXX */}
          <div className={`col-2 `}>
            <div className={`${styles.borderStand}`}></div>
          </div>
          <div className="col-4">
            {blogs &&
              shuffle(blogs)
                .slice(4, 5)
                .map((blog) => (
                  <Link key={blog._id} href={blog._id}>
                    <p className={`${styles.pagePost} ${styles.cursorPointer}`}>
                      NEXT POST
                    </p>
                  </Link>
                ))}
          </div>
        </div>
        <div className={`my-5 ${styles.borderBottom}`}></div>
        <div>
          <div className="row d-flex flex-row justify-content-center text-center">
            <h2 className={styles.sidebarTitle}>You Might Also Like</h2>
            {relatedBlogs &&
              relatedBlogs.slice(0, 3).map((blog) => (
                <div
                  key={Math.random().toString() + blog._id}
                  className={`col-3`}
                >
                  <BlogRelated blog={blog} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </Page>
  );
};

export default BlogDetail;

export async function getServerSideProps(context) {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}api/blog/articles/${context.params.blogId}`
  );
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}api/blog/articles`
  );

  return {
    props: {
      blog: data.result,
      blogs: res.data.result,
    }, // will be passed to the page component as props
  };
}
