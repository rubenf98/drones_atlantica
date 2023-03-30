<?php

namespace App\QueryFilters;

use Cerbero\QueryFilters\QueryFilters;

/**
 * Filter records based on query parameters.
 *
 */
class FlightReportFilters extends QueryFilters
{
    public function from($date)
    {
        $this->query->where('date', '>', $date);
    }

    public function to($date)
    {
        $this->query->where('date', '<', $date);
    }
}
