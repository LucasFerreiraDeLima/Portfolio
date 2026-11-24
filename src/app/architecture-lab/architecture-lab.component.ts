import { Component } from '@angular/core';
import { I18nService } from '../i18n/i18n.service';

type ScenarioId = 'success' | 'invalid' | 'conflict';

interface FlowStep {
  layerKey: string;
  titleKey: string;
  detailKey: string;
  event: string;
}

interface Scenario {
  id: ScenarioId;
  labelKey: string;
  descriptionKey: string;
  status: number;
  statusTextKey: string;
  responseStatusKey?: string;
  responseMessageKey?: string;
  steps: FlowStep[];
}

@Component({
  selector: 'app-architecture-lab',
  templateUrl: './architecture-lab.component.html',
  styleUrls: ['./architecture-lab.component.css'],
})
export class ArchitectureLabComponent {
  readonly scenarios: Scenario[] = [
    {
      id: 'success',
      labelKey: 'lab.success',
      descriptionKey: 'lab.successDesc',
      status: 201,
      statusTextKey: 'lab.created',
      responseStatusKey: 'lab.confirmed',
      steps: [
        { layerKey: 'lab.layer.frontend', titleKey: 'lab.step.prepare', detailKey: 'lab.detail.prepare', event: 'checkout.request.ready' },
        { layerKey: 'lab.layer.api', titleKey: 'lab.step.receive', detailKey: 'lab.detail.receive', event: 'http.request.accepted' },
        { layerKey: 'lab.layer.service', titleKey: 'lab.step.rules', detailKey: 'lab.detail.rules', event: 'order.rules.passed' },
        { layerKey: 'lab.layer.database', titleKey: 'lab.step.persist', detailKey: 'lab.detail.persist', event: 'order.transaction.committed' },
        { layerKey: 'lab.layer.response', titleKey: 'lab.step.confirm', detailKey: 'lab.detail.confirm', event: 'http.response.created' },
      ],
    },
    {
      id: 'invalid',
      labelKey: 'lab.invalid',
      descriptionKey: 'lab.invalidDesc',
      status: 400,
      statusTextKey: 'lab.badRequest',
      responseMessageKey: 'lab.validationMessage',
      steps: [
        { layerKey: 'lab.layer.frontend', titleKey: 'lab.step.prepare', detailKey: 'lab.step.invalidPrepare', event: 'checkout.request.ready' },
        { layerKey: 'lab.layer.api', titleKey: 'lab.step.validate', detailKey: 'lab.detail.validate', event: 'http.request.validation_failed' },
        { layerKey: 'lab.layer.service', titleKey: 'lab.step.stop', detailKey: 'lab.detail.stop', event: 'order.rules.skipped' },
        { layerKey: 'lab.layer.database', titleKey: 'lab.step.noWrite', detailKey: 'lab.detail.noWrite', event: 'order.transaction.not_started' },
        { layerKey: 'lab.layer.response', titleKey: 'lab.step.returnDetail', detailKey: 'lab.detail.returnDetail', event: 'http.response.bad_request' },
      ],
    },
    {
      id: 'conflict',
      labelKey: 'lab.conflict',
      descriptionKey: 'lab.conflictDesc',
      status: 409,
      statusTextKey: 'lab.conflict',
      responseMessageKey: 'lab.stockMessage',
      steps: [
        { layerKey: 'lab.layer.frontend', titleKey: 'lab.step.prepare', detailKey: 'lab.step.stockPrepare', event: 'checkout.request.ready' },
        { layerKey: 'lab.layer.api', titleKey: 'lab.step.receive', detailKey: 'lab.step.validRequest', event: 'http.request.accepted' },
        { layerKey: 'lab.layer.service', titleKey: 'lab.step.rules', detailKey: 'lab.step.stockRule', event: 'order.rules.stock_conflict' },
        { layerKey: 'lab.layer.database', titleKey: 'lab.step.consistent', detailKey: 'lab.detail.consistent', event: 'order.transaction.rolled_back' },
        { layerKey: 'lab.layer.response', titleKey: 'lab.step.informConflict', detailKey: 'lab.detail.informConflict', event: 'http.response.conflict' },
      ],
    },
  ];

  selectedScenarioId: ScenarioId = 'success';
  activeStep = -1;
  isRunning = false;
  private simulationTimer?: ReturnType<typeof setTimeout>;

  constructor(private readonly i18n: I18nService) {}

  get selectedScenario(): Scenario {
    return this.scenarios.find(scenario => scenario.id === this.selectedScenarioId) ?? this.scenarios[0];
  }

  get requestEndpoint(): string {
    return this.i18n.language === 'en' ? '/api/v1/orders' : '/api/v1/pedidos';
  }

  get localizedRequest(): Record<string, unknown> {
    const quantity = this.selectedScenario.id === 'invalid'
      ? 0
      : this.selectedScenario.id === 'conflict' ? 8 : 2;
    const item = { sku: 'SKU-204' };

    if (this.i18n.language === 'en') {
      return {
        customerId: 1842,
        items: [{ ...item, quantity }],
        paymentMethod: 'card',
      };
    }

    if (this.i18n.language === 'es') {
      return {
        clienteId: 1842,
        articulos: [{ ...item, cantidad: quantity }],
        formaPago: 'tarjeta',
      };
    }

    return {
      clienteId: 1842,
      itens: [{ ...item, quantidade: quantity }],
      formaPagamento: 'cartao',
    };
  }

  get localizedResponse(): Record<string, unknown> {
    const language = this.i18n.language;
    const response: Record<string, unknown> = {};

    if (this.selectedScenario.status < 400) {
      response[language === 'en' ? 'orderId' : 'pedidoId'] = language === 'en' ? 'ORD-2026-001' : 'PED-2026-001';
      response[language === 'en' ? 'items' : language === 'es' ? 'articulos' : 'itens'] = 1;
      if (this.selectedScenario.responseStatusKey) {
        response[language === 'es' ? 'estado' : 'status'] = this.i18n.translate(this.selectedScenario.responseStatusKey);
      }
      return response;
    }

    response[language === 'en' ? 'code' : 'codigo'] = this.selectedScenario.id === 'invalid'
      ? 'VALIDATION_ERROR'
      : 'INSUFFICIENT_STOCK';

    if (this.selectedScenario.responseMessageKey) {
      const messageKey = language === 'en' ? 'message' : language === 'es' ? 'mensaje' : 'mensagem';
      response[messageKey] = this.i18n.translate(this.selectedScenario.responseMessageKey);
    }

    return response;
  }

  selectScenario(id: ScenarioId): void {
    if (this.simulationTimer) clearTimeout(this.simulationTimer);
    this.selectedScenarioId = id;
    this.activeStep = -1;
    this.isRunning = false;
  }

  runSimulation(): void {
    if (this.simulationTimer) clearTimeout(this.simulationTimer);
    this.activeStep = 0;
    this.isRunning = true;
    this.advanceSimulation();
  }

  private advanceSimulation(): void {
    this.simulationTimer = setTimeout(() => {
      if (this.activeStep < this.selectedScenario.steps.length - 1) {
        this.activeStep += 1;
        this.advanceSimulation();
      } else {
        this.isRunning = false;
      }
    }, 560);
  }
}
