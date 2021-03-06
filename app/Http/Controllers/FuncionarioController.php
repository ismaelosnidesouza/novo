<?php

namespace App\Http\Controllers;

use App\Funcionario;
use App\Departamento;
use Illuminate\Http\Request;

class FuncionarioController extends Controller
{

    public function index($id)
    {
        if(!$departamento = Departamento::with('funcionarios')->find($id))
            return response()->json(['error' => 'Departamento informado não encontrado'], 404);

        return $departamento;
    }

    public function store(Request $request, $id)
    {
        if(!$departamento = Departamento::find($id))
            return response()->json(['error' => 'Departamento informado não encontrado'], 404);

        return $departamento->funcionarios()->create($request->all());
    }

    public function show($dep_id, $func_id)
    {
        $departamento = Departamento::with(['funcionarios' => function ($query) use ($func_id) {
            $query->where('cd_funcionario', $func_id);
        }])->find($dep_id);

        return $departamento;
    }

    public function update(Request $request, $dep_id, $func_id)
    {
        if(!$departamento = Departamento::find($dep_id))
            return response()->json(['error' => 'Departamento informado não encontrado'], 404);

        if(!$funcionario = $departamento->funcionarios()->find($func_id))
            return response()->json(['error' => 'Funcionario informado não encontrado'], 404);

        $funcionario->update($request->only('nm_funcionario', 'sexo', 'salario', 'dt_nascimento', 'cd_departamento'));

        return $funcionario;
    }

    public function destroy($dep_id, $func_id)
    {
        if(!$departamento = Departamento::find($dep_id))
            return response()->json(['error' => 'Departamento informado não encontrado'], 404);

        if(!$funcionario = $departamento->funcionarios()->find($func_id))
            return response()->json(['error' => 'Funcionario informado não encontrado'], 404);

        $funcionario->delete();
    }
}
