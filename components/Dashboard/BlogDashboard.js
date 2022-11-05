import axios from 'axios';
import { token } from '../../moduleComponents/tokenAuthorization';
import {
    GridComponent,
    ColumnsDirective,
    ColumnDirective,
    Inject,
    Resize,
    Edit,
    Toolbar,
    Sort,
    Page,
    Search,
    Filter,
    ContextMenu,
    ExcelExport,
} from '@syncfusion/ej2-react-grids';
import { useEffect, useRef } from 'react';
import { useState } from 'react';

const host =
    process.env.NODE_ENV === 'development'
        ? process.env.DEV_URL
        : process.env.REACT_APP_URL;

function BlogDashboard({ blogs }) {
    // JWT Token
    const userToken = token();

    // State
    const [data, setData] = useState(blogs);

    // ReFetching initial data
    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`${host}api/blog/articles`);

            const data = res.data.result;
            setData(data);
        };

        getData();
    }, []);

    // Data Changes
    const gridActionHandler = async ({ requestType, data }) => {
        // delete
        if (requestType === 'delete')
            data.forEach(async (item) => {
                try {
                    await axios({
                        url: `${host}api/blog/articles/delete/${item._id}`,
                        method: 'DELETE',
                        headers: {
                            Authorization: `Bearer ${userToken}`,
                        },
                    });
                } catch (err) {
                    console.log(err);
                }
            });
    };

    // Template
    // Image Template
    const imgTemplate = ({ image, title }) => {
        return (
            <div className="tw-flex tw-justify-center tw-gap-4">
                <img
                    src={image}
                    alt={title}
                    className="tw-h-40 tw-w-40 tw-object-cover"
                />
            </div>
        );
    };

    // Tags Template
    const tagsTemplate = ({ tag }) => {
        const formatedTag = tag.join().split(',');

        return (
            <ul className="tw-space-y-2">
                {formatedTag.map((tag, i) => (
                    <li key={i}>
                        <span>{`${i + 1}. ${tag}`}</span>
                    </li>
                ))}
            </ul>
        );
    };

    // Timestamp Template
    const timestampTemplate = ({ timestamp }) => {
        const formatedDate = new Date(timestamp).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            minute: '2-digit',
            hour: '2-digit',
        });
        return <p>{formatedDate}</p>;
    };

    // Content Template
    const contentTemplate = ({ content }) => {
        return <div dangerouslySetInnerHTML={{ __html: content }}></div>;
    };

    return (
        <div>
            <h2 className="tw-text-center tw-text-4xl tw-uppercase">blogs</h2>

            <div className="tw-mt-8">
                <GridComponent
                    height="400"
                    dataSource={data}
                    allowResizing
                    allowSorting
                    allowFiltering
                    allowPaging
                    allowTextWrap
                    allowExcelExport
                    actionComplete={gridActionHandler}
                    contextMenuItems={['ExcelExport', 'Copy', 'Delete']}
                    textWrapSettings={{ wrapMode: 'Content' }}
                    pageSettings={{ pageSizes: true, pageSize: 10 }}
                    selectionSettings={{ type: 'Multiple' }}
                    filterSettings={{ type: 'Excel' }}
                    editSettings={{ allowDeleting: true }}
                    toolbar={['Delete', 'Search']}
                >
                    <Inject
                        services={[
                            Resize,
                            Edit,
                            Toolbar,
                            Page,
                            Sort,
                            Search,
                            Filter,
                            ContextMenu,
                            ExcelExport,
                        ]}
                    />
                    <ColumnsDirective>
                        {/* Check box */}
                        <ColumnDirective type="checkbox" width="50" />

                        {/* ID */}
                        <ColumnDirective
                            width="150"
                            field="_id"
                            headerText="Id"
                            isPrimaryKey
                        />

                        {/* Title */}
                        <ColumnDirective width="250" field="title" headerText="Title" />

                        {/* Category */}
                        <ColumnDirective
                            width="150"
                            field="category"
                            headerText="Category"
                        />

                        {/* Content */}
                        <ColumnDirective
                            width="1500"
                            field="content"
                            headerText="Content"
                            template={contentTemplate}
                        />

                        {/* Tags */}
                        <ColumnDirective
                            width="200"
                            field="tags"
                            headerText="Tags"
                            template={tagsTemplate}
                        />

                        {/* Timestamp */}
                        <ColumnDirective
                            width="230"
                            field="timestamp"
                            headerText="Timestamp"
                            template={timestampTemplate}
                            editType="datetimepickeredit"
                        />

                        {/* Images */}
                        <ColumnDirective
                            field="image"
                            headerText="image"
                            template={imgTemplate}
                            width="300"
                        />
                    </ColumnsDirective>
                </GridComponent>
            </div>
        </div>
    );
}

export default BlogDashboard;
