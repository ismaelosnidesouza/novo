<?php

namespace App\Http\Controllers;
use App\Departamento;
use Illuminate\Http\Request;

class DepartamentoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Departamento::get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        return Departamento::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        if(!$departamento = Departamento::find($id))
            return response()->json(['error' => 'Departamento informado não encontrado'], 404);

        return $departamento;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        if(!$departamento = Departamento::find($id))
            return response()->json(['error' => 'Departamento informado não encontrado'], 404);

        $departamento->update($request->only('nm_departamento'));

        return $departamento;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if(!$departamento = Departamento::find($id))
            return response()->json(['error' => 'Departamento informado não encontrado'], 404);

        $departamento->delete();
    }
}
