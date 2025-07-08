interface PageHeaderProps {
  title: string;
  subText?: string;
  rightSection?: React.ReactNode;
}

export function PageHeader({ title, subText, rightSection }: PageHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {subText && <p className="text-sm text-muted-foreground">{subText}</p>}
      </div>
      {rightSection && (
        <div className="flex items-center gap-4">{rightSection}</div>
      )}
    </div>
  );
}
