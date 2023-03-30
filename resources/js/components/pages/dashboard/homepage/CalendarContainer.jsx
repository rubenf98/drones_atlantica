import { Calendar, Badge } from 'antd'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fetchFlightReportSelector } from '../../../../redux/flightReport/actions';
const dateFormat = "YYYY-MM-DD";
import dayjs from 'dayjs';

function CalendarContainer(props) {
    const { data, loading } = props;
    const [dates, setDates] = useState([undefined, undefined]);

    useEffect(() => {
        var filters = [...dates];

        if (!dates[0] || !dates[1]) {
            filters[0] = dayjs().startOf('month').startOf('day').subtract(5, 'day').format(dateFormat);
            filters[1] = dayjs().endOf('month').endOf('day').add(10, 'day').format(dateFormat);
        }

        props.fetchFlightReportSelector({ from: filters[0], to: filters[1] });
    }, [dates])


    const dateCellRender = (value) => {
        var listData = [];

        data.map((report) => {
            if (dayjs(report.date).isSame(value, 'day')) {
                listData.push({
                    type: report.crashReport ? 'warning' : 'success',
                    content: report.serial_number,
                });
            }
        })

        return (
            <div>
                {listData.map((item) => (
                    <p key={item.content}>
                        <Badge status={item.type} text={item.content} />
                    </p>
                ))}
            </div>
        );
    };

    const handlePanelChange = (date) => {
        var startDate = dayjs(date).startOf('month').startOf('day').subtract(5, 'day').format(dateFormat);
        var endDate = dayjs(date).endOf('month').endOf('day').add(10, 'day').format(dateFormat);
        setDates([startDate, endDate]);
    }

    return (
        <div>
            <h2>Calendário de relatórios</h2>
            <Calendar onPanelChange={handlePanelChange} dateCellRender={dateCellRender} />

        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        loading: state.flightReport.loading,
        data: state.flightReport.selector,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchFlightReportSelector: (filters) => dispatch(fetchFlightReportSelector(filters)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarContainer)