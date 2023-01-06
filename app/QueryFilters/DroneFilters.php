<?php

namespace App\QueryFilters;

use Cerbero\QueryFilters\QueryFilters;

/**
 * Filter records based on query parameters.
 *
 */
class DroneFilters extends QueryFilters
{
    /**
     * Filter records based on the query parameter "project"
     * 
     * @param mixed $int
     * @return void
     */
    public function project($int)
    {
        $this->query->where('project_id', $int);
    }
}
