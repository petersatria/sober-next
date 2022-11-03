import axios from 'axios';
import {
    GridComponent,
    ColumnsDirective,
    ColumnDirective,
    Inject,
    Resize,
    Sort,
    Page,
    Search,
    Toolbar,
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

function UserDashboard({ users }) {
    const [data, setData] = useState(users);

    // ReFetching initial data
    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`${host}api/user`);

            const data = res.data.data;
            setData(data);
        };

        getData();
    }, []);

    // Template
    const birthdateTemplate = ({ birthdate }) => {
        const formatedBirthdate = new Date(birthdate).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        return formatedBirthdate;
    };

    return (
        <div>
            <h2 className="tw-text-center tw-text-4xl tw-uppercase">Users</h2>

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
                    contextMenuItems={['PdfExport', 'ExcelExport', 'Copy']}
                    textWrapSettings={{ wrapMode: 'Content' }}
                    pageSettings={{ pageSizes: true, pageSize: 10 }}
                    filterSettings={{ type: 'Excel' }}
                    toolbar={['Search']}
                >
                    <Inject
                        services={[
                            Resize,
                            Page,
                            Sort,
                            Search,
                            Filter,
                            ContextMenu,
                            ExcelExport,
                            PdfExport,
                            Toolbar,
                        ]}
                    />
                    <ColumnsDirective>
                        {/* ID */}
                        <ColumnDirective
                            width="150"
                            field="_id"
                            headerText="Id"
                            isPrimaryKey
                        />

                        {/* Name */}
                        <ColumnDirective width="200" field="name" headerText="Name" />

                        {/* Birthdate */}
                        <ColumnDirective
                            width="200"
                            field="birthdate"
                            headerText="Birthdate"
                            template={birthdateTemplate}
                        />

                        {/* Username */}
                        <ColumnDirective
                            width="200"
                            field="username"
                            headerText="Username"
                        />

                        {/* Email */}
                        <ColumnDirective width="200" field="email" headerText="Email" />

                        {/* Role */}
                        <ColumnDirective width="200" field="role" headerText="Role" />
                    </ColumnsDirective>
                </GridComponent>
            </div>
        </div>
    );
}

export default UserDashboard;
