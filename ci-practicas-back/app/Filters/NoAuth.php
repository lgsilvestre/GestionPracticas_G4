<?php namespace App\Filters;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Filters\FilterInterface;

class NoAuth implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        echo "entró a NoAuth";
        // Do something here
        if(session()->get('isLoggedIn'))
            {
                echo "<script>alert('Usted ya inicio sesion');</script>";
                if($session->get('tipo') == 0){//Superadmin
                //    return redirect()->to('/dashbordAdmin');
                }
                if($session->get('tipo')==1){//Admin
                //    return redirect()->to('/dashbordAdmin');
                }
                if($session->get('tipo')==2){//cliente
                //    return redirect()->to('/dashbordAdmin');
                }
                if($session->get('tipo')==3){//cliente
                //    return redirect()->to('/dashbordAdmin');
                }
                if($session->get('tipo')==4){//cliente
                //    return redirect()->to('/dashbordAlumno');
                }

            }
     /*   else
            {
            return redirect()->to('/');
            }*/
    }

    //--------------------------------------------------------------------

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        // Do something here
    }
}