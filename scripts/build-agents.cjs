#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

const repoRoot = path.join(__dirname, '..');
const skillDir = path.join(repoRoot, 'skills', 'oriyn');
const skillFile = path.join(skillDir, 'SKILL.md');
const rulesDir = path.join(skillDir, 'rules');
const outputFile = path.join(skillDir, 'AGENTS.md');

function parseFrontmatter(markdown) {
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) return { frontmatter: {}, body: markdown };

  const frontmatter = {};
  for (const line of match[1].split('\n')) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    frontmatter[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
  }

  return { frontmatter, body: markdown.slice(match[0].length) };
}

function extractRuleLinks(markdown) {
  const links = [];
  const regex = /\[([^\]]+)\]\(rules\/([^)]+\.md)\)/g;
  let match;

  while ((match = regex.exec(markdown))) {
    links.push({ title: match[1], file: match[2] });
  }

  return links;
}

function anchor(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function readRule(rule) {
  const fullPath = path.join(rulesDir, rule.file);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Missing rule referenced from SKILL.md: ${rule.file}`);
  }

  const raw = fs.readFileSync(fullPath, 'utf8');
  const parsed = parseFrontmatter(raw);
  return {
    ...rule,
    frontmatter: parsed.frontmatter,
    body: stripTopHeading(parsed.body.trim()),
  };
}

function stripTopHeading(markdown) {
  return markdown.replace(/^# .+\n\n/, '').trim();
}

function build() {
  const rawSkill = fs.readFileSync(skillFile, 'utf8');
  const { frontmatter, body } = parseFrontmatter(rawSkill);
  const rules = extractRuleLinks(body).map(readRule);

  let output = '---\n';
  output += `name: ${frontmatter.name}\n`;
  output += `description: ${frontmatter.description}\n`;
  output += '---\n\n';
  output += '# Oriyn\n\n';
  output += `${frontmatter.description}\n\n`;
  output += '## Table of Contents\n\n';
  output += '- [Core Instructions](#core-instructions)\n';
  for (const rule of rules) {
    const title = rule.frontmatter.title || rule.title;
    output += `- [${title}](#${anchor(title)})\n`;
  }
  output += '\n## Core Instructions\n\n';
  output += `${stripTopHeading(body.trim())}\n\n`;

  for (const rule of rules) {
    const title = rule.frontmatter.title || rule.title;
    output += `## ${title}\n\n`;
    if (rule.frontmatter.impact) {
      output += `Impact: ${rule.frontmatter.impact}\n\n`;
    }
    if (rule.frontmatter.description) {
      output += `${rule.frontmatter.description}\n\n`;
    }
    output += `${rule.body}\n\n`;
  }

  output += '---\n\n';
  output += '_Generated from SKILL.md and rules/*.md. To update, run `npm run build:agents`._\n';

  fs.writeFileSync(outputFile, output, 'utf8');
  console.log(`Generated ${path.relative(repoRoot, outputFile)} with ${rules.length} rules.`);
}

build();
