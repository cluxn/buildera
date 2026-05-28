"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  siReact, siNextdotjs, siTypescript, siTailwindcss, siVuedotjs, siAngular,
  siVite, siShadcnui, siLaravel, siNodedotjs, siPhp, siExpress, siFastify,
  siNestjs, siWordpress, siStrapi, siSanity, siContentful, siPayloadcms,
  siGhost, siWoocommerce, siShopify, siStripe, siRazorpay, siPaypal,
  siGooglecloud, siDigitalocean, siHostinger, siCloudflare, siGithubactions,
  siJenkins, siCircleci, siGitlab, siBitbucket, siArgo, siDocker,
  siKubernetes, siTerraform, siAnsible, siHelm, siNginx, siGrafana,
  siPrometheus, siDatadog, siNewrelic, siSentry, siUptimekuma, siClaude,
  siMeta, siOllama, siGooglegemini, siMistralai, siAnthropic, siLangchain,
  siCrewai, siHaystack, siN8n, siZapier, siMake, siHubspot, siMailchimp,
  siAirtable, siDialogflow, siMysql, siPostgresql, siMongodb, siRedis,
  siElasticsearch, siSqlite, siFlutter, siExpo, siSwift, siKotlin,
  siCapacitor, siPython, siDjango, siFastapi, siGo, siGraphql, siTrpc,
  siSwagger,
} from "simple-icons"

type SiIcon = { path: string; hex: string }

const ICON_MAP: Record<string, SiIcon> = {
  "React": siReact,
  "Next.js": siNextdotjs,
  "TypeScript": siTypescript,
  "Tailwind CSS": siTailwindcss,
  "Vue.js": siVuedotjs,
  "Angular": siAngular,
  "Vite": siVite,
  "shadcn/ui": siShadcnui,
  "Laravel": siLaravel,
  "Node.js": siNodedotjs,
  "PHP 8": siPhp,
  "Express.js": siExpress,
  "Fastify": siFastify,
  "Nest.js": siNestjs,
  "WordPress": siWordpress,
  "Strapi": siStrapi,
  "Sanity": siSanity,
  "Contentful": siContentful,
  "Payload CMS": siPayloadcms,
  "Ghost": siGhost,
  "WooCommerce": siWoocommerce,
  "Shopify": siShopify,
  "Stripe": siStripe,
  "Razorpay": siRazorpay,
  "PayPal": siPaypal,
  "Google Cloud": siGooglecloud,
  "DigitalOcean": siDigitalocean,
  "Hostinger VPS": siHostinger,
  "Cloudflare": siCloudflare,
  "GitHub Actions": siGithubactions,
  "Jenkins": siJenkins,
  "CircleCI": siCircleci,
  "GitLab CI": siGitlab,
  "Bitbucket Pipelines": siBitbucket,
  "ArgoCD": siArgo,
  "Docker": siDocker,
  "Kubernetes": siKubernetes,
  "Terraform": siTerraform,
  "Ansible": siAnsible,
  "Helm": siHelm,
  "Nginx": siNginx,
  "Grafana": siGrafana,
  "Prometheus": siPrometheus,
  "Datadog": siDatadog,
  "New Relic": siNewrelic,
  "Sentry": siSentry,
  "Uptime Kuma": siUptimekuma,
  "Claude (Anthropic)": siClaude,
  "Llama 3": siMeta,
  "Ollama": siOllama,
  "Gemini": siGooglegemini,
  "Mistral": siMistralai,
  "LangChain": siLangchain,
  "CrewAI": siCrewai,
  "Haystack": siHaystack,
  "n8n": siN8n,
  "Zapier": siZapier,
  "Make (Integromat)": siMake,
  "HubSpot": siHubspot,
  "Mailchimp": siMailchimp,
  "Airtable": siAirtable,
  "Dialogflow": siDialogflow,
  "MySQL": siMysql,
  "PostgreSQL": siPostgresql,
  "MongoDB": siMongodb,
  "Redis": siRedis,
  "Elasticsearch": siElasticsearch,
  "SQLite": siSqlite,
  "Flutter": siFlutter,
  "Expo": siExpo,
  "Swift (iOS)": siSwift,
  "Kotlin (Android)": siKotlin,
  "Capacitor": siCapacitor,
  "Python": siPython,
  "Django": siDjango,
  "FastAPI": siFastapi,
  "Go": siGo,
  "GraphQL": siGraphql,
  "tRPC": siTrpc,
  "OpenAPI / Swagger": siSwagger,
  "pgvector": siPostgresql,
  "FAISS": siMeta,
  "React Native": siReact,
  "Anthropic SDK": siAnthropic,
}

function TechIcon({ name, color }: { name: string; color: string }) {
  const icon = ICON_MAP[name]
  if (icon) {
    return (
      <svg
        viewBox="0 0 24 24"
        width={16}
        height={16}
        fill={`#${icon.hex}`}
        aria-hidden="true"
        className="shrink-0"
      >
        <path d={icon.path} />
      </svg>
    )
  }
  const letters = name.replace(/[^A-Za-z0-9]/g, "").slice(0, 2).toUpperCase()
  return (
    <span
      className="shrink-0 inline-flex items-center justify-center rounded text-[8px] font-bold leading-none"
      style={{ width: 16, height: 16, backgroundColor: color + "28", color }}
      aria-hidden="true"
    >
      {letters}
    </span>
  )
}

interface Tech { name: string; color: string }
interface SubCategory { id: string; label: string; techs: Tech[] }
interface ServiceCategory { id: string; label: string; subCategories: SubCategory[] }

const TECH_DATA: ServiceCategory[] = [
  {
    id: "website",
    label: "Website Dev",
    subCategories: [
      {
        id: "frontend",
        label: "Frontend",
        techs: [
          { name: "React", color: "#61DAFB" },
          { name: "Next.js", color: "#000000" },
          { name: "TypeScript", color: "#3178C6" },
          { name: "Tailwind CSS", color: "#06B6D4" },
          { name: "Vue.js", color: "#4FC08D" },
          { name: "Angular", color: "#DD0031" },
          { name: "Vite", color: "#646CFF" },
          { name: "shadcn/ui", color: "#18181B" },
        ],
      },
      {
        id: "backend",
        label: "Backend",
        techs: [
          { name: "Laravel", color: "#FF2D20" },
          { name: "Node.js", color: "#339933" },
          { name: "PHP 8", color: "#777BB4" },
          { name: "Express.js", color: "#000000" },
          { name: "Fastify", color: "#000000" },
          { name: "Nest.js", color: "#E0234E" },
        ],
      },
      {
        id: "cms",
        label: "CMS & Headless",
        techs: [
          { name: "WordPress", color: "#21759B" },
          { name: "Strapi", color: "#4945FF" },
          { name: "Sanity", color: "#F36458" },
          { name: "Contentful", color: "#2478CC" },
          { name: "Payload CMS", color: "#1F1F1F" },
          { name: "Ghost", color: "#15171A" },
        ],
      },
      {
        id: "ecommerce",
        label: "E-Commerce",
        techs: [
          { name: "WooCommerce", color: "#96588A" },
          { name: "Shopify", color: "#95BF47" },
          { name: "Magento", color: "#EE672F" },
          { name: "Stripe", color: "#635BFF" },
          { name: "Razorpay", color: "#3395FF" },
          { name: "PayPal", color: "#003087" },
        ],
      },
    ],
  },
  {
    id: "salesforce",
    label: "Salesforce",
    subCategories: [
      {
        id: "core",
        label: "Core Clouds",
        techs: [
          { name: "Sales Cloud", color: "#00A1E0" },
          { name: "Service Cloud", color: "#00A1E0" },
          { name: "Marketing Cloud", color: "#00A1E0" },
          { name: "Commerce Cloud", color: "#00A1E0" },
          { name: "Experience Cloud", color: "#00A1E0" },
          { name: "Analytics Cloud", color: "#00A1E0" },
        ],
      },
      {
        id: "dev",
        label: "Development",
        techs: [
          { name: "Apex", color: "#1798C1" },
          { name: "Lightning Web Components", color: "#00A1E0" },
          { name: "Visualforce", color: "#00A1E0" },
          { name: "SOQL", color: "#1798C1" },
          { name: "Flow Builder", color: "#00A1E0" },
          { name: "Einstein AI", color: "#FF7C2A" },
        ],
      },
      {
        id: "integration",
        label: "Integration",
        techs: [
          { name: "MuleSoft", color: "#00A1DF" },
          { name: "REST API", color: "#6DB33F" },
          { name: "SOAP API", color: "#1798C1" },
          { name: "Salesforce Connect", color: "#00A1E0" },
          { name: "Heroku", color: "#430098" },
          { name: "AppExchange", color: "#00A1E0" },
        ],
      },
      {
        id: "analytics",
        label: "Analytics",
        techs: [
          { name: "Tableau", color: "#E97627" },
          { name: "CRM Analytics", color: "#00A1E0" },
          { name: "Einstein Analytics", color: "#FF7C2A" },
          { name: "Data Cloud", color: "#00A1E0" },
          { name: "Marketing Intelligence", color: "#00A1E0" },
        ],
      },
    ],
  },
  {
    id: "devops",
    label: "DevOps",
    subCategories: [
      {
        id: "cloud",
        label: "Cloud Providers",
        techs: [
          { name: "AWS", color: "#FF9900" },
          { name: "Google Cloud", color: "#4285F4" },
          { name: "Microsoft Azure", color: "#0078D4" },
          { name: "DigitalOcean", color: "#0080FF" },
          { name: "Hostinger VPS", color: "#673DE6" },
          { name: "Cloudflare", color: "#F38020" },
        ],
      },
      {
        id: "cicd",
        label: "CI/CD",
        techs: [
          { name: "GitHub Actions", color: "#2088FF" },
          { name: "Jenkins", color: "#D33833" },
          { name: "CircleCI", color: "#343434" },
          { name: "GitLab CI", color: "#FC6D26" },
          { name: "Bitbucket Pipelines", color: "#0052CC" },
          { name: "ArgoCD", color: "#EF7B4D" },
        ],
      },
      {
        id: "containers",
        label: "Containers & IaC",
        techs: [
          { name: "Docker", color: "#2496ED" },
          { name: "Kubernetes", color: "#326CE5" },
          { name: "Terraform", color: "#7B42BC" },
          { name: "Ansible", color: "#EE0000" },
          { name: "Helm", color: "#0F1689" },
          { name: "Nginx", color: "#009639" },
        ],
      },
      {
        id: "monitoring",
        label: "Monitoring",
        techs: [
          { name: "Grafana", color: "#F46800" },
          { name: "Prometheus", color: "#E6522C" },
          { name: "Datadog", color: "#632CA6" },
          { name: "New Relic", color: "#1CE783" },
          { name: "Sentry", color: "#362D59" },
          { name: "Uptime Kuma", color: "#5CDD8B" },
        ],
      },
    ],
  },
  {
    id: "ai",
    label: "AI & Automation",
    subCategories: [
      {
        id: "models",
        label: "AI Models",
        techs: [
          { name: "OpenAI GPT-4o", color: "#10A37F" },
          { name: "Claude (Anthropic)", color: "#D97757" },
          { name: "Gemini", color: "#4285F4" },
          { name: "Llama 3", color: "#0467DF" },
          { name: "Mistral", color: "#FF7000" },
          { name: "Ollama", color: "#000000" },
        ],
      },
      {
        id: "frameworks",
        label: "AI Frameworks",
        techs: [
          { name: "LangChain", color: "#1C3C3C" },
          { name: "LlamaIndex", color: "#E67E22" },
          { name: "CrewAI", color: "#FF4B4B" },
          { name: "AutoGen", color: "#0078D4" },
          { name: "Haystack", color: "#4CAF50" },
          { name: "Flowise", color: "#7B68EE" },
          { name: "Anthropic SDK", color: "#D97757" },
        ],
      },
      {
        id: "vectordb",
        label: "Vector & RAG",
        techs: [
          { name: "Pinecone", color: "#1C3C3C" },
          { name: "Weaviate", color: "#00C853" },
          { name: "Chroma", color: "#FF6D00" },
          { name: "Qdrant", color: "#DC143C" },
          { name: "pgvector", color: "#336791" },
          { name: "FAISS", color: "#3B5998" },
        ],
      },
      {
        id: "automation",
        label: "Automation",
        techs: [
          { name: "n8n", color: "#EA4B71" },
          { name: "Zapier", color: "#FF4A00" },
          { name: "Make (Integromat)", color: "#6D00CC" },
          { name: "Airtable", color: "#18BFFF" },
          { name: "HubSpot", color: "#FF7A59" },
          { name: "Mailchimp", color: "#FFE01B" },
          { name: "Voiceflow", color: "#5865F2" },
          { name: "Botpress", color: "#1F8DD6" },
          { name: "Dialogflow", color: "#FF6F00" },
        ],
      },
    ],
  },
  {
    id: "software",
    label: "Software Dev",
    subCategories: [
      {
        id: "backend-sw",
        label: "Backend",
        techs: [
          { name: "Laravel", color: "#FF2D20" },
          { name: "Node.js", color: "#339933" },
          { name: "Python", color: "#3776AB" },
          { name: "Django", color: "#092E20" },
          { name: "FastAPI", color: "#009688" },
          { name: "Go", color: "#00ADD8" },
        ],
      },
      {
        id: "database",
        label: "Database",
        techs: [
          { name: "MySQL", color: "#4479A1" },
          { name: "PostgreSQL", color: "#336791" },
          { name: "MongoDB", color: "#47A248" },
          { name: "Redis", color: "#DC382D" },
          { name: "Elasticsearch", color: "#005571" },
          { name: "SQLite", color: "#003B57" },
        ],
      },
      {
        id: "mobile",
        label: "Mobile",
        techs: [
          { name: "React Native", color: "#61DAFB" },
          { name: "Flutter", color: "#54C5F8" },
          { name: "Expo", color: "#000020" },
          { name: "Swift (iOS)", color: "#F05138" },
          { name: "Kotlin (Android)", color: "#7F52FF" },
          { name: "Capacitor", color: "#119EFF" },
        ],
      },
      {
        id: "api",
        label: "APIs & Protocols",
        techs: [
          { name: "REST", color: "#4CAF50" },
          { name: "GraphQL", color: "#E10098" },
          { name: "gRPC", color: "#244C5A" },
          { name: "WebSockets", color: "#F5A623" },
          { name: "tRPC", color: "#398CCB" },
          { name: "OpenAPI / Swagger", color: "#6BA539" },
        ],
      },
    ],
  },
]

export function TechStackSection() {
  const [activeService, setActiveService] = useState(0)
  const [activeSubCat, setActiveSubCat] = useState(0)

  function handleServiceChange(idx: number) {
    setActiveService(idx)
    setActiveSubCat(0)
  }

  const currentService = TECH_DATA[activeService]
  const currentSubCat = currentService.subCategories[activeSubCat]

  return (
    <section className="py-20 bg-white border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-xs font-medium uppercase tracking-widest text-[var(--brand-primary)] mb-3">
            Technology
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Technologies &amp; Platforms We Use
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            We pick the right tool for every job — across all six of our service lines.
          </p>
        </div>

        {/* Service category tabs — centered */}
        <div className="relative mb-8">
          <div className="flex justify-center gap-0 overflow-x-auto scrollbar-hide border-b border-border">
            {TECH_DATA.map((service, idx) => (
              <button
                key={service.id}
                onClick={() => handleServiceChange(idx)}
                className={cn(
                  "relative shrink-0 px-5 py-3 text-sm font-medium transition-colors whitespace-nowrap",
                  activeService === idx
                    ? "text-[var(--brand-primary)]"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {service.label}
                {activeService === idx && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--brand-primary)] rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Sub-category pills — centered */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {currentService.subCategories.map((sub, idx) => (
            <button
              key={sub.id}
              onClick={() => setActiveSubCat(idx)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium border transition-all duration-150",
                activeSubCat === idx
                  ? "bg-[var(--brand-primary)] text-white border-[var(--brand-primary)]"
                  : "bg-white text-foreground border-border hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]"
              )}
            >
              {sub.label}
            </button>
          ))}
        </div>

        {/* Tech pills — centered flex-wrap */}
        <div className="flex flex-wrap justify-center gap-3">
          {currentSubCat.techs.map((tech) => (
            <div
              key={tech.name}
              className="inline-flex items-center gap-2.5 px-4 py-3 rounded-xl border border-border bg-white hover:border-[var(--brand-primary)] hover:shadow-sm transition-all duration-150 group"
            >
              <TechIcon name={tech.name} color={tech.color} />
              <span className="text-xs font-medium text-foreground group-hover:text-[var(--brand-primary)] transition-colors leading-tight whitespace-nowrap">
                {tech.name}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
