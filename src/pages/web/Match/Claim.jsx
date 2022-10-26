import { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/system';
import { useSnackbar } from 'notistack';

import { Web3Context } from "@store/providers/Web3Provider";
import { WrapperContext } from "@store/providers/Wrapper";
import { claimMatchTokens } from "@services/match.service";
import { initClaimedMatches } from "@store/slices/match.slice";
import { MatchModes } from "@utils/enums";

const columns = [
    {
        field: 'id', headerName: 'ID', width: 60,
        valueFormatter: ({ id }) => id,
        valueGetter: ({ row }) => row._id
    },
    {
        field: 'mode', headerName: 'Match Mode', width: 120,
        renderCell: params => MatchModes[params.value].Title
    },
    { field: 'finishedTime', headerName: 'Match Time', width: 200 },
    { field: 'claimableToken', headerName: 'Claimable Token', width: 170 }
];

const StyledDataGrid = styled(DataGrid)({
    '& .MuiDataGrid-columnHeaders': {
        backgroundColor: '#fff'
    },
    '& .MuiDataGrid-row': {
        backgroundColor: '#fff'
    },
    '& .MuiDataGrid-row:hover': {
        backgroundColor: '#fffe',
        cursor: 'pointer'
    },
    '& .Mui-selected': {
        backgroundColor: '#fffc !important'
    },
    '& .MuiDataGrid-footerContainer': {
        backgroundColor: '#fff'
    }
});

const Claim = () => {
    const { account, connectWallet } = useContext(Web3Context);
    const { getMatchList } = useContext(WrapperContext);
    const [selectedIDs, setSelectedIDs] = useState([]);
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const match = useSelector(state => state.match);

    const handleSelectRows = (selectionModel) => {
        setSelectedIDs(selectionModel);
    }

    const handleClaimToken = async () => {
        let connectedWallet;
        if (!account.length)
            connectedWallet = await connectWallet();
        else connectedWallet = account;
        console.log("connectedWallet: ", connectedWallet);

        let earning = 0;
        const selectedRowDataIDs = match.list.filter((row, index) => selectedIDs.includes(index + 1)).map(row => {
            earning += row.claimableToken;
            return row._id;
        });
        
        if (!earning) {
            enqueueSnackbar("No claimable tokens!", { variant: 'warning' });

            return;
        }

        try {
            enqueueSnackbar(`Your claim request is successfully sent!`, { variant: 'success' });
            const response = await claimMatchTokens({ matchIDs: selectedRowDataIDs, connectedWallet });
            if (!response.success)
                throw new Error('Failed!');
            enqueueSnackbar(`You earned ${ response.earnedToken } LOE tokens successfully!`, { variant: 'success' });
            dispatch(initClaimedMatches({ matchIDs: selectedRowDataIDs }));
        } catch (err) {
            console.log(err);
            if (err?.status == 406)
                enqueueSnackbar(err.data.message, { variant: 'error' });
            else enqueueSnackbar("Error occured!", { variant: 'error' });
        }
    }

    useEffect(() => {
        (async () => {
            await getMatchList();
        })();
    }, []);

    const matchList = match.list.map((data, index) => ({ ...data, id: index + 1 }));

    return (
        <section className="d-flex flex-column mx-auto p-mx-width align-items-center py-5">
            <StyledDataGrid
                autoHeight
                rows={matchList}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
                sx={{
                    width: '100%'
                }}
                onSelectionModelChange={handleSelectRows}
            />

            <button className="btn btn-warning text-white btn-lg cus-btn-warning w-50 mt-4" onClick={ handleClaimToken }>
                Claim Tokens
            </button>
        </section>
    )
}

export default Claim;