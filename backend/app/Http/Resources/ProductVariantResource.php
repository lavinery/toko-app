<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductVariantResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'sku' => $this->sku,
            'price_adjustment' => $this->price_adjustment,
            'final_price' => $this->final_price,
            'stock' => $this->available_stock,
            'in_stock' => $this->available_stock > 0,
            'sort_order' => $this->sort_order,
        ];
    }
}
