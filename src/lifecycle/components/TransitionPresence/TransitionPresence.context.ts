import { createContext, type RefObject } from 'react';
import type { BeforeUnmountCallback } from '../../hooks/useBeforeUnmount/useBeforeUnmount.js';

export type TransitionPresenceContextType = Set<RefObject<BeforeUnmountCallback>> | undefined;

export const TransitionPresenceContext = createContext<TransitionPresenceContextType>(undefined);
