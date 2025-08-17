// @/lib/utils/roleOptions.ts

import type { Role } from "@/types/auth";

/**
 * Convert API roles (e.g. "HEAD_CSO") to <Select> options:
 *   ["HEAD_CSO", "IT"] → [{ value:"HEAD_CSO", label:"Head CSO" }, …]
 */
export const createRoleOptions = (roles: Role[]) =>
  roles.map((role) => ({
    value: role,
    label: prettifyRole(role),
  }));

const prettifyRole = (raw: string): string =>
  raw
    .split("_")
    .map((word) =>
      // keep acronyms like IT/CSO upper‑case, otherwise Capitalise
      word.length <= 3 ? word : capitalize(word.toLowerCase())
    )
    .join(" ");

const capitalize = (w: string) => w.charAt(0).toUpperCase() + w.slice(1);
