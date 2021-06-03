<?php

namespace App\Models;

use CodeIgniter\Model;

class DocGenModel extends Model
{
    protected $table      = 'carrera';
    protected $primaryKey = 'id_carrera';
    protected $allowedFields = ['nombre','extension'];
}
?>