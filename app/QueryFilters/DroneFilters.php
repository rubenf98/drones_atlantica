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

    public function search($string)
    {
        $this->query->where(function ($q) use ($string) {
            $q->where('serial_number', 'like', '%' . $string . '%')
                ->orWhere('designation', 'like', '%' . $string . '%')
                ->orWhere('propulsion_type', 'like', '%' . $string . '%')
                ->orWhereHas('droneType', function ($query) use ($string) {
                    $query->where('name', 'like', '%' . $string . '%');
                });
        });
        // $this->query->where('serial_number', 'like', '%' . $string . '%')
        //     ->orWhere('designation', 'like', '%' . $string . '%')
        //     ->orWhere('propulsion_type', 'like', '%' . $string . '%')
        //     ->orWhereHas('droneType', function ($query) use ($string) {
        //         $query->where('name', 'like', '%' . $string . '%');
        //     });
    }
}
