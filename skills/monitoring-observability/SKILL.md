---
name: monitoring-observability
description: "Use when designing metrics/logs/traces systems, setting up Prometheus/Grafana/Loki, creating alerts and dashboards, calculating SLOs and error budgets, analyzing performance issues, or comparing monitoring tools. Invoke for Four Golden Signals, RED/USE methods, OpenTelemetry instrumentation, alert design, Datadog cost optimization, and migration to open-source monitoring stacks."
---

# Monitoring & Observability

Comprehensive guidance for monitoring and observability workflows including metrics design, log aggregation, distributed tracing, alerting strategies, SLO/SLA management, and tool selection.

## When to Use This Skill

- Setting up monitoring for new services
- Designing alerts and dashboards
- Troubleshooting performance issues
- Implementing SLO tracking and error budgets
- Choosing between monitoring tools
- Integrating OpenTelemetry instrumentation
- Analyzing metrics, logs, and traces
- Optimizing Datadog costs or migrating to OSS

## Core Decision Tree

```
Setting up from scratch? -> Start with "1. Design Metrics Strategy"
Existing issue? -> Go to "9. Troubleshooting"
Improving monitoring?
  Alerts -> "3. Alert Design"
  Dashboards -> "4. Dashboard & Visualization"
  SLOs -> "5. SLO & Error Budgets"
  Tool selection -> references/tool_comparison.md
  Datadog costs -> "7. Datadog Cost Optimization"
```

## 1. Design Metrics Strategy

### Four Golden Signals
1. **Latency**: Response time (p50, p95, p99)
2. **Traffic**: Requests per second
3. **Errors**: Failure rate
4. **Saturation**: Resource utilization

**RED Method** (request-driven): Rate, Errors, Duration
**USE Method** (infrastructure): Utilization, Saturation, Errors

```promql
# Rate
sum(rate(http_requests_total[5m]))

# Error rate %
sum(rate(http_requests_total{status=~"5.."}[5m])) / sum(rate(http_requests_total[5m])) * 100

# P95 latency
histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le))
```

**Analyze metrics:**
```bash
python3 scripts/analyze_metrics.py prometheus --endpoint http://localhost:9090 --query 'rate(http_requests_total[5m])' --hours 24
```

## 2. Log Aggregation

**Structured logging checklist:** timestamp, level, message, service, request_id

**Log analysis:**
```bash
python3 scripts/log_analyzer.py application.log --show-errors
```

## 3. Alert Design

**Principles:** Every alert actionable, alert on symptoms not causes, tie to SLOs

**Alert quality checker:**
```bash
python3 scripts/alert_quality_checker.py /path/to/prometheus/rules/
```

## 4. Dashboard & Visualization

**Generate Grafana dashboards:**
```bash
python3 scripts/dashboard_generator.py webapp --title "My API" --service my_api --output dashboard.json
python3 scripts/dashboard_generator.py kubernetes --title "K8s Prod" --namespace production --output k8s.json
```

## 5. SLO & Error Budgets

| Availability | Downtime/Month | Use Case |
|--------------|----------------|----------|
| 99% | 7.2 hours | Internal tools |
| 99.9% | 43.2 minutes | Standard production |
| 99.95% | 21.6 minutes | Critical services |
| 99.99% | 4.3 minutes | High availability |

**SLO calculator:**
```bash
python3 scripts/slo_calculator.py availability --slo 99.9 --total-requests 1000000 --failed-requests 1500 --period-days 30
python3 scripts/slo_calculator.py burn-rate --slo 99.9 --errors 50 --requests 10000 --window-hours 1
```

## 6. Distributed Tracing

OpenTelemetry instrumentation with sampling strategies:
- Development: 100%
- Staging: 50-100%
- Production: 1-10% (or error-based)

## 7. Datadog Cost Optimization & Migration

**Analyze Datadog usage:**
```bash
python3 scripts/datadog_cost_analyzer.py --api-key $DD_API_KEY --app-key $DD_APP_KEY
```

**Migration to OSS stack:** Prometheus + Grafana (metrics), Loki (logs), Tempo/Jaeger (traces)
Estimated savings: 60-77% for 100-host environment.

## 8. Tool Selection

| Solution | Monthly (100 hosts) | Setup | Ops |
|----------|-------------------|--------|-----|
| Prometheus + Loki + Tempo | $1,500 | Medium | Medium |
| Grafana Cloud | $3,000 | Low | Low |
| Datadog | $8,000 | Low | None |
| ELK Stack | $4,000 | High | High |
| CloudWatch | $2,000 | Low | Low |

## 9. Troubleshooting

**Health check validation:**
```bash
python3 scripts/health_check_validator.py https://api.example.com/health
```

## Scripts

- `analyze_metrics.py` - Detect anomalies in Prometheus/CloudWatch metrics
- `alert_quality_checker.py` - Audit alert rules against best practices
- `slo_calculator.py` - Calculate SLO compliance and error budgets
- `log_analyzer.py` - Parse logs for errors and patterns
- `dashboard_generator.py` - Generate Grafana dashboards
- `health_check_validator.py` - Validate health check endpoints
- `datadog_cost_analyzer.py` - Analyze Datadog usage and find waste

## References

- `references/metrics_design.md` - Golden Signals, RED/USE, metric types
- `references/alerting_best_practices.md` - Alert design, runbooks, on-call
- `references/logging_guide.md` - Structured logging, aggregation patterns
- `references/tracing_guide.md` - OpenTelemetry, distributed tracing
- `references/slo_sla_guide.md` - SLI/SLO/SLA, error budgets
- `references/tool_comparison.md` - Monitoring tool comparison
- `references/datadog_migration.md` - Datadog to OSS migration guide
- `references/dql_promql_translation.md` - DQL to PromQL translation
