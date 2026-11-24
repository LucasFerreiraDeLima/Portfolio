import { Component } from '@angular/core';

interface KnowledgeArea { id: string; labelKey: string; headingKey: string; contextKey: string; skills: string[]; mark: string; }

@Component({ selector: 'app-knowledge-summary', templateUrl: './knowledge-summary.component.html', styleUrls: ['./knowledge-summary.component.css'] })
export class KnowledgeSummaryComponent {
  readonly areas: KnowledgeArea[] = [
    { id: 'frontend', labelKey: 'knowledge.frontend', headingKey: 'knowledge.frontHeading', contextKey: 'knowledge.frontContext', skills: ['Angular', 'React', 'TypeScript', 'JavaScript', 'HTML', 'CSS'], mark: 'UI' },
    { id: 'backend', labelKey: 'knowledge.backend', headingKey: 'knowledge.backHeading', contextKey: 'knowledge.backContext', skills: ['Java', 'Spring Boot', 'Node.js', 'APIs REST'], mark: 'API' },
    { id: 'quality', labelKey: 'knowledge.quality', headingKey: 'knowledge.qualityHeading', contextKey: 'knowledge.qualityContext', skills: ['skill.manual', 'skill.automation', 'JUnit', 'Mockito', 'Jasmine', 'Karma', 'SonarQube'], mark: 'QA' },
    { id: 'data', labelKey: 'knowledge.data', headingKey: 'knowledge.dataHeading', contextKey: 'knowledge.dataContext', skills: ['SQL', 'PostgreSQL', 'AWS', 'Vercel', 'Cloudflare', 'Git', 'skill.agile'], mark: 'DX' },
    { id: 'ai', labelKey: 'knowledge.ai', headingKey: 'knowledge.aiHeading', contextKey: 'knowledge.aiContext', skills: ['ai.storyWriting', 'ai.codeWriting', 'ai.testing', 'GitHub Copilot', 'ai.review'], mark: 'AI' }
  ];
  selectedAreaId = this.areas[0].id;
  get selectedArea(): KnowledgeArea { return this.areas.find(area => area.id === this.selectedAreaId) || this.areas[0]; }
}
