<?php

use App\Http\Controllers\Api\BlogPostController;
use App\Http\Controllers\Api\CaseStudyController;
use App\Http\Controllers\Api\FooterLinkController;
use App\Http\Controllers\Api\GuideController;
use App\Http\Controllers\Api\HealthCheckController;
use App\Http\Controllers\Api\NavItemController;
use App\Http\Controllers\Api\RedirectController;
use App\Http\Controllers\Api\SearchController;
use App\Http\Controllers\Api\SeoMetaController;
use App\Http\Controllers\Api\SettingsController;
use App\Http\Controllers\Api\TestimonialController;
use Illuminate\Support\Facades\Route;

// Health check — no auth, no throttle
Route::get('/health', [HealthCheckController::class, 'check']);

// Public read-only content endpoints — no auth, consumed by Next.js at build time
Route::get('/settings', [SettingsController::class, 'index']);
Route::get('/nav-items', [NavItemController::class, 'index']);
Route::get('/footer-links', [FooterLinkController::class, 'index']);
Route::get('/redirects', [RedirectController::class, 'index']);
Route::get('/testimonials', [TestimonialController::class, 'index']);
Route::get('/seo/{type}/{slug}', [SeoMetaController::class, 'show']);
Route::get('/search', [SearchController::class, 'index']);

// Blog posts
Route::get('/blog-posts', [BlogPostController::class, 'index']);
Route::get('/blog-posts/{slug}', [BlogPostController::class, 'show']);

// Case studies
Route::get('/case-studies', [CaseStudyController::class, 'index']);
Route::get('/case-studies/{slug}', [CaseStudyController::class, 'show']);

// Guides
Route::get('/guides', [GuideController::class, 'index']);
Route::get('/guides/{slug}', [GuideController::class, 'show']);
