<?php

namespace App\Models;

use CodeIgniter\Model;

class DocGenModel extends Model
{
    protected $table      = 'Docs_General';
    protected $primaryKey = 'idDocs';
    protected $allowedFields = ['nombre','estado','estado'];
}
?>