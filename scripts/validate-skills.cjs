#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

const repoRoot = path.join(__dirname, '..');
const skillRoot = path.join(repoRoot, 'skills');
const requiredFrontmatter = ['name', 'description'];

function parseFrontmatter(file, markdown) {
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) {
    throw new Error(`${file} must start with YAML frontmatter`);
  }

  const data = {};
  for (const line of match[1].split('\n')) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    data[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
  }
  return data;
}

function validateSkill(dirent) {
  const skillDir = path.join(skillRoot, dirent.name);
  const skillFile = path.join(skillDir, 'SKILL.md');
  if (!fs.existsSync(skillFile)) {
    throw new Error(`${dirent.name} is missing SKILL.md`);
  }

  if (!/^[a-z0-9-]+$/.test(dirent.name)) {
    throw new Error(`${dirent.name} must be lower-case hyphen-case`);
  }

  const frontmatter = parseFrontmatter(skillFile, fs.readFileSync(skillFile, 'utf8'));
  for (const key of requiredFrontmatter) {
    if (!frontmatter[key]) {
      throw new Error(`${skillFile} is missing ${key}`);
    }
  }

  if (frontmatter.name !== dirent.name) {
    throw new Error(`${skillFile} name must match folder name`);
  }
}

for (const dirent of fs.readdirSync(skillRoot, { withFileTypes: true })) {
  if (!dirent.isDirectory()) continue;
  validateSkill(dirent);
}

console.log('Skill validation passed.');
