"use client"

import { motion } from "motion/react"
import {
  IconBrandReact,
  IconBrandNextjs,
  IconBrandTypescript,
  IconBrandTailwind,
  IconBrandLaravel,
  IconBrandNodejs,
  IconBrandPhp,
  IconBrandPython,
  IconBrandAws,
  IconBrandDocker,
  IconCloud,
  IconDatabase,
  IconApi,
} from "@tabler/icons-react"
import type { Technology } from "@/types/service-page"

const TECH_ICON_MAP: Record<string, React.ReactNode> = {
  react: <IconBrandReact size={16} />,
  nextjs: <IconBrandNextjs size={16} />,
  'next.js': <IconBrandNextjs size={16} />,
  typescript: <IconBrandTypescript size={16} />,
  tailwind: <IconBrandTailwind size={16} />,
  laravel: <IconBrandLaravel size={16} />,
  nodejs: <IconBrandNodejs size={16} />,
  'node.js': <IconBrandNodejs size={16} />,
  php: <IconBrandPhp size={16} />,
  python: <IconBrandPython size={16} />,
  aws: <IconBrandAws size={16} />,
  docker: <IconBrandDocker size={16} />,
  cloud: <IconCloud size={16} />,
  database: <IconDatabase size={16} />,
  api: <IconApi size={16} />,
}

interface Props {
  technologies: Technology[]
  categoryStartDelay?: number
}

export function TechStaggerGrid({ technologies, categoryStartDelay = 0 }: Props) {
  return (
    <div className="flex flex-wrap gap-3">
      {technologies.map((tech, i) => {
        const iconKey = tech.icon?.toLowerCase() ?? tech.name.toLowerCase()
        const icon = TECH_ICON_MAP[iconKey] ?? null
        return (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: categoryStartDelay + i * 0.06,
              duration: 0.3,
              ease: "easeOut",
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border text-sm font-medium bg-background hover:border-[var(--brand-primary)] transition-colors duration-200"
          >
            {icon && <span>{icon}</span>}
            {tech.name}
          </motion.div>
        )
      })}
    </div>
  )
}
