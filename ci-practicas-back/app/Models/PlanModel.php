<?php

namespace App\Models;

use CodeIgniter\Model;

class PlanModel extends Model
{
    protected $table      = 'plan';
    protected $primaryKey = 'idPlan';
    protected $allowedFields = ['CodigoPlan','CodigoCarrera','Fecha','Estado'];
}
?>