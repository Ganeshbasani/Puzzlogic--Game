import type { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  description: string;
  icon?: ReactNode;
  action?: ReactNode;
};

const EmptyState = ({ title, description, icon, action }: EmptyStateProps) => (
  <div className="glass-card-elevated flex flex-col items-center gap-4 rounded-3xl px-6 py-10 text-center">
    {icon ? <div className="text-4xl">{icon}</div> : null}
    <div className="space-y-2">
      <h2 className="font-heading text-xl font-bold text-foreground">{title}</h2>
      <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
    {action}
  </div>
);

export default EmptyState;
