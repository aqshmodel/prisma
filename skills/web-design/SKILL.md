---
name: web-design
description: comprehensive web application design assistant for creating stunning, user-friendly interfaces. use this skill when the user asks for design suggestions, color palettes, ui components, tailwind css classes, or improving visual aesthetics.
---

# Web Design Skill

## Overview
This skill empowers Claude to act as a senior UI/UX designer and frontend engineer. It provides tools and guidelines for creating modern, accessible, and visually appealing web applications, with a focus on React and Tailwind CSS.

## Core Capabilities

1.  **Color System Design**: Generate harmonious color palettes and ensure accessibility (contrast ratios).
2.  **UI Component Library**: Provide ready-to-use, accessible React components styled with Tailwind CSS.
3.  **Visual Refinement**: Suggest improvements for whitespace, typography, and visual hierarchy.
4.  **Tailwind CSSExpertise**: Offer optimized and maintainable utility class combinations.

## Workflow

When a user requests design assistance, follow this process:

1.  **Understand the Vibe**: Identify the desired mood (e.g., "Professional", "Playful", "Minimalist", "Dark Mode").
2.  **Define the Foundation**:
    *   **Colors**: Primary, Secondary, Accent, Background, Text. Use `scripts/color_utils.py` to generate palettes or check contrast.
    *   **Typography**: Font family, scale, and weights.
3.  **Design Components**: use `references/design_system.md` for patterns and `assets/` for templates.
4.  **Refine & Polish**: Check alignment, spacing (whitespace), and responsiveness.

## Resources

### Scripts (`scripts/`)
*   `color_utils.py`: Utilities for generating color shades and checking WCAG contrast ratios. Run this when recommending custom colors.

### References (`references/`)
*   `design_system.md`: Fundamental design principles, Tailwind CSS patterns, and best practices for modern web UI.

### Assets (`assets/`)
*   `components/`: React component templates (Button, Card, Input, etc.).

## Design Principles (Quick Reference)

*   **Whitespace is King**: Give elements room to breathe. Use `p-4`, `p-8`, `gap-4` liberally.
*   **Visual Hierarchy**: Use size (`text-xl`, `text-sm`), weight (`font-bold`, `font-medium`), and color (`text-slate-900`, `text-slate-500`) to guide the eye.
*   **Consistency**: Stick to a defined spacing scale and color palette. Avoid magic numbers.
*   **Feedback**: Interactive elements must have hover/focus states (`hover:bg-blue-600`, `focus:ring-2`).

## Example User Requests & Responses

**User**: "I need a color palette for a medical app."
**Action**: Run `color_utils.py` to generate a 'Trustworthy Blue' or 'Clean Teal' palette with accessible contrast.

**User**: "Make this button look better."
**Action**: Consult `references/design_system.md` for button patterns (shadows, gradients, rounded corners) and suggest Tailwind classes.
