<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Departamento extends Model
{
    protected $primaryKey = 'cd_departamento';
    protected $fillable = ['nm_departamento'];
}
