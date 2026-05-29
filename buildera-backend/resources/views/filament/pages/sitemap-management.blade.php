<x-filament-panels::page>
    <x-filament::section>
        <x-slot name="heading">Sitemap Status</x-slot>

        <div class="space-y-4">
            <div class="text-sm text-gray-600 dark:text-gray-400">
                <span class="font-medium">Last generated:</span>
                {{ $this->lastGeneratedAt }}
            </div>

            <div class="text-sm text-gray-600 dark:text-gray-400">
                <span class="font-medium">Sitemap URL:</span>
                <a href="{{ $this->sitemapUrl }}" target="_blank" class="text-primary-600 underline hover:text-primary-500 ml-1">
                    {{ $this->sitemapUrl }}
                </a>
            </div>

            <div class="pt-2">
                <x-filament::button wire:click="regenerate" wire:loading.attr="disabled">
                    <span wire:loading.remove wire:target="regenerate">Regenerate Sitemap</span>
                    <span wire:loading wire:target="regenerate">Triggering…</span>
                </x-filament::button>
            </div>
        </div>
    </x-filament::section>

    <x-filament-actions::modals />
</x-filament-panels::page>
