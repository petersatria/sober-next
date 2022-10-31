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

// const userToken =
//     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMzE1YTgwZGI0ZmFjNjJkNjA2NzA5YyIsInVzZXJuYW1lIjoiZGl2YWp1bmkiLCJlbWFpbCI6ImRpdmFqdW5pIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjY3MTAwMTYyLCJleHAiOjE2NjcxODY1NjJ9.QJxOStave2vtUYQ4HLednaGjw6o8E9imb8d8IO_bpfk';

function ProductDashboard({ products }) {
    const [data, setData] = useState(products);
    const userToken = token();

    // ReFetching initial data
    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`${host}api/product`);

            const data = res.data.result.map((item) => {
                item['size-xs'] = item.size.xs || null;
                item['size-s'] = item.size.s || null;
                item['size-m'] = item.size.m || null;
                item['size-l'] = item.size.l || null;
                item['size-xl'] = item.size.xl || null;
                return item;
            });
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
                        url: `${host}api/delete-product/${item._id}`,
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
            // modify size
            data.size.xs = data['size-xs'];
            data.size.s = data['size-s'];
            data.size.m = data['size-m'];
            data.size.l = data['size-l'];
            data.size.xl = data['size-xl'];

            // modify image
            data.images = data.images.split(',');

            // delete per size category
            delete data['size-xs'];
            delete data['size-s'];
            delete data['size-m'];
            delete data['size-l'];
            delete data['size-xl'];

            try {
                const res = await axios({
                    url: `${host}api/edit-data/${data._id}`,
                    method: 'PATCH',
                    data,
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                });
            } catch (err) {}
        }
    };

    // Grid Column Template
    const priceTemplate = ({ price }) => {
        const formatedPrice = price?.toLocaleString('id-ID', {
            currency: 'IDR',
            style: 'currency',
        });
        return <p>{formatedPrice || price}</p>;
    };

    // Image Template
    const imgTemplate = ({ images, name }) => {
        let imagesArr = images;
        if (typeof images === 'string') {
            imagesArr = images.split(',');
        }
        return (
            <div className="tw-flex tw-justify-center tw-gap-4">
                {imagesArr.map((img, i) => (
                    <img
                        key={i}
                        src={img}
                        alt={name}
                        className="tw-h-40 tw-w-40 tw-object-cover"
                    />
                ))}
            </div>
        );
    };

    // Rich Text Editor Template
    const RTETemplate = ({ detail }) => {
        return <div dangerouslySetInnerHTML={{ __html: detail }}></div>;
    };

    return (
        <div>
            <h2 className="tw-text-center tw-text-4xl tw-uppercase">Products</h2>

            <div className="tw-mt-8">
                <GridComponent
                    height="400"
                    dataSource={data}
                    allowResizing
                    allowSorting
                    allowFiltering
                    allowTextWrap
                    allowPaging
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

                        {/* Name */}
                        <ColumnDirective width="200" field="name" headerText="Name" />

                        {/* Detail */}
                        <ColumnDirective
                            width="500"
                            field="detail"
                            headerText="Detail"
                            template={RTETemplate}
                        />

                        {/* Summary */}
                        <ColumnDirective
                            width="250"
                            field="summary"
                            headerText="Summary"
                            template={RTETemplate}
                        />

                        {/* Category */}
                        <ColumnDirective
                            width="150"
                            field="category"
                            headerText="Category"
                        />

                        {/* Recommendation */}
                        <ColumnDirective
                            width="200"
                            field="recommendation"
                            headerText="Recommendation"
                            displayAsCheckBox={true}
                        />

                        {/* Price */}
                        <ColumnDirective
                            width="150"
                            field="price"
                            headerText="Price"
                            template={priceTemplate}
                        />

                        {/* Size */}
                        <ColumnDirective
                            width="150"
                            field="size-xs"
                            headerText="Size XS"
                        />
                        <ColumnDirective width="150" field="size-s" headerText="Size S" />
                        <ColumnDirective width="150" field="size-m" headerText="Size M" />
                        <ColumnDirective width="150" field="size-l" headerText="Size L" />
                        <ColumnDirective
                            width="150"
                            field="size-xl"
                            headerText="Size XL"
                        />

                        {/* Images */}
                        <ColumnDirective
                            field="images"
                            headerText="image"
                            template={imgTemplate}
                            width="500"
                        />
                    </ColumnsDirective>
                </GridComponent>
            </div>
        </div>
    );
}

export default ProductDashboard;
