import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import UserTableContainer from './OperatorTableContainer'
import { fetchOperators } from '../../../../redux/operator/actions';

function Operator({ fetchOperators }) {
    useEffect(() => {
        fetchOperators();
    }, [])


    const handlePageChange = (paginate) => {
        fetchOperators({ page: paginate.current });
    }

    return (
        <div>
            <UserTableContainer handlePageChange={handlePageChange} />
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