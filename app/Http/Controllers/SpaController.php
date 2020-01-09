<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SpaController extends Controller
{
    public final function app()
    {
        return view('app');
        // Don't create app.blade.php manually. Vue-CLI 'npm run build' will do it for you.
    }
}
