-- Buildera Admin Panel — MySQL 8 Schema
-- Run: node scripts/db-migrate.mjs

CREATE TABLE IF NOT EXISTS users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(200) NOT NULL DEFAULT 'CONTENT_EDITOR',
  must_change_password TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sessions (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED NOT NULL,
  token VARCHAR(512) NOT NULL,
  expires_at DATETIME NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_token (token(255))
);

CREATE TABLE IF NOT EXISTS categories (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS media_files (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  original_name VARCHAR(255) NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  size_bytes BIGINT NOT NULL,
  url VARCHAR(500) NOT NULL,
  alt_text VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) NOT NULL UNIQUE,
  excerpt TEXT,
  content LONGTEXT,
  author_id INT UNSIGNED,
  category_id INT UNSIGNED,
  cover_image VARCHAR(500),
  cover_image_alt VARCHAR(500),
  is_featured TINYINT(1) NOT NULL DEFAULT 0,
  status ENUM('DRAFT','SUBMITTED','PUBLISHED') NOT NULL DEFAULT 'DRAFT',
  published_at DATETIME,
  scheduled_at DATETIME,
  meta_title VARCHAR(255),
  meta_description TEXT,
  service_type VARCHAR(100),
  industry VARCHAR(100),
  view_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS case_studies (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) NOT NULL UNIQUE,
  client_name VARCHAR(255),
  industry VARCHAR(100),
  service_category VARCHAR(100),
  cover_image VARCHAR(500),
  cover_image_alt VARCHAR(500),
  challenge LONGTEXT,
  solution LONGTEXT,
  outcome LONGTEXT,
  result_stats JSON,
  is_featured TINYINT(1) NOT NULL DEFAULT 0,
  status ENUM('DRAFT','PUBLISHED') NOT NULL DEFAULT 'DRAFT',
  published_at DATETIME,
  meta_title VARCHAR(255),
  meta_description TEXT,
  view_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS lead_magnets (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) NOT NULL UNIQUE,
  excerpt TEXT,
  content LONGTEXT,
  pdf_url VARCHAR(500),
  cta_text VARCHAR(255),
  thank_you_url VARCHAR(500),
  read_time_minutes SMALLINT,
  cover_image VARCHAR(500),
  cover_image_alt VARCHAR(500),
  resource_type VARCHAR(50) NOT NULL DEFAULT 'article',
  category VARCHAR(100),
  status ENUM('DRAFT','PUBLISHED') NOT NULL DEFAULT 'DRAFT',
  published_at DATETIME,
  meta_title VARCHAR(255),
  meta_description TEXT,
  download_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS testimonials (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  person_name VARCHAR(255) NOT NULL,
  person_title VARCHAR(255),
  company VARCHAR(255),
  quote TEXT NOT NULL,
  rating TINYINT NOT NULL DEFAULT 5,
  industry VARCHAR(100),
  service_category VARCHAR(100),
  logo_url VARCHAR(500),
  visible TINYINT(1) NOT NULL DEFAULT 1,
  featured TINYINT(1) NOT NULL DEFAULT 0,
  show_on_pages JSON,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS leads (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(255),
  role VARCHAR(255),
  source ENUM('CONTACT_FORM','ASSESSMENT_FORM','BOOKING_FORM','BLOG_SIDEBAR','BLOG_INLINE_50','BLOG_INLINE_100','CASE_STUDY','LEAD_MAGNET','POPUP','NEWSLETTER','NUDGE','MANUAL','FEEDBACK') NOT NULL DEFAULT 'CONTACT_FORM',
  status ENUM('NEW','CONTACTED','MEETING_SCHEDULED','CONVERTED','CLOSED','LOST','JUNK') NOT NULL DEFAULT 'NEW',
  notes TEXT,
  admin_notes TEXT,
  metadata JSON,
  ip_address VARCHAR(45),
  follow_up_date DATE,
  lead_score TINYINT,
  is_read TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status (status),
  INDEX idx_source (source),
  INDEX idx_created (created_at)
);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255),
  source VARCHAR(100),
  status ENUM('ACTIVE','UNSUBSCRIBED') NOT NULL DEFAULT 'ACTIVE',
  subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  unsubscribed_at TIMESTAMP NULL
);

CREATE TABLE IF NOT EXISTS marketing_elements (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type ENUM('POPUP','ANNOUNCEMENT_BAR','NUDGE','BANNER_AD','MINI_CTA','MINI_LEAD_CAPTURE_FORM') NOT NULL,
  content JSON NOT NULL,
  enabled TINYINT(1) NOT NULL DEFAULT 0,
  start_date DATETIME,
  end_date DATETIME,
  target_pattern VARCHAR(255),
  delay_ms INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS site_settings (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `key` VARCHAR(100) NOT NULL UNIQUE,
  value TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS analytics (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  page_path VARCHAR(500) NOT NULL,
  event_type ENUM('PAGE_VIEW','DOWNLOAD','FORM_SUBMIT') NOT NULL DEFAULT 'PAGE_VIEW',
  session_id VARCHAR(100),
  user_agent TEXT,
  referrer VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_page_path (page_path(255)),
  INDEX idx_created (created_at)
);

CREATE TABLE IF NOT EXISTS seo_meta (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  page_path VARCHAR(500) NOT NULL UNIQUE,
  meta_title VARCHAR(255),
  meta_description TEXT,
  og_title VARCHAR(255),
  og_description TEXT,
  og_image VARCHAR(500),
  canonical_url VARCHAR(500),
  noindex TINYINT(1) NOT NULL DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS redirects (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  from_path VARCHAR(500) NOT NULL,
  to_path VARCHAR(500) NOT NULL,
  redirect_type ENUM('301','302') NOT NULL DEFAULT '301',
  active TINYINT(1) NOT NULL DEFAULT 1,
  hit_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS client_logos (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  industry VARCHAR(100),
  logo_url VARCHAR(500) NOT NULL,
  visible TINYINT(1) NOT NULL DEFAULT 1,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS admin_scripts (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  location ENUM('HEAD','BODY_START','BODY_END') NOT NULL DEFAULT 'HEAD',
  enabled TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS error_404_log (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  path VARCHAR(500) NOT NULL,
  referrer VARCHAR(500),
  user_agent TEXT,
  first_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  hit_count INT NOT NULL DEFAULT 1,
  UNIQUE KEY uq_path (path(255))
);

CREATE TABLE IF NOT EXISTS nav_items (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  label VARCHAR(255) NOT NULL,
  url VARCHAR(500) NOT NULL,
  `group` ENUM('solutions','work','resources') NOT NULL DEFAULT 'solutions',
  display_order INT NOT NULL DEFAULT 0,
  is_active TINYINT(1) NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS footer_links (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  label VARCHAR(255) NOT NULL,
  url VARCHAR(500) NOT NULL,
  `column` ENUM('services','solutions','company','resources') NOT NULL DEFAULT 'company',
  display_order INT NOT NULL DEFAULT 0,
  is_active TINYINT(1) NOT NULL DEFAULT 1
);

-- Default site settings seed
INSERT IGNORE INTO site_settings (`key`, value) VALUES
('company_name', 'Buildera'),
('company_email', ''),
('company_phone', ''),
('company_address', ''),
('calendly_url', ''),
('whatsapp_number', ''),
('whatsapp_enabled', '0'),
('linkedin_url', ''),
('instagram_url', ''),
('twitter_url', ''),
('footer_tagline', 'Building technology that grows businesses.'),
('stat_projects', '800'),
('stat_clients', '500'),
('stat_years', '10'),
('stat_satisfaction', '98'),
('default_seo_title', 'Buildera — IT Services & Custom Software Development'),
('default_seo_description', 'Buildera builds custom software, Salesforce solutions, DevOps pipelines, and AI agents for growing businesses.'),
('og_image', ''),
('popup_exit_enabled', '0'),
('popup_exit_headline', ''),
('popup_exit_subtext', ''),
('popup_exit_cta', ''),
('popup_idle_enabled', '0'),
('popup_idle_headline', ''),
('popup_idle_subtext', ''),
('nudge_banner_enabled', '0'),
('nudge_banner_text', ''),
('nudge_banner_link', ''),
('nudge_banner_expires_at', ''),
('ga4_measurement_id', ''),
('clarity_project_id', ''),
('facebook_pixel_id', ''),
('linkedin_insight_id', ''),
('google_ads_conversion_id', ''),
('gsc_verification_tag', ''),
('custom_head_scripts', ''),
('custom_body_scripts', ''),
('robots_txt', 'User-agent: *\nAllow: /\n\nSitemap: https://buildera.co/sitemap.xml'),
('cookie_consent_heading', 'We use cookies'),
('cookie_consent_body', 'We use cookies to improve your experience on our site.'),
('cookie_consent_analytics', '1'),
('cookie_consent_marketing', '1'),
('cookie_consent_preferences', '1'),
('site_name', 'Buildera'),
('site_tagline', 'Building technology that grows businesses.'),
('logo_url', ''),
('favicon_url', '');
