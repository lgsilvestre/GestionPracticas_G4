<?php

namespace App\Models;

use CodeIgniter\Model;

class DocumentoModel extends Model
{
    protected $table      = 'documento';
    protected $primaryKey = 'id_documento';
    protected $allowedFields = ['nombre','requerido','etapa', 'link'];
}
?>