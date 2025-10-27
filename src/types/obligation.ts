export type Criticality = "high" | "medium" | "low"

export type ActionType =
  | "email_template"
  | "call_script"
  | "checklist"
  | "generic_info"

export interface ActionPayload {
  emailSubject?: string
  emailBody?: string
  callScriptLines?: string[]
  checklistItems?: string[]
  infoBlocks?: string[]
  helperText?: string
}

export interface Obligation {
  id: string
  title: string
  description: string
  dueDate: string
  criticality: Criticality
  actionType: ActionType
  actionPayload: ActionPayload
  completed?: boolean
}
