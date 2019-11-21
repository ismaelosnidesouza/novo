<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Funcionario extends Model
{
    protected $primaryKey = 'cd_funcionario';
    protected $fillable = ['cd_departamento', 'nm_funcionario', 'sexo', 'salario', 'dt_nascimento'];

    public function departamento()
    {
        return $this->belongsTo('App\Departamento');
    }
}
