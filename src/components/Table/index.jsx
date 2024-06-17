import Table from "@mui/material/Table";
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSkleton from "../TableSkeleton";

function basicTable ({
    headColumns = [],
    bodyColumns = [],
    loader = false
}) {
    return (
        <TableContainer
            className={`border border-borderColor rounded-[6px] overflow-x-visible`}
            sx={{
                width: '100%',
                transition: '.3s ease',
                maxHeight: 'calc(100vh - 238px)',
                '&::-webkit-scrollbar': {
                    width: 15,
                },
                    '&::-webkit-scrollbar-track': {
                    backgroundColor: '#e0eeff',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#7F8487',
                    borderRadius: '6px',
                    transition: 'inherit',
                    cursor: 'pointer',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: '#413F42',
                },
            }}
        >
        <Table
            stickyHeader
            aria-label="sticky table"
            classes={{
            root: {
                border: 'none',
            },
            }}
            sx={{
                tableLayout: 'auto',
            }}
        >
            <TableHead className="table-head w-full bg-white">
            <TableRow>
                {headColumns?.map((item, colIndex) => (
                    <TableCell rowspan={item.rowspan ? item.rowspan : 2} width={item.width ? item.width : 10} key={colIndex}>
                        {item.title}
                    </TableCell>
                ))}
            </TableRow>
            </TableHead>
            <TableBody className="table-body">
                {loader ? (
                    <TableSkleton />
                ) : (
                    <>
                        {bodyColumns?.length ? bodyColumns.map((item, rowIndex) => (
                            <TableRow key={rowIndex}>
                                {headColumns?.map((element, colIndex) => (
                                    <TableCell key={colIndex}>
                                        <div>
                                            {element.render ? (
                                                Array.isArray(element.key) ? (
                                                    element.render(element.key.map((data) => item[data]))
                                                ) : (
                                                    element.render(item[element.key])
                                                )
                                                ) : (
                                                item[element.key]
                                            )}
                                        </div>
                                    </TableCell>
                                ))}
                            </TableRow>
                        )) : ''}
                    </>
                )}
            </TableBody>
        </Table>
      </TableContainer>
    )
}

export default basicTable