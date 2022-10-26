import { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/system';
import _ from 'lodash';
import { useSnackbar } from 'notistack';

import { WrapperContext } from "@store/providers/Wrapper";
import { AIDifficulties } from "@utils/enums";
import { updateGameAttributes } from '@services/admin/attribute.service';
import { updateAttributes } from "@store/slices/attribute.slice";
import { copy } from "@utils/format";

const StyledChip = styled(Chip)({
    '& .MuiSvgIcon-root': {
        color: 'rgba(255, 255, 255, 0.86)'
    },
    '&:hover .MuiSvgIcon-root': {
        color: 'rgba(255, 255, 255, 0.6)'
    }
});

const Welcome = () => {
    const { getAttributes } = useContext(WrapperContext);
    const attribute = useSelector(state => state.attribute);
    const [winTokenValues, setWinTokenValues] = useState(null);
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();

    const handleUpdateSubvalue = path => e => {
        if (e.target.value < 0) return;

        const currentValues = copy(winTokenValues);
        _.set(currentValues, path, Number(e.target.value));
        setWinTokenValues(currentValues);
    }

    const handleAddMultipliersIndex = () => {
        const currentValues = copy(winTokenValues);
        currentValues.single.playerCount.push(0);
        setWinTokenValues(currentValues);
    }

    const handleDeleteMultipliersIndex = index => () => {
        const currentValues = copy(winTokenValues);
        currentValues.single.playerCount.splice(index, 1);
        setWinTokenValues(currentValues);
    }

    const handleUpdateValues = () => {
        console.log(winTokenValues);
        updateGameAttributes({ attribute: { winToken: winTokenValues } })
            .then(response => {
                response.success && enqueueSnackbar("Updated values successfully", { variant: 'success' });
                dispatch(updateAttributes({ winToken: winTokenValues }));
            })
            .catch(err => {
                console.log(err);
                if (err?.status == 406 || err?.status == 500)
                    enqueueSnackbar(err.data.message, { variant: 'error' });
                else  enqueueSnackbar("Error occured!", { variant: 'error' });
            });
    }

    useEffect(() => {
        (async () => {
            await getAttributes();
        })();
    }, []);

    useEffect(() => {
        if (attribute.winToken)
            setWinTokenValues(attribute.winToken);
    }, [attribute.winToken]);

    return (
        <section className="d-flex flex-column mx-auto p-mx-width align-items-center py-5 text-white fs-5">
            <div className="container-fluid">
                {
                    winTokenValues &&
                    <>
                        <div className="row">
                            <div className="col-md-3">
                                <label>AI Difficulty</label>
                            </div>
                            <div className="col-md-9">
                                {
                                    Object.keys(winTokenValues?.single.aiDifficulty).map((field, index) =>                                        
                                        <div className="row mb-2" key={ index }>
                                            <div className="col-2">
                                                <label>{ field == 'base' ? "Base" : AIDifficulties[field].Title }</label>
                                            </div>
                                            <div className="col-10">
                                                <input type="number" step="0.1"
                                                    value={ winTokenValues.single.aiDifficulty[field] }
                                                    onChange={ handleUpdateSubvalue(`single.aiDifficulty.${ field }`) } />
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>

                        <div className="row mt-5">
                            <div className="col-md-3">
                                <label>Player Count</label>
                            </div>
                            <div className="col-md-9">
                                {
                                    winTokenValues.single.playerCount.map((multiplier, index) =>
                                        <div className="row mb-2" key={ index }>
                                            <div className="col-2">
                                                <label>{ index + 2 } </label>
                                            </div>
                                            <div className="col-10 d-flex align-items-center">
                                                <input type="number" step="0.1"
                                                    value={ multiplier }
                                                    onChange={ handleUpdateSubvalue(`single.playerCount[${ index }]`) }
                                                />
                                                <StyledChip label="" onDelete={ handleDeleteMultipliersIndex(index) }></StyledChip>
                                            </div>
                                        </div>
                                    )
                                }
                                <div className="row mb-2">
                                    <button className="btn btn-warning text-white btn-lg cus-btn-warning mt-3 px-5 w-50"
                                        style={{ background: 'transparent' }}
                                        onClick={ handleAddMultipliersIndex }>
                                            Add Count Index
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="row mt-5">
                            <div className="col-md-3">
                                <label>Is LastmanStanding Option</label>
                            </div>
                            <div className="col-md-9">
                                <div className="row mb-2">
                                    <div className="col-2">
                                        <label>Base </label>
                                    </div>
                                    <div className="col-10">
                                        <input type="number" step="0.1"
                                            value={ winTokenValues.single.lastmanStanding.base }
                                            onChange={ handleUpdateSubvalue('single.lastmanStanding.base') }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row mt-5 justify-content-center">
                            <button className="btn btn-warning text-white btn-lg cus-btn-warning mt-3 px-5 w-25" onClick={ handleUpdateValues }>
                                Update Values
                            </button>
                        </div>
                    </>
                }
            </div>
        </section>
    )
}

export default Welcome;