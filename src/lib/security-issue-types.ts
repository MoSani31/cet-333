/** Allowed values for Contact Security Team — must stay in sync with contact API validation. */
export const SECURITY_ISSUE_TYPES = [
  "Incident response",
  "Vulnerability assessment",
  "Monitoring & SOC",
  "Security awareness / training",
  "Infrastructure hardening",
  "Compliance / audit support",
  "Other",
] as const;

export type SecurityIssueType = (typeof SECURITY_ISSUE_TYPES)[number];
