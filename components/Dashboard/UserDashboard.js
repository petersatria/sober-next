import axios from 'axios';
import { token } from '../../moduleComponents/tokenAuthorization';
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
    Edit,
} from '@syncfusion/ej2-react-grids';
import { useEffect } from 'react';
import { useState } from 'react';

const host =
    process.env.NODE_ENV === 'development'
        ? process.env.DEV_URL
        : process.env.REACT_APP_URL;

function UserDashboard({ users }) {
    // JWT Token
    const userToken = token();

    // State
    const [data, setData] = useState(users);

    // ReFetching initial data
    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`${host}api/user`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });

            const data = res.data.data;
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
                        url: `${host}api/user/${item._id}`,
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
                    allowResizing
                    allowSorting
                    allowFiltering
                    allowTextWrap
                    allowPaging
                    allowExcelExport
                    dataSource={data}
                    actionComplete={gridActionHandler}
                    editSettings={{ allowDeleting: true }}
                    selectionSettings={{ type: 'Multiple' }}
                    contextMenuItems={['ExcelExport', 'Copy']}
                    textWrapSettings={{ wrapMode: 'Content' }}
                    pageSettings={{ pageSizes: true, pageSize: 10 }}
                    filterSettings={{ type: 'Excel' }}
                    toolbar={['Delete', 'Search']}
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
                            Toolbar,
                            Edit,
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
