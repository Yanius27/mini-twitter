import React from 'react';

export interface IRoute {
  id: string,
  path: string,
  component: React.ComponentType,
}
