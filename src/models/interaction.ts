export interface Interaction {
  type: InteractionType;
}

export type InteractionType = 'RESPONSE_SUBMISSION' | 'EVALUATION' | 'READ';
