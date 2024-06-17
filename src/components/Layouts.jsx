import { useState, useMemo, useEffect } from "react";
import BasicTable from "./Table"
import { request } from "../utils/request";
import Header from "./Header";
import EditIcon from '@mui/icons-material/Edit';

function Layouts () {
    const [loader, setLoader] = useState(false);
    const [tableData, setTableData] = useState([])
    const headData = [
        {
            title: '№',
            key: 'ind',
            width: 10
        },
        {
            title: 'Name',
            key: 'name',
            width: 200,
        },
        {
            title: 'Age',
            key: 'age',
            width: 200,
        },
        {
            title: 'Gender',
            key: 'gender',
            width: 200,
        },
        {
            title: 'Phone',
            key: 'phone',
            width: 200,
        },
        {
            title: "Actions",
            key: "id",
            width: 100,
            render: (id) => (
                <a href={`/form/update/${id}`}>
                   <EditIcon />
                </a>
            )
        }
    ]

    const dataSource = useMemo(
        () =>
          tableData?.map((item, index) => {
            item.ind = index + 1
            return item
          }),
        [tableData]
    )
    
    const getData = () => {
        setLoader(true)
        const query = `query getAllusers {
            allUsers {
            name
            age
            gender
            phone
            id
            }
        }`
        request(query)
        .then(res => res.json())
        .then(res => {
            setTableData(res.data.allUsers)
        })
        .finally(() => {
            setLoader(false)
        })
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="wrapper">
            <Header />
            <BasicTable 
                headColumns={headData} 
                bodyColumns={dataSource}
                loader={loader}
            />
        </div>
    )
}

export default Layouts