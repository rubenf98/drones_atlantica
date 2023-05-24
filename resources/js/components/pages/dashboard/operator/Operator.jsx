import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import OperatorTableContainer from './OperatorTableContainer'
import { fetchOperators } from '../../../../redux/operator/actions';
import InoperationalOperatorTableContainer from './InoperationalOperatorTableContainer';

function Operator({ fetchOperators }) {
    useEffect(() => {
        fetchOperators();
    }, [])


    const handlePageChange = (paginate) => {
        fetchOperators({ page: paginate.current });
    }

    return (
        <div>
            <OperatorTableContainer handlePageChange={handlePageChange} />
            <InoperationalOperatorTableContainer />
        </div>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOperators: (filters) => dispatch(fetchOperators(filters)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Operator)