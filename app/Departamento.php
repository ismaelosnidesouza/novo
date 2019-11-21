<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Departamento extends Model
{
    protected $primaryKey = 'cd_departamento';
    protected $fillable = ['nm_departamento'];

    public function funcionarios()
    {
        return $this->hasMany('App\Funcionario', 'cd_departamento');
    }

}
