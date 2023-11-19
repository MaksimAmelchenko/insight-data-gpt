import { TDateTime } from '../../types/app';

export interface ISession {
  id: string;
  userId: string;
  isActive: boolean;
  ip: string;
  userAgent: string;
  requestsCount: number;
  lastAccessTime: TDateTime;
  createdAt: TDateTime;
  updatedAt: TDateTime;
}

export interface IJwtPayload {
  sessionId: string;
}

export interface CreateSessionGatewayData {
  userAgent: string;
  ip: string;
}

export type UpdateSessionGatewayChanges = Partial<{
  lastAccessTime: string;
  isActive: boolean;
}>;

export type UpdateSessionServiceChanges = UpdateSessionGatewayChanges;
