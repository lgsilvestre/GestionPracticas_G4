<?php

namespace App\Models;

use CodeIgniter\Model;

class DocumentoModel extends Model
{
    protected $table      = 'documento';
    protected $primaryKey = 'id_documento';
    protected $allowedFields = ['nombre','requerido','etapa','link'];

    public function getDocumentos(){
        $query = $this->db->query("Select * from documento");
        $result = $query->getResult();
        return $result;
    }

    public function getDocumento(){
        $query = $this->db->query("Select * from documento");
        $result = $query->getResult();
        return $result;
    }

}
?>