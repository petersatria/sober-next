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

function CategoryDashboard({ categories }) {
    // console.log('categories', categories)
    // JWT Token
    const userToken = token();


    // State
    const [data, setData] = useState(categories);

    // ReFetching initial data
    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`${host}category`);

            console.log(res,'asd')

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
                        url: `${host}delete-category/${item._id}`,
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
                console.log(data,'asd')
                const res = await axios({
                    url: `${host}edit-category/${data._id}`,
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

    return (
        <div>
            <h2 className="tw-text-center tw-text-4xl tw-uppercase">Category</h2>

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
                        <ColumnDirective width="250" field="name" headerText="Name" />

                        {/* Category */}
                        <ColumnDirective
                            width="150"
                            field="deleted"
                            headerText="Deleted Status"
                        />
                    </ColumnsDirective>
                </GridComponent>
            </div>
        </div>
    );
}

export default CategoryDashboard;
