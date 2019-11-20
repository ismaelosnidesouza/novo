<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFuncionariosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('funcionarios', function (Blueprint $table) {
            $table->bigIncrements('cd_funcionario');
            $table->unsignedBigInteger('cd_departamento');
            $table->string('nm_funcionario');
            $table->char('sexo', 1);
            $table->float('salario');
            $table->date('dt_nascimento');
            $table->timestamps();

            $table->foreign('cd_departamento')->references('cd_departamento')->on('departamentos')->onDelete('CASCADE')->onUpdate('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('funcionarios');
    }
}
