<?php

namespace App\Models;

use CodeIgniter\Model;

class RevisaModel extends Model
{
    protected $table      = 'revisa';
    protected $primaryKey = 'id_revisa';
    protected $allowedFields = ['fecha', 'detalle', 'refUser', 'refPrac'];
}
?>