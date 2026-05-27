<?php

namespace App\Observers;

use App\Models\AuditLog;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class AuditLogObserver
{
    /**
     * Handle the model "created" event.
     * Wrapped in try/catch — audit log must never crash the main request.
     */
    public function created(Model $model): void
    {
        try {
            AuditLog::create([
                'user_id'        => auth()->id(),
                'auditable_type' => get_class($model),
                'auditable_id'   => $model->getKey(),
                'event'          => 'created',
                'new_values'     => $model->toArray(),
                'old_values'     => null,
                'url'            => request()?->fullUrl(),
                'ip_address'     => request()?->ip(),
                'user_agent'     => request()?->userAgent(),
            ]);
        } catch (\Throwable $e) {
            Log::error('AuditLogObserver::created failed: '.$e->getMessage(), [
                'auditable_type' => get_class($model),
                'auditable_id'   => $model->getKey(),
                'error'          => $e->getMessage(),
            ]);
        }
    }

    /**
     * Handle the model "updated" event.
     * Wrapped in try/catch — audit log must never crash the main request.
     */
    public function updated(Model $model): void
    {
        try {
            AuditLog::create([
                'user_id'        => auth()->id(),
                'auditable_type' => get_class($model),
                'auditable_id'   => $model->getKey(),
                'event'          => 'updated',
                'new_values'     => $model->getChanges(),
                'old_values'     => $model->getOriginal(),
                'url'            => request()?->fullUrl(),
                'ip_address'     => request()?->ip(),
                'user_agent'     => request()?->userAgent(),
            ]);
        } catch (\Throwable $e) {
            Log::error('AuditLogObserver::updated failed: '.$e->getMessage(), [
                'auditable_type' => get_class($model),
                'auditable_id'   => $model->getKey(),
                'error'          => $e->getMessage(),
            ]);
        }
    }
}
