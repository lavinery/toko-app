<?php

namespace App\Policies;

use App\Models\{User, Order};

class OrderPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->isAdmin();
    }

    public function view(User $user, Order $order): bool
    {
        return $user->id === $order->user_id || $user->isAdmin();
    }

    public function update(User $user, Order $order): bool
    {
        return $user->isAdmin();
    }

    public function cancel(User $user, Order $order): bool
    {
        return ($user->id === $order->user_id && $order->canBeCancelled()) || $user->isAdmin();
    }
}
