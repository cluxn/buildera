export interface Settings {
  company_name: string
  company_email: string
  company_phone: string
  company_address: string
  calendly_url: string
  whatsapp_number: string
  whatsapp_enabled: boolean
  linkedin_url: string
  instagram_url: string
  twitter_url: string
  footer_tagline: string
  stat_projects: string
  stat_clients: string
  stat_years: string
  stat_satisfaction: string
  default_seo_title: string
  default_seo_description: string
  og_image: string
  popup_exit_enabled: boolean
  popup_exit_headline: string
  popup_exit_subtext: string
  popup_exit_cta: string
  popup_idle_enabled: boolean
  popup_idle_headline: string
  popup_idle_subtext: string
  nudge_banner_enabled: boolean
  nudge_banner_text: string
  nudge_banner_link: string
  nudge_banner_expires_at: string
  ga4_measurement_id: string
  clarity_project_id: string
  facebook_pixel_id: string
  linkedin_insight_id: string
  google_ads_conversion_id: string
  gsc_verification_tag: string
  custom_head_scripts: string
  custom_body_scripts: string
}

export const SETTINGS_FALLBACK: Settings = {
  company_name: 'Buildera',
  company_email: '',
  company_phone: '',
  company_address: '',
  calendly_url: '',
  whatsapp_number: '',
  whatsapp_enabled: false,
  linkedin_url: '',
  instagram_url: '',
  twitter_url: '',
  footer_tagline: 'Building technology that grows businesses.',
  stat_projects: '800',
  stat_clients: '500',
  stat_years: '10',
  stat_satisfaction: '98',
  default_seo_title: 'Buildera — IT Services & Custom Software Development',
  default_seo_description: 'Buildera builds custom software, Salesforce solutions, DevOps pipelines, and AI agents for growing businesses.',
  og_image: '',
  popup_exit_enabled: false,
  popup_exit_headline: '',
  popup_exit_subtext: '',
  popup_exit_cta: '',
  popup_idle_enabled: false,
  popup_idle_headline: '',
  popup_idle_subtext: '',
  nudge_banner_enabled: false,
  nudge_banner_text: '',
  nudge_banner_link: '',
  nudge_banner_expires_at: '',
  ga4_measurement_id: '',
  clarity_project_id: '',
  facebook_pixel_id: '',
  linkedin_insight_id: '',
  google_ads_conversion_id: '',
  gsc_verification_tag: '',
  custom_head_scripts: '',
  custom_body_scripts: '',
}
