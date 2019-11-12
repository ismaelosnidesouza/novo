<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Funcionario extends Model
{
    protected $primaryKey = 'cd_funcionario';
    protected $fillable = ['nm_departamento', 'sexo', 'salario', 'dt_nascimento', 'cd_departamento'];

    public function departamento()
    {
        return $this->belongsTo(Departamento::class);
    }
}
