/** Allowed issue labels for the contact form. Keep in step with contact API validation. */
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
