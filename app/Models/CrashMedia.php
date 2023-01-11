<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CrashMedia extends Model
{
    use HasFactory;
    protected $fillable = ['path', 'crash_report_id', 'file_type'];

    public function crashReport()
    {
        return $this->belongsTo(CrashReport::class);
    }
}
