<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserAddress extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'label',
        'name',
        'phone',
        'address',
        'province',
        'city',
        'subdistrict',
        'postal_code',
        'province_id',
        'city_id',
        'subdistrict_id',
        'is_default',
    ];

    protected $casts = [
        'is_default' => 'boolean',
        'province_id' => 'integer',
        'city_id' => 'integer',
        'subdistrict_id' => 'integer',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function setAsDefault(): void
    {
        // Set all other addresses as non-default
        $this->user->addresses()->where('id', '!=', $this->id)->update(['is_default' => false]);

        // Set this address as default
        $this->update(['is_default' => true]);
    }

    public function getFullAddressAttribute(): string
    {
        return implode(', ', array_filter([
            $this->address,
            $this->subdistrict,
            $this->city,
            $this->province,
            $this->postal_code,
        ]));
    }
}
