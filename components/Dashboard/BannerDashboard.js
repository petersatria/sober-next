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
    PdfExport,
} from '@syncfusion/ej2-react-grids';
import { useEffect } from 'react';
import { useState } from 'react';

const host =
    process.env.NODE_ENV === 'development'
        ? process.env.DEV_URL
        : process.env.REACT_APP_URL;

function BannerDashboard({ banners }) {
    // JWT Token
    const userToken = token();

    // State
    const [data, setData] = useState(banners);

    // ReFetching initial data
    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`${host}api/banners/all`);

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
                        url: `${host}api/banner/delete/${item._id}`,
                        method: 'DELETE',
                        headers: {
                            Authorization: `Bearer ${userToken}`,
                        },
                    });
                } catch (err) {
                    console.log(err);
                }
            });

        // update
        if (requestType === 'save') {
            try {
                const res = await axios({
                    url: `${host}api/blog/articles/update/${data._id}`,
                    method: 'PATCH',
                    data,
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                });
                console.log(res.data);
            } catch (err) {
                console.log(err);
            }
        }
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
    // const tagsTemplate = ({ tag }) => {
    //     return (
    //         <ul className="tw-space-y-2">
    //             {tag.map((tag, i) => (
    //                 <li key={i}>
    //                     <span>{`${i + 1}. ${tag}`}</span>
    //                 </li>
    //             ))}
    //         </ul>
    //     );
    // };

    // Timestamp Template
    // const timestampTemplate = ({ timestamp }) => {
    //     const formatedDate = new Date(timestamp).toLocaleDateString('id-ID', {
    //         year: 'numeric',
    //         month: 'long',
    //         day: 'numeric',
    //     });
    //     return <p>{formatedDate}</p>;
    // };

    // Content Template
    const contentTemplate = ({ content }) => {
        return <div dangerouslySetInnerHTML={{ __html: content }}></div>;
    };

    return (
        <div>
            <h2 className="tw-text-center tw-text-4xl tw-uppercase">Banners</h2>

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
                    allowPdfExport
                    actionComplete={gridActionHandler}
                    contextMenuItems={[
                        'PdfExport',
                        'ExcelExport',
                        'Copy',
                        'Edit',
                        'Delete',
                    ]}
                    textWrapSettings={{ wrapMode: 'Content' }}
                    pageSettings={{ pageSizes: true, pageSize: 10 }}
                    selectionSettings={{ type: 'Multiple' }}
                    filterSettings={{ type: 'Excel' }}
                    editSettings={{ allowDeleting: true, allowEditing: true }}
                    toolbar={['Delete', 'Edit', 'Update', 'Cancel', 'Search']}
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
                            PdfExport,
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
                        <ColumnDirective width="250" field="active" headerText="active" />

                        {/* Category */}
                        {/* <ColumnDirective
                            width="150"
                            field="category"
                            headerText="Category"
                        /> */}

                        {/* Content */}
                        {/* <ColumnDirective
                            width="1500"
                            field="content"
                            headerText="Content"
                            template={contentTemplate}
                        /> */}

                        {/* Tags */}
                        {/* <ColumnDirective
                            width="200"
                            field="tags"
                            headerText="Tags"
                            template={tagsTemplate}
                        /> */}

                        {/* Timestamp */}
                        {/* <ColumnDirective
                            width="180"
                            field="timestamp"
                            headerText="Timestamp"
                            template={timestampTemplate}
                        /> */}

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

export default BannerDashboard;
