import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/material';


interface ITableContainerProps {
    columns: GridColDef[],
    rows: any[]
}

export default function TableContainer({ columns, rows }: ITableContainerProps) {
    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                // checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
}