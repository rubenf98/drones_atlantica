import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import UserTableContainer from './ManufacturerTableContainer'
import { fetchManufacturers } from '../../../../redux/manufacturer/actions';

function Manufacturer({ fetchManufacturers }) {
    useEffect(() => {
        fetchManufacturers();
    }, [])


    const handlePageChange = (paginate) => {
        fetchManufacturers({ page: paginate.current });
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
        fetchManufacturers: (filters) => dispatch(fetchManufacturers(filters)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Manufacturer)