# Business Requirements Document (BRD)

## Project: Braswell Kenneth Azu Junior — Personal Portfolio Website

**Version:** 1.0.0
**Author:** Braswell Kenneth Azu Junior
**Website:** [braswelljr.engineer](https://braswelljr.engineer)
**Last Updated:** 2026-06-06

---

## 1. Executive Summary

This document defines the business requirements for the personal portfolio and professional brand website of **Braswell Kenneth Azu Junior** — a Software Engineer, Web Designer, and UX/UI Designer based in Ghana. The website serves as the primary digital presence for professional networking, job opportunities, client engagements, and open-source community visibility.

---

## 2. Business Objectives

| # | Objective | Priority |
|---|-----------|----------|
| BO-01 | Establish a strong, memorable online identity for Braswell Jr. as a full-stack software engineer | High |
| BO-02 | Showcase professional experience, skills, and work history to potential employers and clients | High |
| BO-03 | Present an open-source project portfolio that demonstrates technical depth and breadth | High |
| BO-04 | Provide a technical blog platform to share knowledge, tutorials, and engineering insights | Medium |
| BO-05 | Express personal personality and interests (music, creativity, design) to humanize the brand | Medium |
| BO-06 | Enable direct contact and engagement from recruiters, collaborators, and clients | High |
| BO-07 | Serve as a living resume and downloadable CV resource | High |

---

## 3. Target Audience

### 3.1 Primary Audiences

- **Technical Recruiters & HR Teams** — evaluating candidates for software engineering roles
- **Engineering Hiring Managers** — assessing technical depth, project history, and culture fit
- **Potential Clients / Startups** — seeking freelance or contract web/mobile development services
- **Open-Source Community** — developers who want to collaborate or follow Braswell's work

### 3.2 Secondary Audiences

- **Fellow Developers & Designers** — who discover the site via blog posts or social sharing
- **Academic Institutions / Organizations** — referencing portfolio for speaking engagements or partnerships
- **General Public** — curious visitors discovering the site via search engines or social media

---

## 4. Business Context

Braswell Kenneth Azu Junior graduated with a B.Sc in Computer Science and Engineering from the **University of Mines and Technology, Ghana** (2018–2022). Since then, he has built a career spanning internships, national service, freelancing, and full-time roles across companies in Ghana and internationally. His key differentiators include:

- **Full-stack breadth** across React, Next.js, Go, Flutter, Laravel, and Node.js ecosystems
- **Animation and design sensibility** — deep expertise in Framer Motion, GSAP, and TailwindCSS
- **Cross-functional collaboration** across design, backend, mobile, and DevOps teams
- **Open-source contributions** and active GitHub presence
- **Diverse industry exposure** — EdTech, FinTech, Web3, Ride-sharing, Real Estate, E-commerce

The portfolio website must reflect this depth and make it immediately legible to any visitor within seconds of landing on the page.

---

## 5. Value Proposition

> **"A highly animated, visually compelling, and accessible portfolio that communicates Braswell Jr.'s engineering excellence and creative vision — in one seamless digital experience."**

The site differentiates itself from typical developer portfolios by:

1. **High-quality animation** — purposeful motion design using Framer Motion spring physics, not decoration
2. **Dual-identity design** — balances engineer credibility with designer personality
3. **Performance-first** — built on Next.js App Router with SSR/SSG for fast load times globally
4. **Accessible by default** — WCAG 2.1 AA compliant, keyboard navigable, screen reader friendly
5. **Integrated content ecosystem** — blog, Spotify listening activity, and GitHub contributions in one place

---

## 6. Key Performance Indicators (KPIs)

| KPI | Target |
|-----|--------|
| Lighthouse Performance Score | ≥ 90 |
| Lighthouse Accessibility Score | ≥ 95 |
| Lighthouse SEO Score | ≥ 90 |
| Time to First Contentful Paint (FCP) | < 1.5s |
| Time to Interactive (TTI) | < 3.0s |
| Resume download click-through rate | Tracked via Vercel Analytics |
| Contact email / WhatsApp click-through | Tracked via Vercel Analytics |
| Blog post average read time | ≥ 3 minutes |

---

## 7. Constraints

- **Budget:** Personal project — zero budget; deployed on Vercel free tier
- **Team:** Solo developer / designer (Braswell Jr.)
- **Timeline:** Iterative; launched and continuously improved
- **Technology:** Must use the existing Next.js + TailwindCSS + TypeScript stack
- **Hosting:** Vercel (vercel.json already configured)
- **Domain:** braswelljr.engineer

---

## 8. Assumptions

- Visitors primarily access the site via modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile traffic constitutes ≥ 50% of visits given the target audience of tech professionals
- SEO is important for discoverability but organic search is secondary to direct/referral traffic
- The resume PDF (`/documents/Braswell-Kenneth-Azu-Junior-Resume.pdf`) will be kept current

---

## 9. Stakeholders

| Stakeholder | Role | Interest |
|-------------|------|----------|
| Braswell Kenneth Azu Junior | Owner / Developer / Designer | Full ownership; career advancement |
| Potential Employers | External | Evaluating engineering qualifications |
| Clients / Startups | External | Evaluating freelance/contract capabilities |
| GitHub Community | External | Open-source project discovery |
| Blog Readers | External | Technical knowledge consumption |
