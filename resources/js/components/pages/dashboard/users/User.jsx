import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import UserTableContainer from './UserTableContainer'
import { fetchUsers } from '../../../../redux/user/actions';

function User({ fetchUsers }) {
    useEffect(() => {
        fetchUsers();
    }, [])


    const handlePageChange = (paginate) => {
        fetchUsers({ page: paginate.current });
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
        fetchUsers: (filters) => dispatch(fetchUsers(filters)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(User)