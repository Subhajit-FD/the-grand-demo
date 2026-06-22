"use client"

import { useRef } from "react"
import Link from "next/link"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { SplitText } from "gsap/SplitText"
import { usePathname } from "next/navigation"


gsap.registerPlugin(SplitText)

export default function Navbar({
  links,
}: {
  links: Array<{ title: string; href: string }>
}) {
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([])
  const pathname = usePathname()

  useGSAP(() => {
    const targets = linksRef.current.filter(Boolean)
    if (targets.length === 0) return

    // Create splits
    const splits = targets.map((linkEl) => {
      return new SplitText(linkEl as HTMLElement, {
        type: "words,chars",
      })
    })

    // Flatten all characters to stagger them sequentially
    const allChars = splits.flatMap((split) => split.chars)

    // Stagger animation on load
    gsap.fromTo(
      allChars,
      { yPercent: 110, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.015,
        ease: "power4.out",
      }
    )

    return () => {
      splits.forEach((split) => split.revert())
    }
  })

  return (
    <nav>
      <ul className="flex items-center justify-between gap-6">
        {links.map((link, index) => {
          const isActive = pathname === link.href
          return (
            <li key={index} className="overflow-hidden py-1">
              <Link
                href={link.href}
                ref={(el) => {
                  linksRef.current[index] = el
                }}
                className={`relative block text-sm font-medium tracking-wide transition-colors hover:text-brand ${
                  isActive ? "text-brand" : "text-foreground/80"
                }`}
              >
                {link.title}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
