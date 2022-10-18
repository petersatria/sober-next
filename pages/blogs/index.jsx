import Blog from '../../components/Blog/Blog';
import axios from 'axios';
import styles from '../../styles/Blog.module.css';
import { useState } from 'react';
import BlogPopular from '../../components/Blog/BlogPopular';
import Page from "../../components/Page";

const BlogList = (props) => {
    const [tags, setTags] = useState('');
    const blogs = props?.blogs;

    // const allTags = () => {
    // 	blogs.map((blg) => {
    // 		return blg.tag.map((b) => {
    // 			return b
    // 		})

    // 	})
    // }

    // allTags()
    // console.log('assss', allTags())

    const category = (blogs) => {
        const allCat = blogs.map((blog) => blog.category);
        const newCat = new Set(allCat);
        return [...newCat];
    };

    const counDate = () => {
        const counDate = {};
        const date = blogs.map((blog) => new Date(blog.timestamp));

        const monthNames = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];

        const d = date.map((d) => {
            return `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
        });

        d.map(function (x) {
            counDate[x] = (counDate[x] || 0) + 1;
        });
        // console.log(countCat)

        return Object.entries(counDate).map(([key, value], i) => {
            return (
                <div key={key} className="d-flex justify-content-between">
                    <p className={styles.catKeyFont}>{key}</p>
                    <p className={styles.smallPopular}>{value}</p>
                </div>
            );
        });
    };

    console.log(counDate());

    const counCategory = () => {
        const countCat = {};
        const allCat = blogs.map((blog) => blog.category);
        allCat.map(function (x) {
            countCat[x] = (countCat[x] || 0) + 1;
        });

        return Object.entries(countCat).map(([key, value], i) => {
            return (
                <div key={key} className="d-flex justify-content-between">
                    <p className={styles.catKeyFont}>{key}</p>
                    <p className={styles.smallPopular}>{value}</p>
                </div>
            );
        });
    };

    return (
        <Page title={'All Blogs'} description={'All Blogs'}>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-8">
                        {blogs &&
                            blogs.map((blog) => (
                                <div key={Math.random().toString() + blog._id}>
                                    <Blog blog={blog} />
                                    <div className={styles.borderBottom}></div>
                                </div>
                            ))}
                    </div>
                    <div className="col-12 col-lg-4 ps-5 my-5 d-none d-lg-block ">
                        <div className="mb-5">
                            <h2 className={styles.sidebarTitle}>Popular Post</h2>
                            {blogs &&
                                blogs
                                    .slice(0, 3)
                                    .map((blog) => (
                                        <BlogPopular key={blog._id} blog={blog} />
                                    ))}
                        </div>
                        <div className={styles.borderBottom}></div>
                        <div className="my-5">
                            <h2 className={styles.sidebarTitle}>Categories</h2>
                            <div className="mt-4">{counCategory(blogs)}</div>
                        </div>
                        <div className={styles.borderBottom}></div>
                        <div className="my-5">
                            <h2 className={styles.sidebarTitle}>Archives</h2>
                            <div className="mt-4">{counDate(blogs)}</div>
                        </div>
                        <div className={styles.borderBottom}></div>
                        <div className="my-5">
                            <h2 className={styles.sidebarTitle}>Browse Tags</h2>
                            {/* <div className="row d-flex flex-row justify-content-center text-center"> */}
                            <div className="row text-center mt-4">
                                {blogs &&
                                    blogs.map((blog) => {
                                        return (
                                            <div
                                                key={blog.tag}
                                                className={`col mx-1 my-1 ${styles.tag}`}
                                            >
                                                {blog.tag[1]}
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    );
};

export default BlogList;

export async function getServerSideProps(context) {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_URL}api/blog/articles`);

    return {
        props: {
            blogs: data.result,
        }, // will be passed to the page component as props
    };
}
