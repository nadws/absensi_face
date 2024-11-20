<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->search;
        $paginate = $request->paginate ?? 10;

        $users = User::where('name', 'like', '%' . $search . '%')->orWhere('email', 'like', '%' . $search . '%')->orWhere('role', 'like', '%' . $search . '%')->orderBy('id', 'desc')->paginate($paginate);


        return Inertia::render('User/index', [
            'users' => $users,
            'filters' => [
                'search' => $search,
                'paginate' => $paginate
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('User/create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8',
            'password_confirmation' => 'required|same:password'
        ]);

        User::create($request->all());
        return redirect()->route('users');
    }
    public function edit(User $user)
    {

        return Inertia::render('User/edit', [
            'user' => $user
        ]);
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'password' => 'nullable|min:8',
            'password_confirmation' => 'nullable|same:password'
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
            'password' => $request->password ? bcrypt($request->password) : $user->password,
        ]);
        return redirect()->route('users');
    }
}
